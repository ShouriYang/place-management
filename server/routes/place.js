module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const { Place } = require('../models/place')
  const moment = require('moment')

  //获取场地列表
  router.get('/', async (req, res) => {
    if(req.query.searchInput){
      let regexp=new RegExp(req.query.searchInput,'i')
      const place = await Place.find({$or:[{name:{$regex:regexp}},{location:{$regex:regexp}}]})
      res.send(place)
    }else{
      const place = await Place.find().sort({ date: -1 })
      res.send(place)
    }
  })

  //新建场地
  router.post('/', async (req, res) => {
    const place = await Place.create({
      date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      name: req.body.name,
      capacity: req.body.capacity,
      type:req.body.type,
      location:req.body.location,
      status:'0'
    })
    res.send(place)
  })
  //删除场地
  router.delete('/:id', async(req, res) => {
   const place =  await Place.findByIdAndDelete(req.params.id)
   res.send(place)
  })
  //中间件
  // const authMiddleware = require('../middleware/auth')
  app.use('/place', router);
  // app.use(async (err, req, res, next) => {
  //   res.status(err.statusCode || 500).send({
  //     message: err.message
  //   });
  // });
}
