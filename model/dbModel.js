let mongoose = require('mongoose')
var db = require('../config/dbs')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    name:{type:String},
    password:{type:String},
    email:{type:String},
    sex:{type:String,default:'asexual'},
    birth:{type:Date},
    phone:{type:Number},
    explain:{type:String},
    imageUrl:{type:String,default:'user.png'},//用户头像
    time:{type:Date} //注册时间
})

var FriendsSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    friend:{type:Schema.Types.ObjectId,ref:'User'},
    state:{type:String},   //好友状态 （0已为好友，1为申请中，2为未同意）
    time:{type:Date}, //生成时间
})

//一对一消息表
var O2oSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    friend:{type:Schema.Types.ObjectId,ref:'User'},
    message:{type:String},
    types:{type:String},  //消息类型 （0文字，1图片链接，2音频链接）
    time:{type:Date}, //发送时间
    state:{type:Number} //消息状态（0已读，1未读）
})

var GroupSchema = new Schema({
  userId:{type:Schema.Types.ObjectId,ref:'User'},//群主id
  name:{type:String}, //群名
  imageUrl:{type:String,default:'group.png'},//群头像
  notice:{type:String}, //群公告
  time:{type:Date} //创建时间
})

var GroupItemSchema = new Schema({
  groupID:{type:Schema.Types.ObjectId,ref:'Group'},
  userID:{type:Schema.Types.ObjectId,ref:'Group'},
  name:{type:String},
  tip:{type:Number,default:0},   //未读消息数
  time:{type:Date},
  shield:{type:Number}   //是否屏蔽群消息
})

var GroupMsgSchema = new Schema({
  groupID:{type:Schema.Types.ObjectId,ref:'Group'},  
  userID:{type:Schema.Types.ObjectId,ref:'Group'},
  message:{type:String},
  types:{type:String},  //消息类型 （0文字，1图片链接，2音频链接）
  time:{type:Date}, //发送时间
})
module.exports = db.model('User',UserSchema)
module.exports = db.model('Friends',FriendsSchema)
module.exports = db.model('OneToOne',O2oSchema)
module.exports = db.model('Group',GroupSchema)
module.exports = db.model('GroupItem',GroupItemSchema)
module.exports = db.model('GroupMsg',GroupMsgSchema)
