'use strict';

app.controller('LoginCtrl', function($scope, Auth, $state) {
    $scope.credentials;
    $scope.login = function() {
        $scope.credentials._id = "login";
        Auth.login($scope.credentials)
            .then(function() {
                $state.go('stories');
            });
    }
    $scope.logout = function() {
        $scope.credentials._id = "logout";
        Auth.login($scope.credentials)
            .then(function() {
                $state.go('stories');
            });
    }
});