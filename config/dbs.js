var mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/yike',{useNewUrlParser:true,useUnifiedTopology: true})
db.on('error',console.error.bind(console,'连接错误'))
db.once('open',function(){
  console.info('数据库连接成功')
})
module.exports = db
