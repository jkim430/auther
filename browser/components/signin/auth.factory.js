'use strict';

app.factory('Auth', function(User) {
    return {
        signup: function(credentials) {
            return new User(credentials).save();
        },
        login: function(credentials) {
        	return new User(credentials).save();
        },
        user: undefined
    }
});