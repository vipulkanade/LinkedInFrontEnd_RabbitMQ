var email, paswd;
var linkedInApp = angular.module('linkedInApp', ['ngCookies']);

function LoginController($scope, $http, $location, $window, $cookies) {
	if ($window.localStorage.token) {
		$window.location = '/successLogin';
	} else {
		$scope.login = function() {
			email = $scope.email;
			paswd = $scope.password;
			var req = {
				method : 'POST',
				url : 'http://10.189.136.174:7272/login',
				data : {
					"email" : email,
					"password" : paswd
				},
				withCredentials: true
			}
			
			$http(req).success(function(response) {
				if (response.status === true) {
					$window.localStorage.token = response.token;
					$window.location = '/successLogin';
				} else {
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
		};
	}
}

function signUpController($scope, $http, $location, $window, $cookies) {
	var firstName, lastName, emailID, password;
	if ($window.localStorage.token) {
		$window.location = '/successLogin';
	} else {
		$scope.signUpSubmit = function() {
			firstName = $scope.firstName;
			lastName = $scope.lastName;
			emailID =  $scope.newUserEmail;
			password = $scope.newUserPassword;
			
			var req = {
					method : 'POST',
					url : 'http://10.189.136.174:7272/signUp',
					data : {
						"firstName" : firstName,
						"lastName" : lastName,
						"emailID": emailID,
						"password": password,
					},
					withCredentials: true
				};
			
			$http(req).success(function(response) {
				if (response.status === true) {
					$window.localStorage.token = response.token;
					$window.location = '/successLogin';
					alert("Done");
				} else {
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
		};
	}
}

linkedInApp.controller('signInController', LoginController);
linkedInApp.controller('signUpController', signUpController);