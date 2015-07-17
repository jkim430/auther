'use strict';

var isAuthenticated = function (req, res, next) {
	
}

var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.get("/membersOnly", isAuthenticated);

router.use('/membersOnly/stories', require('./stories/story.router'));

module.exports = router;