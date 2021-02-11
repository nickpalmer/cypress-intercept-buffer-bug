const fs = require('fs');
const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const upload = multer();

router.get('/', async (ctx) => {
  ctx.set('Content-Type', 'text/html; charset=utf-8');
  ctx.body = fs.readFileSync('index.html');
});

router.get('/good.pdf', async (ctx) => {
  ctx.set('Content-Type', 'application/pdf; charset=utf-8');
  // Sample PDF from https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf
  ctx.body = fs.readFileSync('sample.pdf');
});

router.get('/bad.pdf', async (ctx) => {
  ctx.set('Content-Type', 'application/pdf; charset=utf-8');
  // Sample PDF from https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf
  ctx.body = fs.readFileSync('sample.pdf');
});

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
