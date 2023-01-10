var express = require('express');
var router = express.Router();
var dbs = require('../public/Db');
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Expressing' });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    var obj={username:req.body.username,password:req.body.password,age:req.body.age,sex:req.body.sex,phone:req.body.phone};
    var db=dbs.db('TicketBooking');
    db.collection('Users').insertOne(obj, function (err, result) {
        dbs.close();
        if (err) {
            res.send("Failed");
        } else {
            res.send("Success");
        }
    });

});

module.exports = router;