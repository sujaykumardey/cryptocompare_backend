const express = require('express');
const router = require('express').Router();
const Key = require('../models/key');
const Login=require('../models/login')
const Joi=require('joi')

router.get('/key', async (req, res) => {
  const result = await Key.find();
  res.send(result[0].key);
});

router.post('/auth', async (req, res) => {
  const login = new Login({
        userName: req.body.userName,
        email: req.body.email,
      });
  const user = await login.save();
  res.send(user)

});





module.exports = router;
