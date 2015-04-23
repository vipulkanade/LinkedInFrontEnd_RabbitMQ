
var successLogin = angular.module('homePageApp', ['xeditable', 'ngCookies', "ui.bootstrap"]);
successLogin.run(function(editableOptions) {
	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
var userID;
var userExp;
var userEdu;
function homePageController($scope, $http, $location, $window, $cookies) {
	if ($window.localStorage.token) { 
		userID = $window.localStorage.userID;
		$scope.last_Login = $window.localStorage.lastLog;
		
		var reqUpdateLastLogin = {
				method : 'POST',
				url : '/updateLastLogin',
				headers: {
				    'Authorization': $window.localStorage.token
				},
				data: {
					"userID" : userID,			
				},
				withCredentials: true
			};
		
		$http(reqUpdateLastLogin).success(function(response) {
			// do nothing
		}).error(function(error) {
			alert("Error");
		});
		
		var reqUserInfo = {
				method : 'GET',
				url : '/userInfo',
				headers: {
				    'Authorization': $window.localStorage.token
				},
				withCredentials: true
			};
			
			$http(reqUserInfo).success(function(response) {
				if (response.status === true) {					
					$scope.userV = {
						    name: response.user.User_Name,
						    professional_headline: response.user.Professional_Headline,
						    city: response.user.City,
						    state: response.user.State,
						    summary: response.user.Summary,
						    url: response.user.Profile_Image_URL
					};
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			var reqEducationDetails = {
					method : 'GET',
					url : '/educationdetails',
					headers: {
					    'Authorization': $window.localStorage.token
					},
					withCredentials: true
				};
			
			$http(reqEducationDetails).success(function(response) {
				if (response.status === true) {					
					userEdu = JSON.parse(response.educationDetail);
					$scope.eduationDetail = userEdu;					
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			var reqExperienceDetails = {
					method : 'GET',
					url : '/experienceDetails',
					headers: {
					    'Authorization': $window.localStorage.token
					},
					withCredentials: true
				};
			
			$http(reqExperienceDetails).success(function(response) {
				if (response.status === true) {					
					//alert(JSON.stringify(response.educationDetail));
					userExp = JSON.parse(response.experienceDetail);
					$scope.experienceDetail = userExp;
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
			var reqSkillDetails = {
					method : 'GET',
					url : '/skillDetails',
					headers: {
					    'Authorization': $window.localStorage.token
					},
					withCredentials: true
				};
			
			$http(reqSkillDetails).success(function(response) {
				if (response.status === true) {					
					//alert(JSON.stringify(response.educationDetail));
					$scope.skillDetail = JSON.parse(response.skillDetail);
				} else {
					$window.localStorage.clear();
					$window.location = '/login';
				}	
			}).error(function(error) {
				alert("Error");
			});
			
				$scope.updateUser = function(data, field) {
				var fieldName;
				if (field === "name") {
					fieldName = "User_Name";
				} else if (field === "prof_heading") {
					fieldName = "Professional_Headline";
				} else if (field === "state") {
					fieldName = "State";
				} else if (field === "city") {
					fieldName = "City";
				} else if (field === "summary") {
					fieldName = "Summary";
				}
				var req = {
						method : 'POST',
						url : '/updateUserBasicInfo',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"userID" : userID , "name": data, "field": fieldName
						},
						withCredentials: true
					};
			    return $http(req);
			};
			
			$scope.updateUserEDU = function(data, field, index) {
				var fieldName;
				if (field === "school") {
					fieldName = "University_Name";
				} else if (field === "degree") {
					fieldName = "Degree";
				} else if (field === "courses") {
					fieldName = "Courses";
				} else if (field === "yoj") {
					fieldName = "Year_of_Joining";
				} else if (field === "yoe") {
					fieldName = "Year_of_Ending";
				}
				
				var req = {
						method : 'POST',
						url : '/updateUserEdu',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"eduID" : userEdu[index].Edu_ID,"userID": userID, "name": data, "field": fieldName
						},
						withCredentials: true
					};
			    return $http(req);
			};
			
			$scope.updateUserExp = function(data, field, index) {
				var fieldName;
				if (field === "company") {
					fieldName = "Company_Name";
				} else if (field === "jt") {
					fieldName = "Job_Title";
				} else if (field === "jp") {
					fieldName = "Job_Profile";
				} else if (field === "sd") {
					fieldName = "Start_Date";
				} else if (field === "ed") {
					fieldName = "End_Date";
				}
				
				var req = {
						method : 'POST',
						url : '/updateUserExp',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"expID" : userExp[index].Exp_ID,"userID": userID, "name": data, "field": fieldName
						},
						withCredentials: true
					};
			    return $http(req);
			};
			
			$scope.addEducationToggle = function () {
				$scope.educationDiv = !$scope.educationDiv;
			};
			
			$scope.addEducationDetail = function () {
				var reqAddEduDetails = {
						method : 'POST',
						url : '/addEducationDetail',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"userID" : userID,
							"Degree": $scope.degree,
							"University_Name": $scope.school,
							"Courses": $scope.courses,
							"YOJ" : $scope.yoj,
							"YOE" : $scope.yoe
						},
						withCredentials: true
					};
				
				$http(reqAddEduDetails).success(function(response) {
					if (response.status === true) {					
						$window.location = '/successLogin';
					} else {
						$window.localStorage.clear();
						$window.location = '/login';
					}	
				}).error(function(error) {
					alert("Error");
				});
			};
			
			$scope.addExperienceToggle = function () {
				$scope.experienceDiv = !$scope.experienceDiv;
			};
			
			$scope.addExperienceDetail = function () {
				var reqAddEduDetails = {
						method : 'POST',
						url : '/addExperienceDetail',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {	
							"userID" : userID,
							"company": $scope.company,
							"jobTitle": $scope.jobTitle,
							"jobDesc": $scope.jobDesc,
							"startDate" : $scope.startDate,
							"endDate" : $scope.endDate
						},
						withCredentials: true
					};
				
				$http(reqAddEduDetails).success(function(response) {
					if (response.status === true) {					
						$window.location = '/successLogin';
					} else {
						$window.localStorage.clear();
						$window.location = '/login';
					}	
				}).error(function(error) {
					alert("Error");
				});
			};
			
			$scope.addSkillToggle = function () {
				$scope.skillDiv = !$scope.skillDiv;
			};
			
			$scope.addSkillDetail = function () {
				var reqAddSkillDetail = {
						method : 'POST',
						url : '/addSkillDetail',
						headers: {
						    'Authorization': $window.localStorage.token
						},
						data: {
							"userID" : userID,
							"skill": $scope.skill
						},
						withCredentials: true
					};
				
				$http(reqAddSkillDetail).success(function(response) {
					if (response.status === true) {					
						$window.location = '/successLogin';
					} else {
						$window.localStorage.clear();
						$window.location = '/login';
					}	
				}).error(function(error) {
					alert("Error");
				});
			};
			
			$scope.search = function () {
				$window.localStorage.search = $scope.searchString;
				$window.location = '/connectionSearchResult';
			};
			
			$scope.uploadNewProfileImage = function () {
				alert("Upload Image Clicked");
			};
			
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

successLogin.controller('homePageController', homePageController);