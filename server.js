const Koa = require('koa')
const UserRouter = require('./router/index')
const app = new Koa()
const passport = require('./utils/passport')
const session = require('koa-generic-session')
const bodyParser = require('koa-bodyparser')
//跨域
const cors = require('koa-cors');
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.keys = ['mt', 'keyskeys']
app.use(session({ key: 'uniapp', prefix: 'uni:uid' }))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(passport.initialize())
app.use(passport.session())
UserRouter(app)
//错误页面处理
app.use(async (ctx, next) => {
  try {
    await next();   // 执行后代的代码
    if (!ctx.body) {  // 没有资源
      ctx.status = 404;
      ctx.body = '资源未找到'
    }
  } catch (e) {
    // 如果后面的代码报错 返回500
    ctx.status = 500;
    ctx.body = '服务器错误'
  }
})


app.listen(3000, () => {
  console.log('server is running in 3000')
})