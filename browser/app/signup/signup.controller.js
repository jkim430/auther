'use strict';

app.controller('SignupCtrl', function($scope, Auth, $state) {
    $scope.signup = function() {
        Auth.signup($scope.credentials);
    }
});