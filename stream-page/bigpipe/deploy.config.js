/**
 * @Description:更新，仅上传src内容
 * @Author: easonzhu
 * @Date: 2020-09-20 18:15:25
 * @FilePath: /test/deploy.config.js
 */
module.exports = {
  projectName: "test",
  prod: {
    name: "正式环境",
    script: "npm run build",
    host: "106.52.148.168",
    port: 22,
    username: "root",
    password: "zhuli199105",
    distPath: "test",
    webDir: "/var/home/zhuli/test1"
  }
};
