const express = require('express');
const router = require('express').Router();
const Key = require('../models/key');
const Login = require('../models/login');
const Joi = require('joi');
const { validateUser,validateAuth } = require('../models/validate');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router
  .get('/key', async (req, res) => {
    const result = await Key.find();
    res.send(result[0].key);
  })


  .post('/users', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send('invalid user');
    const useremail = await Login.findOne({ email: req.body.email });
    if (useremail) return res.status(400).send('user already Register');

    const login = new Login(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(20);
    const hashed = await bcrypt.hash(login.password, salt);
    login.password = hashed;
    const user = await login.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
  })


  .post('/auth', async (req, res) => {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send('invalid username and password');
    const user= await Login.find({ email: req.body.email });
    if (!user) return res.send("user doesn't exsit");
    const validpassword=bcrypt.compare(req.body.password,user.password);
    if(!validpassword) return res.status(400).send('invalid password');
    res.send(true);
    
  });

module.exports = router;
