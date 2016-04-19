
angular.module('jajsApp').controller('HeaderController', ['$scope', '$http', 'UserService', function ($scope, $http, UserService) {

    $scope.isAuthenticated = false;
    $scope.DisplayName = '';

    var attachSignin = function (element) {
        console.log(element.id);
        auth2.attachClickHandler(element, {},
            function (googleUser) {
                var profile = googleUser.getBasicProfile();

                var userObject = {
                    Token: '',
                    Email: profile.getEmail(),
                    FirstName: profile.getGivenName(),
                    LastName: profile.getFamilyName()
                }

                UserService.set(userObject);

                appSocialSignIn(function (isSuccess) {
                    if (isSuccess) {
                        ChangeStateToLogon();
                    }
                });

                console.log('ID: ' + profile.getId());
                console.log('Full Name: ' + profile.getName());
                console.log('Given Name: ' + profile.getGivenName());
                console.log('Family Name: ' + profile.getFamilyName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
            }, function (error) {
                alert(JSON.stringify(error, undefined, 2));
            });
    };

    window.googleSignInDeferred.done(function () {
        gapi.load('auth2', function () {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: appGlobalSettings.googleCredentialClientID,
                cookiepolicy: 'single_host_origin',
                // Request scopes in addition to 'profile' and 'email'
                //scope: 'additional_scope'
            });
            attachSignin(document.getElementById('googleSignInButton'));
        });
    });

    var ChangeStateToLogon = function () {
        var userDetails = UserService.get();
        if (userDetails.token != '' && userDetails.token != undefined) {
            $scope.isAuthenticated = true;
            $scope.DisplayName = userDetails.FirstName;
        }
    };

    $scope.Logout = function () {
        UserService.logout();
        $scope.isAuthenticated = false;
    }

    ChangeStateToLogon();

    appSocialSignIn = function (cb) {

        var userDetails = UserService.get();
        var requestData = {
            FirstName: userDetails.firstname,
            LastName: userDetails.lastname,
            Email: userDetails.email
        };
        $http.put(appGlobalSettings.apiBaseUrl + '/User',
            JSON.stringify(requestData),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then(function (data) {
                requestData.token = data.data.Token;
                UserService.set(requestData);
                cb(true);
            }, function (error) {
                console.log(error)
                cb(false);
            });
    };

}]);