var searchPageApp = angular.module('searchPageApp', ['xeditable', 'ngCookies']);
searchPageApp.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
var userID;
function searchPageController($scope, $http, $location, $window, $cookies) {
	if ($window.localStorage.token) { 
		$scope.last_Login = $window.localStorage.lastLog;
		var req = {
				method : 'POST',
				url : '/userList',
				headers: {
				    'Authorization': $window.localStorage.token 
				},
				data: {
					'searchString': $window.localStorage.search
				},
				withCredentials: true
			};
		
		$http(req).success(function(response) {
			//alert(JSON.stringify(response));
			if (response.status === true) {
				$scope.peoples = JSON.parse(response.search);
				//$window.location = '/connectionSearchResult';
			}
		}).error(function(error) {
			alert("Error Searching For Result");
		});
		
		$scope.search = function () {
			$window.localStorage.search = $scope.searchString;
			$window.location = '/connectionSearchResult';
		};
		
		$scope.connect = function (sendRequestToUserID) {
			var reqacceptInvitation = {
					method : 'POST',
					url : '/sendConnectionRequest',
					headers: {
					    'Authorization': $window.localStorage.token 
					},
					data: {
						"senderUserID" : $window.localStorage.userID, "sendRequestToUserID" : sendRequestToUserID
					},
					withCredentials: true
				};
			
			$http(reqacceptInvitation).success(function(response) {
				//alert(JSON.stringify(response));
				if (response.status === true) {
					$window.location = '/connectionSearchResult';
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
}

searchPageApp.controller('searchPageController', searchPageController);