const mongoose=require('mongoose');


const logindetail = new mongoose.Schema({
    userName: String,
    email: String,
    date: { type: Date, default: Date.now },
  });


  const Login = mongoose.model('logins', logindetail);

  module.exports=Login;