var Joi = require('joi');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var db = require("../models");
var express = require('express');
var router = express.Router();
var { generateAuthToken } = require('../validation')

// Working
router.post('/', async (req, res) => {
  var { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  var user = await db.User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email or password.');

  var validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  var token = generateAuthToken(user);
  res.send(token);
});

function validate(req) {
  var schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
