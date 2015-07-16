'use strict';

app.controller('LoginCtrl', function($scope, Auth, $state) {
    $scope.login = function() {
        $scope.credentials._id = "login";
        Auth.login($scope.credentials)
            .then(function() {
                $state.go('stories');
            });
    }
});