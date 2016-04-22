
angular.module('jajsApp').controller('MyProfileController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {
    var userDetails = UserService.get();
    if (userDetails.token != '' && userDetails.token != undefined) {

        $scope.Profile = {};
        $scope.ExperienceDetail = {
            CompanyName: '',
            JobTitle: '',
            JobDescription: ''
        };

        $http.get(appGlobalSettings.apiBaseUrl + '/Profile?token=' + encodeURIComponent(userDetails.token) + "&email=" + encodeURIComponent(userDetails.Email))
            .then(function (data) {
                $scope.Profile = data.data;
            }, function (error) {
                console.log(error);
            });

        $scope.EditExperience = {
            Title: "Add Experience"
        };

        $scope.EditExperience = function () {
            $('#editExperience').modal('show');
        };

        $scope.AddExperience = function () {
            $scope.EditExperience = {
                Title: "Add Experience"
            };
            $('#editExperience').modal('show');
        };

        $scope.AddWork = function () {
            if ($scope.EditExperience.Title == "Add Experience") {
                $http.put(appGlobalSettings.apiBaseUrl + '/WorkExperience?token=' + encodeURIComponent(userDetails.token),
                    JSON.stringify($scope.ExperienceDetail),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    ).then(function (data) {
                        console.log(data);
                    }, function (error) {
                    });
            }
        }

        $scope.WorkExperienceList = [];
        var retrieveWorkExperience = function () {
            $http.get(appGlobalSettings.apiBaseUrl + '/WorkExperience?token=' + encodeURIComponent(userDetails.token) + "&email=" + encodeURIComponent(userDetails.Email))
                .then(function (data) {
                    $scope.WorkExperienceList = data.data;
                }, function (error) {
                    console.log(error);
                });
        };
        retrieveWorkExperience();

    }
    else {
        document.location.href = "/";
    }
}]);