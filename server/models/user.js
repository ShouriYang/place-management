const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const UserSchema = new mongoose.Schema({
  college: { type: String },
  contact:{type:String},
  userName:{type:String},
  password:{type:String},
  options:{type:String}
});

const User = mongoose.model("User", UserSchema); //定义一个user模型model，
module.exports = { User }; //导出一个对象，可以增加模型
