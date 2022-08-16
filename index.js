var express = require('express');
var router = express.Router();
var userModel = require('./users');
var passport = require('passport');
var pl = require('passport-local');
passport.use(new pl(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', function(req, res, next) {
  res.render('profile');
});

router.post('/resgistration', function(req, res, next) {
  var details = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email
  });

  userModel.register(details, req.body.password).then(function(registeredUser) {
    passport.authenticate("local")(req, res, function() {
      res.redirect('/profile');
    });
  });
});

module.exports = router;
