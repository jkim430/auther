'use strict';

app.factory('Auth', function($http, User) {
    return {
        signup: function(credentials) {
            return new User(credentials).save();
        },
        login: function(credentials) {
            return new User(credentials).save();
        }
    }
});