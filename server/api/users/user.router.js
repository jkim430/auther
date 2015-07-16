'use strict';

var router = require('express').Router(),
    _ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');

router.param('id', function(req, res, next, id) {
    User.findById(id).exec()
        .then(function(user) {
            if (!user) throw HttpError(404);
            else {
                req.requestedUser = user;
                next();
            }
        })
        .then(null, next);
});

router.get('/', function(req, res, next) {
    console.log("HEYYYYYYYYYYYY", req.secure);
    if(!req.secure){
        res.redirect("https://localhost:8080/api/users");
    }

    User.find({}).exec()
        .then(function(users) {
            res.json(users);
        })
        .then(null, next);
});

router.post('/', function(req, res, next) {
    User.create(req.body)
        .then(function(user) {
            res.status(201).json(user);
        })
        .then(null, next);
});

router.get('/:id', function(req, res, next) {
    if(req.secure){
        res.redirect("http://localhost:4040/api/users/" + req.params.id);
    }
    req.requestedUser.getStories().then(function(stories) {
        var obj = req.requestedUser.toObject();
        obj.stories = stories;
        res.json(obj);
    })
        .then(null, next);
});

router.put('/login', function(req, res, next) {
    console.log('req.body', req.body);
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).exec().then(function(user) {
        if (!user) throw "You don't exist";
        res.json(user);
    }).then(null, function(error) {
        res.send(401);
    });
});

router.put('/:id', function(req, res, next) {
    console.log('req.body', req.body);
    _.extend(req.requestedUser, req.body);
    req.requestedUser.save()
        .then(function(user) {
            res.json(user);
        })
        .then(null, next);
});



router.delete('/:id', function(req, res, next) {
    req.requestedUser.remove()
        .then(function() {
            res.status(200).end();
        })
        .then(null, next);
});

module.exports = router;