
angular.module('jajsApp').controller('DashboardController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {
    var userDetails = UserService.get();
    if (userDetails.token != '' && userDetails.token != undefined) {
    }
    else {
        document.location.href = "/";
    }
}]);