const express = require("express");
const router = express.Router();
const mysql = require("mysql");

var connection;

// Set up JawsDB with Heroku.
if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: null,
        database: "whats_for_dinner_db"
    });
}

router.get("/", (req, res) => {
  connection.query("SELECT meal FROM meal_master;", (err, response) => {
    res.send(response);
  });
});

module.exports = router;
