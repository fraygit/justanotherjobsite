
angular.module('jajsApp').controller('DashboardHeaderController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {

    $rootScope.$on('dashboard', function () {
        $scope.isAuthenticated = true;
    });

    $rootScope.$on('home', function () {
        $scope.isAuthenticated = false;
    });

}]);