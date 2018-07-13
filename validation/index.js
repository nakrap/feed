var Joi = require('joi');
var config = require('config');
var jwt = require('jsonwebtoken');
const PasswordComplexity = require('joi-password-complexity');

exports.validateUser = function validateUser(User) {
    const complexityOptions = {
        min: 6,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        requirementCount: 2,
      }
    var schema = {
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(3).max(255).email().required(),
        password: Joi.string().min(6).max(30).required()
    }
    return Joi.validate(User,schema) && Joi.validate(User.password, new PasswordComplexity(complexityOptions))
}

exports.validateMeal = function validateMeal(mainCourse) {
    var schema = {
        meal: Joi.string().min(3).max(255).required(),
        UserId: Joi.number().required()
    }
    return Joi.validate(mainCourse,schema)
}

exports.generateAuthToken = function generateAuthToken(id) { 
    const token = jwt.sign({ id: this.id }, config.get('jwtPrivateKey'));
    return token;
}