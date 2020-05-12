const Joi=require('joi')

function validateUser(user){
const Schema={
    name:Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required()
}

return Joi.validate(user,Schema);
}

exports.validateUser=validateUser;