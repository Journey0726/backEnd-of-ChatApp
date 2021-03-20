let bcrypt = require('bcryptjs')
exports.secret = function(pass){
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(pass,salt)
  return hash
}

exports.unSecret = function(pass,hash){
  return bcrypt.compareSync(pass,hash)
}