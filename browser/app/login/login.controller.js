'use strict';

app.controller('LoginCtrl', function($scope, Auth) {
    $scope.login = function() {
        $scope.credentials._id = "login";
        Auth.login($scope.credentials);
    }
});