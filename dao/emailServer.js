const nodemailer = require('nodemailer')
const cred = require('../config/default');
let transport = nodemailer.createTransport({
  service:'qq',
  auth:{
    user:cred.qq.user,
    pass:cred.qq.pass
  }
})

exports.emailSignUp = async function(email,res){
  let options = {
    from:'1549120948@qq.com',
    to:email,
    subject:'感谢您的注册',
    html:'<span>感谢您的加入</span>'
  };
  let code
  transport.sendMail(options,code = function(err,msg){
    if(err){
      console.log(err);
      return -1
    }else{
      console.log('成功发射');
      return 1
    }
  })
  return code()
}