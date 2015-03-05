
var successLogin = angular.module('successLogin', ['ngCookies']);

function successLoginController($scope, $http, $location, $window, $cookies) {
	if ($window.localStorage.token) {
		var req = {
				method : 'GET',
				url : 'http://10.189.136.174:7272/userInfo',
				headers: {
				    'Authorization': $window.localStorage.token
				},
				withCredentials: true
			};
			
			$http(req).success(function(response) {
				if (response.status === true) {
					$scope.username = response.username;
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			$scope.signOut = function () {
				alert("In Sign Out");
				var req = {
						method : 'GET',
						url : 'http://10.189.136.174:7272/signOut',
						headers: {
						    'Authorization': $window.localStorage.token 
						},
						withCredentials: true
					};
				
				$http(req).success(function(response) {
					//alert(JSON.stringify(response));
					if (response.status === true) {
						$window.localStorage.clear();
						$window.location = '/login';
					}
				}).error(function(error) {
					alert("Error Logging Out");
				});
			};
	} else {
		$window.location = '/login';
	}
	
}

successLogin.controller('successLoginController', successLoginController);