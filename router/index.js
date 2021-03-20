const router = require('koa-router')()
const dbServer = require('../dao/dbServer')
const emailServer = require('../dao/emailServer')
const Passport =require('../utils/passport')



  module.exports = function (app){
    //注册
  router.post('/signUp', async ctx=>{
    const username = ctx.request.body.username;
    const email =  ctx.request.body.email
    const password =  ctx.request.body.password
    let code = await dbServer.insertUser(username,email,password)
    if(code === -2){
      ctx.body = {
        msg:'注册失败',
        code:-1
      }
    }
    if(code===-1){
      ctx.body = {
        code:-1,
        msg:'邮箱已存在'
      }
    }
    if(code ===1){
      ctx.body = {
        code:1,
        msg:'注册成功'
      }
    }
  })
    //登录
  router.post('/signIn',async (ctx,next)=>{
     return Passport.authenticate('local', function(err, username, info, status) {
      if (err) {
        ctx.body = {
          code: -1,
          msg: err
        }
      } else {
        if (username) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            username
          }
           return ctx.login(username)
        } else {
          ctx.body = {
            code: 1,
            msg: info
          }
        }
      }
    })(ctx, next)
  })
  //退出登录
  router.get('/exit', async (ctx, next) => {
    await ctx.logout()
    if (!ctx.isAuthenticated()) {
      ctx.body = {
        code: 0,
        msg:'退出登录'
      }
    } else {
      ctx.body = {
        code: -1
      }
    }
  })


  app.use(router.routes())
}