var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 8080;
var meal = require('./routes/meals');
var users = require('./routes/users');
var mealMaster = require('./routes/mealMaster');
var auth = require('./routes/auth');

var db = require('./models');

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use('/api/meals', meal);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/mealMaster', mealMaster);

require('./routes/html-routes.js')(app);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});
