var dbModel = require('../model/dbModel')
var User = dbModel.model('User')
//加密
var bcrypt = require('./bcrypt')
const Passport = require('../utils/passport')


//新建用户
exports.insertUser = async function (name, email, pwd) {
  let password = bcrypt.secret(pwd)
  let data = {
    name, email, password: password, time: new Date()
  }
  const where = { email }
  let result = await User.findOne(where)
  if(result !==null){
    return -2
  }
  if (result === null) {
    let user = new User(data)
    let code
    user.save(code = (err, res) => {
      if (err) {
        return -1
      } else {
        return 1
      }
    })
    return code()
  }
}

exports.findUser = async function (email, password) {
}