'use strict'

angular.module('shino')
    .constant('resUrl', 'http://192.168.1.112:3000')
    .factory('menuFactory', ['$resource', 'resUrl', function($resource, resUrl) {
        return {
            getDishes: function() {
                return $resource(resUrl + '/dishes/:id', null, {
                    update: {
                        method: 'PUT'
                    }
                });
            },
            getPromotions: function() {
                return $resource(resUrl + '/promotions/:id');
            }
        }
    }])