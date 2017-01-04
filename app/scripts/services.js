'use strict'

angular.module('shino')
    .constant('resUrl', 'https://localhost:3443')
    .factory('resFactory', ['$resource', 'resUrl', function($resource, resUrl) {
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

    ;