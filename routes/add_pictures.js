var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

/* GET about. */
router.get('/', function(req, res, next) {
    res.render('add_pictures', { title: 'Add pictures' });
});

router.post('/add_pic', function(req, res, next) {
    if(req.files){
        var file = req.files.new_image;
        var fileName = file.name;
        var extention = fileName.substr(fileName.lastIndexOf('.')+1);
        var time = Math.round(new Date().getTime() / 1000);
        var newName = time+"."+extention;
        var image = {
            name: newName
        };
        file.mv("../public/uploads/images/" +newName,function (err) {
            if(err){
                console.log(err);
                res.send({
                    error:true
                });
            }
            else{
                mongo.connect(url, function (err, db) {
                    assert.equal(null, err);
                    db.collection('images').insertOne(image, function (err, result) {
                        assert.equal(null, err);
                        console.log('added');
                        db.close();
                    });
                });
                res.send({
                    error:false
                });
            }
        });
    }
});

module.exports = router;