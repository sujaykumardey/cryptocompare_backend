const express = require('express');
const app = express();
const cors=require('cors')
const mongoose = require('mongoose');
const { url } = require('./config/key');
const winston=require('winston')
const bodyParser=require('body-parser')



app.use(cors())
app.use(bodyParser.json())

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
