//express module
var express = require('express');
var router = express.Router();
var dbs = require('../public/Db');
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expressing' });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    var obj={username:req.body.username,password:req.body.password};
    var db=dbs.db('TicketBooking');
    db.collection('Users').findOne(obj, function
    (err, result) {
        dbs.close();
        if (err) {
            res.send("Failed");
        } else {
            if(result!=null){
                res.send("Success");
            }
            else{
                res.send("Failed");
            }
        }
    });

    console.log("Inserted a document into the collection.");
});

module.exports = router;