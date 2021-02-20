module.exports = app => {
  const express = require("express");
  const router = express.Router();
  const { User } = require('../models/user')
  const moment = require('moment')

  //获取用户列表
  router.get('/', async (req, res) => {
      const users = await User.find()
      res.send(users)
  })

  //注册申请
  router.post('/register', async (req, res) => {
    const user = await User.findByIdAndUpdate({
      college: req.body.college,
      contact:req.body.contact,
      userName:req.body.userName,
      password:req.body.password,
      options:'2'
    })
    res.send(user)
  })
  //同意申请
  router.post('/pass/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      options:'1'
    });
    res.send(user)
  })
  //禁用用户
  router.post('/disable/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      options:'2'
    });
    res.send(user)
  })
  //用户登录
  router.post('/login', async (req, res) => {
    const user = await User.findOne({
      userName:req.body.userName
    })
    console.log(user)
    if(!user){
      res.status(201).send({
        message: '该用户不存在'
      });
    }
    if(user.options==='2'){
      res.status(203).send({
        message: '该用户未通过申请'
      });
    }
    if(user.password !== req.body.password){
      res.status(202).send({
        message: '密码错误'
      });
    }
    if(user.password === req.body.password){
      res.send(user)
    }
  })
  router.delete('/:id', async(req, res) => {
   const user =  await User.findByIdAndDelete(req.params.id)
   res.send(user)
  })
  //中间件
  // const authMiddleware = require('../middleware/auth')
  app.use('/user', router);
  // app.use(async (err, req, res, next) => {
  //   res.status(err.statusCode || 500).send({
  //     message: err.message
  //   });
  // });
}
