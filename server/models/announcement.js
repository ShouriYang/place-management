const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const AnnouncementSchema = new mongoose.Schema({
  date: { type: String },
  title:{type:String},
  content:{type:String},
  views:{type:Number}
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema); //定义一个user模型model，
module.exports = { Announcement }; //导出一个对象，可以增加模型
