const Joi = require('joi');

function validateUser(user) {
  const Schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, Schema);
}

function validateAuth(user) {
  const Schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, Schema);
}



function validateCoin(user) {
  const Schema = {
    coin: Joi.string().min(3).max(255).required().uppercase(),
    price: Joi.number().min(1).max(255).required(),
  };

  return Joi.validate(user, Schema);
}




function validateCoinToDelete(user) {
  const Schema = {
    coin: Joi.string().min(3).max(255).required().uppercase(),
};

  return Joi.validate(user, Schema);
}

exports.validateUser = validateUser;
exports.validateAuth = validateAuth;
exports.validateCoin = validateCoin;
exports.validateCoinToDelete = validateCoinToDelete;