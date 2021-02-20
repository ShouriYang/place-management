const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const PlaceSchema = new mongoose.Schema({
  date: { type: String },
  name:{type:String},
  capacity:{type:Number},
  type:{type:String},
  location:{type:String},
  status:{type:String}
});

const Place = mongoose.model("Place", PlaceSchema); //定义一个user模型model，
module.exports = { Place }; //导出一个对象，可以增加模型
