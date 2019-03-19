var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var nodemailer = require("nodemailer");
var crypto = require('crypto');
var app = express();

let User = require('../models/users');
let Token = require('../models/token');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const datecreated = req.body.datecreated;

  req.checkBody('firstname', 'First Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();
  if(errors){ res.render('register', { errors:errors }); }

  // check if account exists
  User.findOne({ email: req.body.email }, function(err, user) {
    // check if user exists
    if (user) return res.status(400).send('That email address is associated with an account.');
    // create and save user
    user = new User({
      firstname:firstname,
  	  lastname:lastname,
      email:email,
      username:username,
      password:password,
  	  datecreated:datecreated
    });

  	bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err){ console.log(err); }

        user.password = hash;
        user.save(function(err){
          if(err){ return res.status(500).send({ msg: err.message }); }
          // verification token
          var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

          token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message}); }
            // email user to verify
            var transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: { user: 'thetodolistapp@gmail.com', pass: 'appdev320'} });
            var mailOptions = {
              from: 'thetodolistapp@gmail.com',
              to: user.email,
              subject: 'Account Verification Token',
              text: 'Hello,\n\n' + 'Please verify your ToDo List account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };

            transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message });}
              res.status(200).send('A verification email has been sent to ' + user.email + '.');

            req.flash('success','You are now registered. Please check your email for confirmation and log in!');
            res.redirect('/users/login');
            });
          });
        });
      });
    });
  });
});


// Login Form
router.get('/login', function(req, res){
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

router.post('/confirmation', function(req,res){
  // Check for validation errors
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
  res.render('confirmation');
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
})

module.exports = router;
