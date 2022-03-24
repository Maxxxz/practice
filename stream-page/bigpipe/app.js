/**
 * @Description: 
 * @Author: easonzhu
 * @Date: 2018-06-22 19:37:20
 * @FilePath: /test/app.js
 */
const { resolve } = require('path');
const Koa = require('koa');
const createBigpipeMiddlewary = require('./middleware/bigpipe');

const app = new Koa();

// 获取json数据
const a = require('./json/a.json')
const b = require('./json/b.json')
const c = require('./json/c.json')
const d = require('./json/d.json')


app.use(createBigpipeMiddlewary(
  templatePath = resolve(__dirname, './template'),  // 模板文件夹
  publicPath = resolve(__dirname, './view')  // 静态资源目录
));

app.use((ctx) => {
  let bigpipe = ctx.body = ctx.createBigpipe();

  // 定义输出的html layout
  bigpipe.defineLayout('/test.html');

  // 定义片段，这里我们使用promise的方式模拟http请求
  // bigpipe.definePagelets([
  //   {
  //     id: 'A',
  //     tpl: '/article.handlebars',
  //     getData: () => {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve(a)
  //         }, 3000)
  //       })
  //     }
  //   },
  //   {
  //     id: 'B',
  //     tpl: '/article.handlebars',
  //     getData: () => {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve(b)
  //         }, 2000)
  //       })
  //     }
  //   },
  //   {
  //     id: 'C',
  //     tpl: '/article.handlebars',
  //     getData: () => {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve(c)
  //         }, 0)
  //       })
  //     }
  //   },
  //   {
  //     id: 'D',
  //     tpl: '/article.handlebars',
  //     getData: () => {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           resolve(d)
  //         }, 1000)
  //       })
  //     }
  //   }
  // ]);

  bigpipe.render();
})

app.listen(9001, () => {
  console.log('启动成功');
});
