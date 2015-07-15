'use strict';

app.controller('SignupCtrl', function($scope, Auth) {
    $scope.signup = function() {
        Auth.signup($scope.credentials)
    }
});