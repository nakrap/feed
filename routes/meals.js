var Joi = require('joi');
var db = require("../models");
var express = require('express');
var router = express.Router();
var { validateMeal } = require('../validation');

// Working
  router.get("/", function(req, res) {

    try {
      var query = {};
      if (req.query.user_id) {
        query.UserId = req.query.user_id;
      }
      db.Meal.findAll({
        where: query,
        attributes: ['meal', 'id']
      }).then(function(dbMeal) {
        if (dbMeal == 0) {
          return res.status(400).send('The ID Entered Does Not Exist')
        }
        res.json(dbMeal);
      });
    }
    catch (err) {
      return res.status(400).send('The ID Entered Does Not Exist')
    }

  });

// Working
  router.post("/", function(req, res) {

    const { error } = validateMeal(req.body); 
    if (error) return res.status(400).send(error.message);

    try {
      db.Meal.create(req.body).then(function(dbMeal) {
        res.json(dbMeal);
      });
    }
    catch (err) {
      return res.status(400).send('The ID Entered Does Not Exist')
    }

    
  });
// Working
  router.delete("/:id", function(req, res) {

    try {
      db.Meal.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbMeal) {
          if (dbMeal == 0) {
            res.status(400).send('The ID Entered Does Not Exist')
          }
          res.json(dbMeal);
        });
    }
    catch (err) {
      return res.status(400).send('The ID Entered Does Not Exist')
    }
    
  });

module.exports = router;