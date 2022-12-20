/**
 * @Description: 
 * @Author: easonzhu
 * @Date: 2018-06-22 19:37:20
 * @FilePath: /practice/stream-page/bigpipe/app.js
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

  bigpipe.render();
})

app.listen(9001, () => {
  console.log('启动成功');
});
