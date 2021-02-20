module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const { Announcement } = require('../models/announcement')
  const moment = require('moment')

  //获取公告列表
  router.get('/', async (req, res) => {
    if(req.query.searchInput){
      let regexp=new RegExp(req.query.searchInput,'i')
      const announcement = await Announcement.find({$or:[{title:{$regex:regexp}},{content:{$regex:regexp}}]})
      res.send(announcement)
    }else{
      const announcement = await Announcement.find().sort({ date: -1 })
      res.send(announcement)
    }
  })

  //发布公告
  router.post('/', async (req, res) => {
    const announcement = await Announcement.create({
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      title: req.body.title,
      content: req.body.content,
      views: 0
    })
    res.send(announcement)
  })
  //管理员删除公告
  router.delete('/:id', async(req, res) => {
   const announcement =  await Announcement.findByIdAndDelete(req.params.id)
   res.send(announcement)
  })
  //中间件
  // const authMiddleware = require('../middleware/auth')
  app.use('/announcement', router);
  // app.use(async (err, req, res, next) => {
  //   res.status(err.statusCode || 500).send({
  //     message: err.message
  //   });
  // });
}
