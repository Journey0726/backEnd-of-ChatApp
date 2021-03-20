const  passport = require('koa-passport')
const LocalStrategy = require('passport-local')
var dbModel = require('../model/dbModel')
var User = dbModel.model('User')
var bcrypt = require('../dao/bcrypt')
passport.use(new LocalStrategy(async function(email,password,done){
  let where = {
    email
  };
  let result = await User.findOne(where)
  if(result!=null){

    if(bcrypt.unSecret(password,result.password)){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))

passport.serializeUser(function(user,done){
  done(null,user)
})

passport.deserializeUser(function(user,done){
  return done(null,user)
})

module.exports = passport
