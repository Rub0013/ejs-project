var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', success: req.session.success, errors: req.session.errors});
  req.session.errors = false;
});

router.get('/test/:id', function(req, res, next) {
    res.render('test', {
      title: "Test",
      id: req.params.id
    });
});

// Post validation.
router.post('/submit', function(req, res, next) {
    req.check('name', 'Write your name!').notEmpty();
    req.check('email', 'Invalid email address!').isEmail();
    req.check('number', 'Phone number must contain only numbers!').isNumeric();

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else{
        req.session.success = true;
    }
    res.redirect('/');
});

module.exports = router;
