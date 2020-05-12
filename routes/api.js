const express = require('express');
const router = require('express').Router();
const Key = require('../models/key');
const Login = require('../models/login');
const Joi = require('joi');
const { validateUser } = require('../models/validate');

router.get('/key', async (req, res) => {
  const result = await Key.find();
  res.send(result[0].key);
});



router.post('/users', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send('invalid user');
  const useremail = await Login.findOne({ email: req.body.email });
  if (useremail) return res.status(400).send('user already Register');

  const login = new Login({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const user = await login.save();
  res.send(user);
});





module.exports = router;
