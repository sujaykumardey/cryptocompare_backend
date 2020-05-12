
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {url} = require('./config/key');



app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`));
const routers=require('./routes/api')


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

mongoose.connection.on('connected', () => {
  console.log('mongoose is connect..');
});


app.use('/api',routers);





