const express = require('express');
const app = express();
const cors=require('cors')
const mongoose = require('mongoose');
const { url } = require('./config/key');
const winston=require('winston')
const bodyParser=require('body-parser')



var rawBodyHandler = function (req, res, buf, encoding) {
  if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
      console.log('Raw body: ' + req.rawBody);
  }
}

app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json({ verify: rawBodyHandler }));

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
