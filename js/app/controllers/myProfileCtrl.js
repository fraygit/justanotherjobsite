
angular.module('jajsApp').controller('MyProfileController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {
    var userDetails = UserService.get();
    if (userDetails.token != '' && userDetails.token != undefined) {

        $scope.Profile = {};

        $http.get(appGlobalSettings.apiBaseUrl + '/Profile?token=' + encodeURIComponent(userDetails.token) + "&email=" + encodeURIComponent(userDetails.Email))
            .then(function (data) {
                $scope.Profile = data.data;
            }, function (error) {
                console.log(error);
            });
    }
    else {
        document.location.href = "/";
    }
}]);