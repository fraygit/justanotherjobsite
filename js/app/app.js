window.googleSignInDeferred = $.Deferred();

var init = function () {
    window.googleSignInDeferred.resolve('');
};

var jajsApp = angular.module('jajsApp', ['ui.router']);

jajsApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '',
            abstract: true,
            views: {
                'header':
                    {
                        templateUrl: 'js/app/partials/header.html',
                        controller: 'HeaderController'
                    },
                'footer':
                    {
                        templateUrl: 'js/app/partials/footer.html'
                    },
                'dashboardHeaderMenu':
                    {
                        templateUrl: 'js/app/partials/dashboardHeader.html',
                        controller: 'DashboardHeaderController'
                    }
            }
        })

        .state('home.index', {
            url: '/home',
            views: {
                'container@': {
                    templateUrl: 'js/app/templates/home.html',
                    controller: 'HomeController'
                }
            }
        })

        .state('home.dashboard', {
            url: '/dashboard',
            views: {
                'container@': {
                    templateUrl: 'js/app/templates/dashboard.html',
                    controller: 'DashboardController'
                }
            }
        })

        .state('home.dashboard.myprofile', {
            url: '/myprofile',
            views: {
                'container@': {
                    templateUrl: 'js/app/templates/myprofile.html'
                }
            }
        })
});