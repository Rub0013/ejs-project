var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  mongo.connect(url, function (err, db) {
      var allUsers = [];
      assert.equal(null, err);
      var cursor = db.collection('users').find();
      cursor.forEach(function (doc, err) {
          assert.equal(null, err);
          allUsers.push(doc);
      }, function () {
          db.close();
          res.render('index', {
              title: 'Home',
              users: allUsers,
              success: req.session.success,
              errors: req.session.errors
          });
          req.session.errors = false;
      });
  });
});

router.get('/test/:id', function(req, res, next) {
    res.render('test', {
      title: "Test",
      id: req.params.id
    });
});

// Post validation.
router.post('/insert', function(req, res, next) {
    req.check('name', 'Write your name!').notEmpty();
    req.check('email', 'Invalid email address!').isEmail();
    req.check('number', 'Phone number must contain only numbers!').isNumeric();

    var errors = req.validationErrors();
    if(errors){
        req.session.errors = errors;
        req.session.success = false;
    }
    else{
        var user = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.number,
        };
        mongo.connect(url, function (err, db) {
            assert.equal(null, err);
            db.collection('users').insertOne(user, function (err, result) {
                assert.equal(null, err);
                console.log('Item inserted!');
                db.close();
            });
        });
        req.session.success = true;
    }
    res.redirect('/');
});
router.post('/update', function(req, res, next) {});
router.post('/delete', function(req, res, next) {
    var id = req.body.id;
    res.send('ok');
    // mongo.connect(url, function (err, db) {
    //     assert.equal(null, err);
    //     db.collection('users').deleteOne({"_id":objectId(id)}, function (err, result) {
    //         assert.equal(null, err);
    //         console.log('Item deleted!');
    //         db.close();
    //     });
    // });
});

module.exports = router;
