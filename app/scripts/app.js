'use strict';

// Declare app level module which depends on views, and components
angular.module('shino', [
    'ui.router', // angular-ui-router
    'ngResource' // angular-resource
]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        // route for single home page
        .state('app', {
            url: '/',
            views: {
                'header': {
                    templateUrl: 'views/header.html'
                },
                'content': {
                    templateUrl: 'views/home.html',
                    controller: 'IndexController'
                },
                'footer': {
                    templateUrl: 'views/footer.html',
                }
            }
        })
        // route for the about us
        .state('app.aboutus', {
            url: 'aboutus',
            views: {
                'content@': {
                    templateUrl: 'views/aboutus.html',
                    controller: 'AboutController'
                }
            }
        })
        // route for the contact us
        .state('app.contactus', {
            url: 'contactus',
            views: {
                'content@': {
                    templateUrl: 'views/contactus.html',
                    controller: 'ContactController'
                }
            }
        })
        // route for the menu page
        .state('app.menu', {
            url: 'menu',
            views: {
                'content@': {
                    templateUrl: 'views/menu.html',
                    controller: 'MenuController'
                }
            }
        })
        // route for the dishdetail page
        .state('app.dishdetail', {
            url: 'menu/:dishId',
            views: {
                'content@': {
                    templateUrl: 'views/dishdetail.html',
                    controller: 'DishDetailController'
                }
            }
        });

    // visit other page redirect to home page
    $urlRouterProvider.otherwise('/');
}]);
