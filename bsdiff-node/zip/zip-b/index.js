import 'reflect-metadata';
import { difference } from 'lodash-es';
import { logger } from '@node/utils/logger';
import type { InstanceItem } from '@shared/types/multiInstanceSelect';
import type { ClientParamsType } from './types/client';
import type { ServerResBusinessData, ServerResBaseDataType } from './types/server';
import { DEFAULT_ERROR_RESPONSE, DEFAULT_ERROR_SERVER, LOCAL_SERVER_PORTS } from './utils/const';
import HttpHelper from './HttpHelper';
import { JsonWebToken } from './utils/JsonWebToken';

export interface AliveServerItem {
  port: number;
  uin: string;
  uid: string;
  nickName: string;
  isOnlyGuild?: boolean;
  isOffLine?: boolean;
}

// const HEART_BEAT_TIME = 30 * 1000;

export class BaseLocalClient {
  public static aliveServerList: AliveServerItem[] = [];

  private static heartBeatTimer: NodeJS.Timeout | null = null;

  private static heartBeatCount = 0;

  public static async checkHasMultipleQQ() {
    const len = await this.checkAliveServerLen();

    return len >= 2;
  }

  public static async checkHasAliveQQ() {
    const len = await this.checkAliveServerLen();

    return len >= 1;
  }

  /**
   * 任务栏启动
   */
  public static async checkAliveInstanceAndRun(url: string) {
    logger.info('checkAliveInstanceAndRun url', url);
    const aliveList = await this.broadcast('tencent', {
      url,
    });

    logger.info('checkAliveInstanceAndRun aliveList', url, aliveList);

    return aliveList?.length || 0;
  }

  /**
   * 向各个服务端口广播
   * @param path 广播路径
   * @param jsonString 广播的json字符串
   */
  public static async broadcast(path: string, data: ClientParamsType): Promise<AliveServerItem[] | undefined> {
    try {
      const broadcastResPromise = LOCAL_SERVER_PORTS.map((port) => {
        return this.send(port, path, data);
      });

      const res = await Promise.all(
        broadcastResPromise.map((p) => {
          return p.catch((e) => {
            return e;
          });
        }),
      );

      logger.info('checkAliveInstanceAndRun res', res);

      res.forEach((resItem) => {
        if (resItem?.errCode === 0) {
          this.updateAliveServerList({
            port: resItem.port,
            uin: resItem.uin,
            uid: resItem.uid,
            nickName: resItem.nickName,
            isOnlyGuild: !!resItem.isOnlyGuild,
          });
        }
      });

      return this.aliveServerList;
    } catch (e) {
      logger.error('[BaseLocalClient] broadcast e', e);

      return;
    }
  }

  /**
   * 向各个服务端口广播
   * @param path 广播路径
   * @param jsonString 广播的json字符串
   */
  public static async sendMsgToServer(
    path: string,
    aliveItem: AliveServerItem,
    data: ClientParamsType,
  ): Promise<ServerResBaseDataType<ServerResBusinessData>> {
    try {
      const { port } = aliveItem;
      const sendRes = await this.send(port, path, data);

      return sendRes;
    } catch (e) {
      logger.error('[BaseLocalClient] broadcast e', e);

      return Promise.resolve(DEFAULT_ERROR_RESPONSE);
    }
  }

  public static async checkAliveServerLen() {
    const aliveLen = await this.getAliveServerPort();

    return aliveLen?.length || 0;
  }

  /**
   * 通知其它实例本端口退出了
   */
  public static async reportPortClose(aliveItem: AliveServerItem): Promise<AliveServerItem[] | undefined> {
    try {
      const reportPortClosePromises = LOCAL_SERVER_PORTS.filter((port) => port !== aliveItem?.port).map((port) =>
        this.send(port, 'reportPortClose', {
          closePort: aliveItem?.port || 0,
          closeIsOnlyGuild: !process.env.QQ_NT,
        }),
      );
      const res = await Promise.all(
        reportPortClosePromises.map((p) => {
          return p.catch((e) => {
            return e;
          });
        }),
      );

      return res;
    } catch (e) {
      logger.error('[BaseLocalClient] getAliveQQServer error', e);
    }
  }

  /**
   * 通知其它实例本端口打开了
   */
  public static async reportPortOpen(aliveItem: AliveServerItem): Promise<AliveServerItem[] | undefined> {
    try {
      const reportPortOpenPromises = LOCAL_SERVER_PORTS.filter((port) => port !== aliveItem?.port).map((port) =>
        this.send(port, 'reportPortOpen', {
          openPort: aliveItem?.port || 0,
          openUin: aliveItem?.uin || '',
          openUid: aliveItem?.uid || '',
          openNickName: aliveItem?.nickName || '',
          openIsOnlyGuild: !process.env.QQ_NT,
          openIsOffLine: !!aliveItem?.isOffLine,
        }),
      );
      const res = await Promise.all(
        reportPortOpenPromises.map((p) => {
          return p.catch((e) => {
            return e;
          });
        }),
      );

      return res;
    } catch (e) {
      logger.error('[BaseLocalClient] getAliveQQServer error', e);
    }
  }

  /**
   * 获取当前在线的服务端口
   * @returns
   */
  public static async getAliveServerPort(): Promise<AliveServerItem[] | undefined> {
    try {
      const getAliveServerPromises = LOCAL_SERVER_PORTS.map((port) => this.send(port, 'checkAliveServer', {}));
      const res = await Promise.all(
        getAliveServerPromises.map((p) => {
          return p.catch((e) => {
            return e;
          });
        }),
      );

      res.forEach((resItem) => {
        if (resItem?.errCode === 0) {
          this.updateAliveServerList({
            port: resItem.port,
            uin: resItem.uin,
            uid: resItem.uid,
            nickName: resItem.nickName,
            isOnlyGuild: !!resItem.isOnlyGuild,
          });
        }
      });

      return this.aliveServerList;
    } catch (e) {
      logger.error('[BaseLocalClient] getAliveQQServer error', e);
    }
  }

  public static async getIdleServerPorts(): Promise<number[]> {
    const alivePorts = (await this.getAliveServerPort())?.map((value) => value.port) || [];

    return difference(LOCAL_SERVER_PORTS, alivePorts);
  }

  public static send(
    port: number,
    path: string,
    data: ClientParamsType,
  ): Promise<ServerResBaseDataType<ServerResBusinessData>> {
    const token = JsonWebToken.generateToken({
      ...data,
      isFromQQ: 1,
    });
    const secretData = JsonWebToken.generateToken({
      data,
      token,
    });

    return new Promise((resolve, reject) => {
      try {
        const url = `http://127.0.0.1:${port}/${path}?data=${secretData}`;

        // checkAliveServer频繁检查减少日志
        if (path !== 'checkAliveServer') {
          logger.info('[BaseLocalClient] send url', port, path, JSON.stringify(data));
        }

        const getRes = HttpHelper.get(url);

        getRes
          .then((resString) => {
            if (!resString) {
              reject(resString);

              return;
            }

            const decodeResString = JsonWebToken.decodeToken(resString);

            const res: ServerResBaseDataType<ServerResBusinessData> =
              decodeResString as ServerResBaseDataType<ServerResBusinessData>;

            if (res?.errCode === 0) {
              resolve(res);

              return;
            }

            reject(res);

            return;
          })
          .catch((e) => {
            if (path !== 'checkAliveServer') {
              logger.warn('[BaseLocalClient] HttpHelper get error', path, e);
            }

            reject(e);
          });
      } catch (e) {
        logger.error('[BaseLocalClient] send error', e);
        reject(DEFAULT_ERROR_SERVER);
      }
    });
  }

  /** 更新服务端口信息 */
  public static updateAliveServerList(aliveItem?: AliveServerItem) {
    logger.info('[updateAliveServerList] start', aliveItem, this.aliveServerList);
    const aliveData = aliveItem || {
      port: global.multiInstancePort || 0,
      uin: global.authData?.uin || '',
      uid: global.authData?.uid || '',
      nickName: global.authData?.nickName || '',
    };

    if (!LOCAL_SERVER_PORTS.includes(aliveData?.port)) {
      return;
    }

    const idx = this.aliveServerList.findIndex((item) => item.port === aliveData.port);

    if (idx >= 0) {
      this.aliveServerList[idx] = aliveData;
      this.isolateGuildAndQQPort();
      this.sortAliveServerByPort();

      this.filterRepeatUin();

      return;
    }

    this.aliveServerList.push(aliveData);

    this.isolateGuildAndQQPort();
    this.sortAliveServerByPort();
    this.filterRepeatUin();
  }

  /** 对频道以及QQ启动的端口做隔离 */
  public static isolateGuildAndQQPort() {
    if (process.env.QQ_NT) {
      // QQ
      this.aliveServerList = this.aliveServerList.filter((item) => {
        // 兼容老版QQ频道现网版本isOnlyGuild返回false
        const isGuild = (!item.isOnlyGuild && item.uid && item.uin && item.uid === item.uin) || !!item.isOnlyGuild;

        return !isGuild;
      });

      return;
    }

    // 频道
    this.aliveServerList = this.aliveServerList.filter((item) => {
      const isGuild = (!item.isOnlyGuild && item.uid && item.uin && item.uid === item.uin) || !!item.isOnlyGuild;

      return isGuild;
    });
  }

  /**
   * 删除被通知退出的port
   */
  public static delAliveServerByPort(port: number) {
    this.aliveServerList = this.aliveServerList.filter((item) => ![port].includes(item?.port));
    this.sortAliveServerByPort();
  }

  /**
   * 用户频繁操作容易导致各个实例的顺序不一致,这里强制保证顺序,port从小到大排,保证处理实例唯一
   */
  public static sortAliveServerByPort() {
    this.aliveServerList.sort((smallPort, bigPort) => smallPort.port - bigPort.port);
  }

  /**
   * 处理多实例过来的请求
   */
  public static async handleMultiInstanceReport(instanceItem: InstanceItem) {
    logger.info('[BaseLocalClient] handleMultiInstanceReport schema', instanceItem);
    const { schema, port, uin } = instanceItem;

    if (!schema) {
      logger.warn('[BaseLocalClient] handleMultiInstanceReport schema error');

      return;
    }

    try {
      const url = decodeURIComponent(schema);
      const urlObj = new URL(url);

      urlObj.searchParams.set('fuin', uin);
      const res = await this.send(port, 'urlSchema', {
        url,
        fuin: uin,
      });

      return res;
    } catch (e) {
      logger.error('[BaseLocalClient] handleMultiInstanceReport error', e);
    }
  }

  /**
   * 离线后通知其它实例更新登录态信息
   */
  public static async reportOffLine2MultiInstance() {
    const localoffLineInstanceInfo = {
      port: global.multiInstancePort || 0,
      uin: global.authData?.uin || '',
      uid: global.authData?.uid || '',
      nickName: global.authData?.nickName || '',
      isOnlyGuild: !process.env.QQ_NT,
      isOffLine: true,
    };

    // 更新本地实例
    this.updateAliveServerList(localoffLineInstanceInfo);
    // 通知其它实例更新登录信息
    this.reportPortOpen(localoffLineInstanceInfo);
  }

  /**
   * 登录通知其它实例更新登录信息
   */
  public static async reportLoginInfo2MultiInstance() {
    if (!global.authData?.uid) {
      return;
    }

    const localLoginInstanceInfo = {
      port: global.multiInstancePort || 0,
      uin: global.authData?.uin || '',
      uid: global.authData?.uid || '',
      nickName: global.authData?.nickName || '',
      isOnlyGuild: !process.env.QQ_NT,
    };

    // 更新本地实例
    this.updateAliveServerList(localLoginInstanceInfo);
    // 通知其它实例更新登录信息
    this.reportPortOpen(localLoginInstanceInfo);
  }

  /**
   * 心跳检测端口异常重启
   */
  public static async checkPortHeartBeat(callback: () => void) {
    if (process.env.IS_DEV) {
      // dev环境不用检测
      callback?.();

      return;
    }

    if (!global.multiInstancePort) {
      // 本地port未创建过直接create
      await callback?.();
      this.startHeartbeat(callback);

      return;
    }

    if (this.heartBeatTimer) {
      return;
    }

    const port = global.multiInstancePort;

    try {
      const token = JsonWebToken.generateToken({
        isFromQQ: 1,
      });
      const secretData = JsonWebToken.generateToken({
        token,
      });
      const url = `http://127.0.0.1:${port}/checkAliveServer?data=${secretData}`;
      const res = await HttpHelper.get(url);
      const decodeRes = JsonWebToken.decodeToken(res);

      if (decodeRes?.port === port) {
        logger.info(`[BaseLocalClient]: heart-beat success!! port=${port}; heartBeatCount=${this.heartBeatCount}`);
      } else {
        logger.warn(`[BaseLocalClient]: heart-beat not success port=${port}; heartBeatCount=${this.heartBeatCount}`);
        await callback?.();
      }
    } catch (e) {
      logger.warn(`[BaseLocalClient]: heart-beat error port=${port} e=${e}`);
      await callback?.();
    }

    if (!LOCAL_SERVER_PORTS.includes(port)) {
      logger.warn('checkPortHeartBeat port not invalid', port);

      return;
    }

    this.startHeartbeat(callback);
  }

  private static startHeartbeat(callback: () => void) {
    this.heartBeatTimer = setTimeout(async () => {
      this.heartBeatTimer = null;
      this.heartBeatCount++;
      await this.checkPortHeartBeat(callback);
      await BaseLocalClient.checkAliveServerLen();
    }, HEART_BEAT_TIME);
  }

  /** 过滤重复的登录实例 */
  private static filterRepeatUin() {
    const newAliveList: AliveServerItem[] = [];

    BaseLocalClient.aliveServerList.forEach((item) => {
      if (!item?.uin) {
        // 未登录实例直接push
        newAliveList.push(item);

        return;
      }

      const newItemIndex = newAliveList.findIndex((newItem) => newItem.uin === item.uin);

      // 暂无重复实例则直接push
      if (newItemIndex < 0) {
        newAliveList.push(item);

        return;
      }

      // 已有则判断是否需要替换(实例端口不等于当前端口号且待判断端口等于当前端口号)
      if (
        newItemIndex > -1 &&
        newAliveList[newItemIndex].port !== global.multiInstancePort &&
        item.port === global.multiInstancePort
      ) {
        newAliveList.splice(newItemIndex, 1, item);

        return;
      }
    });
    BaseLocalClient.aliveServerList = newAliveList;
    logger.info('aliveList isolateGuildAndQQPort Guild', BaseLocalClient.aliveServerList);
  }
}
