const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { url } = require('./config/key');
const winston=require('winston')
const bodyParser=require('body-parser')


app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT'); 
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, cookie, pragma, cache-control, x-auth-token');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
const routers = require('./routes/api');

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('mongoose is connect..');
});

app.get('/',(req,res)=>{
  res.send('Welcome to TEAM_DENVER SITE')
})
.use('/api', routers);
