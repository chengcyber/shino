'use strict'

angular.module('shino')
    .constant('resUrl', 'http://localhost:3000')
    .factory('menuFactory', ['$resource', 'resUrl', function($resource, resUrl) {
        return {
            getDishes: function() {
                // console.log(resUrl + '/dishes/:id');
                return $resource(resUrl + '/dishes/:id', null, {
                    update: {
                        method: 'PUT'
                    }
                });
            },
            getPromotions: function() {
                return $resource(resUrl + '/promotions/:id');
            },
            getLeadership: function() {
                return $resource(resUrl + '/leadership/:id');
            },
            getFeedback: function() {
                return $resource(resUrl + '/feedback/:id');
            }
        }
    }])

    ;