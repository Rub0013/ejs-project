var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var objectId = require('mongodb').ObjectID;
const fs = require('fs');
var url = 'mongodb://localhost:27017/test';

/* GET about. */
router.get('/', function(req, res, next) {
    mongo.connect(url, function (err, db) {
        var allPics = [];
        assert.equal(null, err);
        var cursor = db.collection('images').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            allPics.push(doc);
        }, function () {
            db.close();
            res.render('gallery', {
                title: 'Gallery',
                images: allPics,
            });
        });
    });
});

router.post('/remove_pic', function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('images').deleteOne({"_id":objectId(id)}, function (err, result) {
            assert.equal(null, err);
            fs.unlink("../public/uploads/images/" + name,function (err) {
                if(err){
                    console.log(err);
                    res.send({
                        error:true
                    });
                }
                else{
                    console.log('Item deleted!');
                    db.close();
                    res.send({
                        error:false
                    });
                }
            });
        });
    });
});



module.exports = router;