'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: '/browser/app/login/login.html'
    })
        .state('logout', {
            url: '/logout',
            controller: 'LoginCtrl',
            templateUrl: '/browser/app/login/logout.html'
        });
});