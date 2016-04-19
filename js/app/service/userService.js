
jajsApp.factory('UserService', [function () {

    return {
        get: function () {
            var user = sessionStorage.getItem('userSession');
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
        logout: function () {
            sessionStorage.clear();
        }
    };

}]);