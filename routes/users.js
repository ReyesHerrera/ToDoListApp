var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Regrister Form
router.get('/register,' function(req, res){
    res.render('register');
}

//Register Process
router.post('/register', function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    //validator
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Not a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
      res.render('register',{
          errors:errors
      });
    }else{
      let newUser = new User ({
        name:name,
        email:email,
        uusername:username,
        password:password
      });

      bcrypt.getSalt(10,function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err,hash){
          if(error){
            console.log(err);
          }
          newUser.password = hash;
          newUser.save(function(err){
            if(error){
              console.log(err);
              return;
            }else{
              req.flash('Success', 'Welcome to be a new member ');
              req.redirect('/user/login');
            }
          });
        });
      });
    }
});

module.exports = router;
