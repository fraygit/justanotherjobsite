
angular.module('jajsApp').controller('DashboardHeaderController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {

    $scope.currentState = $state.current.name;

    $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
        $scope.currentState = toState.name;
    })

    $rootScope.$on('dashboard', function () {
        $scope.isAuthenticated = true;
    });

    $rootScope.$on('home', function () {
        $scope.isAuthenticated = false;
    });

    if ($state.current.name.indexOf('.dashboard') > -1) {
        $rootScope.$broadcast('dashboard');
    }
    else {
        $rootScope.$broadcast('home');
    }

}]);