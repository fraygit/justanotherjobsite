
angular.module('jajsApp').controller('EditMyProfileController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {
    var userDetails = UserService.get();
    if (userDetails.token != '' && userDetails.token != undefined) {

        $scope.Profile = {};

        $http.get(appGlobalSettings.apiBaseUrl + '/Profile?token=' + encodeURIComponent(userDetails.token) + "&email=" + encodeURIComponent(userDetails.Email))
            .then(function (data) {
                $scope.Profile = data.data;
            }, function (error) {
                console.log(error);
            });

        $scope.SubmitEdit = function () {
            $http.post(appGlobalSettings.apiBaseUrl + '/Profile?token=' + encodeURIComponent(userDetails.token),
                JSON.stringify($scope.Profile),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                ).then(function (data) {
                    $state.go("home.dashboard.myprofile");
                }, function (error) {
                });
        };
    }
    else {
        document.location.href = "/";
    }
}]);