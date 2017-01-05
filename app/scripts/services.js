'use strict'

angular.module('shino')
    .constant('resUrl', 'https://localhost:3443')
    .factory('ResFactory', ['$resource', 'resUrl', function($resource, resUrl) {
        return {
            dishRes: function() {
                // console.log(resUrl + '/dishes/:id');
                return $resource(resUrl + '/dishes/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            commentRes: function() {
                return $resource(resUrl + '/dishes/:id/comments/:commentId', {
                    id: '@id',
                    commentId: '@commentId'
                }, {
                    'update': {
                        method: 'PUT'
                    }
                })
            },
            promotionRes: function() {
                return $resource(resUrl + '/promotions/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            leadershipRes: function() {
                return $resource(resUrl + '/leadership/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            feedbackRes: function() {
                return $resource(resUrl + '/feedback/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            favoriteRes: function() {
                return $resource(resUrl + '/favorites/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                })
            }
        }
    }])
    /**
     * Encapsulation for $window.localStorage
     */
    .factory('$localStorage', ['$window', function($window) {
        return {
            store: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            remove: function(key) {
                $window.localStorage.removeItem(key);
            },
            storeObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key, defaultValue) {
                return JSON.parse($window.localStorage[key]) || defaultValue;
            }
        }
    }])
    // .factory('AuthFactory', ['$localStorage', 'ngDialog', '$resource', 'resUrl', function($localStorage, ngDialog, $resource, resUrl) {
    //     var authFac = {};
    //     var isAuthed = false;
    //
    //     authFac.isAuthenticated = function() {
    //         return isAuthed;
    //     }
    //
    //
    //
    //     return authFac;
    // }])

    ;