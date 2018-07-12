var Joi = require('joi');
var db = require("../models");
var express = require('express');
var router = express.Router()
var { validateUser, validateUserPut, generateAuthToken } = require('../validation');  
var bcrypt = require('bcrypt');
var _ = require('lodash');

// Working 
  router.get("/", function(req, res) {

    try {
      db.User.findAll({
        include: [db.Meal],
        attributes: ['name', 'email', 'id']
      }).then(function(dbUser) {
        if (dbUser == 0) {
          return res.status(400).send('No users found')
        }
        res.json(dbUser);
      });
    }
    catch (err) {
      return res.status(400).send('No users found')
    }

  });
  // Working
  router.get("/:id", function(req, res) {

    try {
      db.User.findOne({
        where: {
          id: req.params.id,
        },
        include: [db.Meal],
         attributes: ['name', 'email']
      }).then(function(dbUser) {
        if (dbUser == 0 || dbUser == null) {
          return res.status(400).send('The ID Entered Does Not Exist')
        }
        res.json(dbUser);
      });

    }
    catch (err) {
      return res.status(400).send('The ID Entered Does Not Exist')
    }

  });

  // Working
  router.post('/', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await db.User.findOne({where: { email: req.body.email }}); // This is throwing an issue
    console.log(user);
    if (user) return res.status(400).send('User already registered.');
  
    user = await db.User.create(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    db.User.update({
      password: user.password,
    }, {
      where: {
        id: user.id
      }
    });
  
    const token = generateAuthToken(user.id);
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
  });
// Working
  router.put("/", function(req, res) {

    try {

      db.User.update( req.body,{
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
        if (dbUser == 0) {
          return res.status(400).send('The ID Entered Does Not Exist')
        }
        res.json(dbUser);
      });
      
    }
    catch (err) {
      return res.status(400).send('The ID Entered Does Not Exist')
    }

    
  });
// Working
  router.delete("/:id", function(req, res) {

    try {

      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
        if (dbUser == 0) {
          return res.status(400).send('The ID Entered Does Not Exist')
        }
        res.json(dbUser);
      });
      
    }
    catch (err) {
      return res.status(400).send('The ID Entered Does Not Exist')
    }

  });

module.exports = router;