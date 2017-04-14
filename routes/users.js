var express = require('express');
var router = express.Router();
var request = require('request');
var users = {};

request('https://randomuser.me/api/', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        users = JSON.parse(body).results[0];
    }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', {
        title: 'Users',
        users: users,
    });
});

module.exports = router;
