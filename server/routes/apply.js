module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const { Apply } = require('../models/apply')
  const { Place } = require('../models/place')
  const { User } = require('../models/user')

  const moment = require('moment')

  //获取申请列表
  router.get('/', async (req, res) => {
    if(req.query.searchInput){
      let regexp=new RegExp(req.query.searchInput,'i')
      const apply = await Apply.find({$or:[{name:{$regex:regexp}},{location:{$regex:regexp}}]})
      res.send(apply)
    }else{
      const apply = await Apply.find().sort({ date: -1 })
      res.send(apply)
    }
  })

  //新建申请
  router.post('/', async (req, res) => {
    const place = await Place.findById(req.body.placeId)
    const user = await User.findById(req.body.userId)
    const findApply = await Apply.findOne({
      applyUserId: req.body.userId,
      applyPlaceId: req.body.placeId
    })
    if(!findApply){
      const apply = await Apply.create({
        date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        applyUserName:user.userName,
        applyUserId:req.body.userId,
        applyUserContact:user.contact,
        applyPlaceName:place.name,
        applyPlaceLocation:place.location,
        applyPlaceId: req.body.placeId,
        status:'0'
      })
      res.send(apply)
    }else{
      res.status(201).send({
        message: '您已经申请过该场地,请勿重复申请'
      });
    }

  })
  //通过申请
  router.put('/pass/:id', async(req, res) => {
   const apply =  await Apply.findByIdAndUpdate(req.params.id,{
    status: '1'
   })
   await Place.findByIdAndUpdate(apply.applyPlaceId,{
     status: '1'
   })
   res.send(apply)
  })
  //不通过申请
  router.put('/refuse/:id', async(req, res) => {
    const apply =  await Apply.findByIdAndUpdate(req.params.id,{
      status: '2'
     })
    res.send(apply)
    })
  //中间件
  // const authMiddleware = require('../middleware/auth')
  app.use('/apply', router);
  // app.use(async (err, req, res, next) => {
  //   res.status(err.statusCode || 500).send({
  //     message: err.message
  //   });
  // });
}
