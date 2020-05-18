const mongoose = require('mongoose');


const coindetail=new mongoose.Schema({
    coin:String,
    price:Number,
})

const Coin = mongoose.model('Coin', coindetail);
const logindetail = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
coins:[coindetail],

});

const Login = mongoose.model('login', logindetail);

exports.Login= Login;
exports.Coin= Coin;
