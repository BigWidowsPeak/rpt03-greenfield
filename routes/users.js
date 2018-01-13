const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const router = express.Router();

router.get('/users', function(req, res, next){
	db.find({}, function(err, users){
		if(err){
			console.log('THERE WAS AN ERROR ', err)
			return;
		}
		res.json(users);
	})
	//async deathzone, anything palced here is undefined
})

router.get('/users/:userName', function(req, res, next){
	db.findOne({userName: req.params.userName}, function(err, users){
		if(err){
			console.log('THERE WAS AN ERROR ', err)
			res.end()
		}
		res.json(users);
	})
	//async deathzone, anything palced here is undefined
})

router.post('/users', function(req, res, next){
	var user = new db(req.body);
    db.findOne(req.body, function (err, success) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        else {
            console.log(success);
            if (success == null) {
                user.save(function (err, success) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        console.log("inserted");
                        console.log(success);
                        res.send("success");
                    }
                });
            } else {
                res.send("User already present");
            }
        }
    })
	//async deathzone, anything palced here is undefined
})

router.delete('/users/:id', function(req, res, next){
	db.remove({_id: req.params.id}, function(err, data){
		if(err){
			console.log('THERE WAS AN ERROR')
			return;
		}
		res.json('1')
	})
})


module.exports = router;