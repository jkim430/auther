'use strict';

app.controller('LoginCtrl', function($scope, Auth, $state) {
    $scope.credentials = {};
    $scope.login = function() {
        $scope.credentials._id = "login";

       Auth.login($scope.credentials).then(function(response){
       	if(response !== "unsuccessful"){
       		Auth.user = true;
       	}else{
       		Auth.user = false;
       	}
       });
       
    }
    $scope.logout = function() {
    	try{
    		$scope.credentials._id = "logout";
    	}catch(e){
    		console.log("logout err");
    	}
    	Auth.login($scope.credentials).then(function(){
    		Auth.user = false;
    	});
    }
});