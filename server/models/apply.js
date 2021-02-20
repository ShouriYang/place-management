const mongoose = require("../plugins/db");

//新建用户所有信息数据库字段
const ApplySchema = new mongoose.Schema({
  date: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  applyUserName:{type:String},
  applyUserId:{type:String},
  applyUserContact:{type:String},
  applyPlaceName:{type:String},
  applyPlaceLocation:{type:String},
  applyPlaceId: {type:String},
  //申请通过状态
  status:{type:String}
});

const Apply = mongoose.model("Apply", ApplySchema); //定义一个user模型model，
module.exports = { Apply }; //导出一个对象，可以增加模型
