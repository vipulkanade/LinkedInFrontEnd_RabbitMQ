var userID;
var connectionPageApp = angular.module('connectionPageApp', ['xeditable', 'ngCookies']);
connectionPageApp.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

function connectionPageController($scope, $http, $location, $window, $cookies) {
	if ($window.localStorage.token) { 
		$scope.last_Login = $window.localStorage.lastLog;
		
		$scope.search = function () {
			$window.localStorage.search = $scope.searchString;
			$window.location = '/connectionSearchResult';
		};
		
		if ($window.localStorage.token) {  
				var reqconnectedPeopleList = {
						method : 'GET',
						url : '/connectedPeopleList',
						headers: {
						    'Authorization': $window.localStorage.token 
						},
						withCredentials: true
					};
				
				$http(reqconnectedPeopleList).success(function(response) {
					//alert(JSON.stringify(response));
					if (response.status === true) {
						$scope.connections = JSON.parse(response.connectedPeopleList);
						//alert($scope.connections);
					}
				}).error(function(error) {
					alert("Error Logging Out");
				});
				
				var reqpendingConnections = {
						method : 'GET',
						url : '/pendingConnections',
						headers: {
						    'Authorization': $window.localStorage.token 
						},
						withCredentials: true
					};
				
				$http(reqpendingConnections).success(function(response) {
					//alert(JSON.stringify(response));
					if (response.status === true) {
						$scope.pendingConnectionList = JSON.parse(response.pendingConnectionList);
						//alert($scope.connections);
					}
				}).error(function(error) {
					alert("Error Logging Out");
				});
		} else {
			$window.location = '/login';
		}
		
		$scope.connect = function (senderUserID) {
			var reqacceptInvitation = {
					method : 'POST',
					url : '/acceptInvitation',
					headers: {
					    'Authorization': $window.localStorage.token 
					},
					data: {
						"senderUserID" : senderUserID, "acceptorUSerID" : $window.localStorage.userID
					},
					withCredentials: true
				};
			
			$http(reqacceptInvitation).success(function(response) {
				//alert(JSON.stringify(response));
				if (response.status === true) {
					$window.location = '/connections';
				}
			}).error(function(error) {
				alert("Error Logging Out");
			});
		}
		
		$scope.signOut = function () {
			var req = {
					method : 'GET',
					url : '/signOut',
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
};

connectionPageApp.controller('connectionPageController', connectionPageController);