
jajsApp.factory('UserService', ['$rootScope', '$state', function ($rootScope, $state) {

    return {
        get: function () {
            var user = sessionStorage.getItem('userSession');

            if ($state.current.name.indexOf('.dashboard') > -1) {
                $rootScope.$broadcast('dashboard');
            }
            else {
                $rootScope.$broadcast('home');
            }

            if (user == null) {
                var userObject = {
                    Toke: '',
                    Email: '',
                    FirstName: '',
                    LastName: ''
                }
                sessionStorage.setItem('userSession', JSON.stringify(userObject));
                return userObject;
            }
            return JSON.parse(user);
        },
        set: function(userObject){
            sessionStorage.setItem('userSession', JSON.stringify(userObject));
        },
        logout: function (cb) {
            sessionStorage.clear();
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                cb();
            });
        }
    };

}]);