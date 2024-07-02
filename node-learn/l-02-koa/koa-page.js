const Koa = require("koa");
const fs = require("fs");

const app = new Koa();

function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time )
    })
}

app
  .use(async ctx => {
      console.log('url', ctx.url);
    if(ctx.url == '/maxi'){
        await sleep(3000);
        ctx.body = {
            data: 1,
        };
        return 
    }
    if(ctx.url == '/image'){
        await sleep(2000);
        ctx.set("Content-Type", "image/jpeg");
        ctx.body = fs.readFileSync("./static/111.jpg");
        return 
    }
    ctx.set("Content-Type", "text/html");
    ctx.body = fs.readFileSync("./static/div.html");
    console.log('456')

  })
  .listen(3000);