const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { url } = require('./config/key');
const winston=require('winston')
const bodyParser=require('body-parser')


app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
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
