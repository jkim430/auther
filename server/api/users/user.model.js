'use strict';

var mongoose = require('mongoose'),
    shortid = require('shortid'),
    crypto = require('crypto'),
    _ = require('lodash');

var db = require('../../db');
var Story = require('../stories/story.model');

var User = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
        default: shortid.generate
    },
    name: String,
    photo: String,
    phone: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: String,
    salt: String
});

User.statics.findByEmails = function(set) {
    return this.find({
        emails: {
            $elemMatch: {
                $in: set
            }
        }
    });
};

User.statics.findByEmail = function(email) {
    return this.findOne({
        emails: {
            $elemMatch: {
                $eq: email
            }
        }
    });
};

User.methods.getStories = function() {
    return Story.find({
        author: this._id
    }).exec();
};

User.statics.loginAttempt = function(reqBody) {
    console.log(reqBody.email);
    return this.findOne({
        email: reqBody.email
    }).exec().then(function(user) {
        console.log(user);
        var hashedBuffer = crypto.pbkdf2Sync(reqBody.password, user.salt, 3, 16);
        var password = hashedBuffer.toString('base64');
        if (password === user.hashedPassword) {
            return user;
        } else {
            throw new Error("BAD LOGIN");
        }
    });
}

User.virtual('password').set(function(str) {
    var saltBuffer = crypto.randomBytes(16);
    this.salt = saltBuffer.toString('base64');
    var hashedBuffer = crypto.pbkdf2Sync(str, this.salt, 3, 16);
    this.hashedPassword = hashedBuffer.toString('base64');
})

module.exports = db.model('User', User);