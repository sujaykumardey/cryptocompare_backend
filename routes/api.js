const express = require('express');
const router = require('express').Router();
const winston = require('winston');
const Key = require('../models/key');
const Login = require('../models/login');
const Joi = require('joi');
const { validateUser, validateAuth } = require('../models/validate');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtkey } = require('../config/key');
const logger=require('../config/logger')

router
  .get('/key', async (req, res) => {
    try {
      const result = await Key.find();
      res.json({key:result[0].key});
    } catch (error) {
      logger.error('info',error.message)
      res.status(500).send('something failed');
    }
  })

  .post('/users', async (req, res) => {
    try {
      const { error } = validateUser(req.body);
      if (error) return res.status(400).send('invalid user');
      const useremail = await Login.findOne({ email: req.body.email });
      if (useremail) return res.status(400).send('user already Register');
      const login = new Login(_.pick(req.body, ['name', 'email', 'password']));
      const salt = await bcrypt.genSalt(5);
      const hashed = await bcrypt.hash(login.password, salt);
      login.password = hashed;
      const user = await login.save();
      res.json(_.pick(user, ['_id', 'name', 'email']));
    } catch (errror) {
      logger.error('info',error.message)
      res.status(500).send('something failed');
    }
  })

  .post('/auth', async (req, res) => {
    try {
      const { error } = validateAuth(req.body);
      if (error) return res.status(400).send('invalid username and password');
      const user = await Login.findOne({ email: req.body.email });
      if (!user) return res.send("user doesn't exsit");
      const validpassword = bcrypt.compare(req.body.password, user.password);
      if (!validpassword) return res.status(400).send('invalid password');
      const token = jwt.sign({ _id: user._id }, jwtkey);
      res.json(token);
    } catch (error) {
      logger.error(error.message)
      res.status(500).send('something failed');
    }
  });

module.exports = router;
