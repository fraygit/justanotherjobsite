angular.module('jajsApp').controller('HomeController', ['$scope', '$http', 'UserService', '$state', '$rootScope', function ($scope, $http, UserService, $state, $rootScope) {
    var userDetails = UserService.get();

}]);