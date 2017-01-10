'use strict'

angular.module('shino')
    .factory('ResFactory', ['$resource', 'resUrl', function ($resource, resUrl) {
        return {
            dishRes: function () {
                // console.log(resUrl + '/dishes/:id');
                return $resource(resUrl + '/dishes/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            commentRes: function () {
                return $resource(resUrl + '/dishes/:id/comments/:commentId', {
                    id: '@id',
                    commentId: '@commentId'
                },
                    {
                        'update': {
                            method: 'PUT'
                        }
                    })
            },
            promotionRes: function () {
                return $resource(resUrl + '/promotions/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            leadershipRes: function () {
                return $resource(resUrl + '/leadership/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            feedbackRes: function () {
                return $resource(resUrl + '/feedback/:id', null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            },
            favoriteRes: function () {
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
    .factory('$localStorage', ['$window', function ($window) {
        return {
            store: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            storeObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                return JSON.parse($window.localStorage[key] || defaultValue);
            }
        }
    }])
    .factory('SignFactory', ['ngDialog', function (ngDialog) {
        return {
            openSignInDialog: function () {
                ngDialog.open({
                    template: 'views/signin.html',
                    // scope: $scope,
                    className: 'ngdialog-theme-default',
                    controller: 'SignInController'
                });
            },
            openSignUpDialog: function () {
                ngDialog.open({
                    template: 'views/signup.html',
                    // scope: $scope,
                    className: 'ngdialog-theme-default',
                    controller: 'SignUpController'
                });
            },
            openSignOutDialog: function () {
                ngDialog.open({
                    template: 'views/signout.html',
                    // scope: $scope,
                    className: 'ngdialog-theme-default',
                    controller: 'SignOutController'
                });
            },
            closeDialog: function () {
                ngDialog.close();
            }
        }
    }])
    .factory('AuthFactory', ['$http', '$resource', 'resUrl', '$rootScope', '$localStorage', function ($http, $resource, resUrl, $rootScope, $localStorage) {
        var authFac = {};
        var isAuthed = false;
        var credentialKey = 'userCredentials';
        var username = '';
        var token = void 0;
        var userId = void 0;

        authFac.isAuthenticated = function () {
            return isAuthed;
        }

        authFac.getUsername = function () {
            return username;
        }

        authFac.getUserId = function () {
            return userId;
        }

        /**
         * REST API on resURL + '/users/login'
         */
        authFac.loginRes = function () {
            return $resource(resUrl + '/users/login');
        }

        /**
         * REST API on resURL + '/users/logout'
         */
        authFac.logoutRes = function () {
            return $resource(resUrl + '/users/logout');
        }

        /**
         * REST API on resURL + '/users/register'
         */
        authFac.regRes = function () {
            return $resource(resUrl + '/users/register');
        }

        /**
         * Store user info (username, token) to $localStorage
         */
        authFac.storeCredential = function (t) {
            $localStorage.storeObject(credentialKey, t);
        }

        /**
         * Set in-line auth status as login
         */
        authFac.setAuthUtil = function (o) {
            isAuthed = true;
            username = o.username;
            token = o.token;
            userId = o.userId

            // set x-access-token on header
            $http.defaults.headers.common['x-access-token'] = token;
            console.log('token attached: ', token);
        }

        /**
         * User login, POST username and password to /users/login
         * then save the username and given token to $localStorage,
         * update inline auth status, then broadcast 'login:Success' sign to $rootScope.
         * @o: loginData, {username:'foo', password: 'bar'}
         * @cbSuccess: callback function when success
         * @cbFail: callback function when fail
         */
        authFac.login = function (o, cbSuccess, cbFail) {
            var self = this;
            this.loginRes().save(o).$promise.then(
                function (res) {
                    console.log(res);
                    var creObj = {
                        username: o.username,
                        userId: res.userId,
                        token: res.token
                    }
                    console.log('current Login info: ', creObj);
                    self.storeCredential(creObj);
                    self.setAuthUtil(creObj);
                    $rootScope.$broadcast('login:Success');

                    if (typeof cbSuccess === 'function') {
                        cbSuccess(res);
                    }
                },
                function (res) {
                    if (typeof cbFail === 'function') {
                        cbFail(res);
                    }
                }
            )
        }

        /**
         * destory saved user info in $localStorage
         */
        authFac.destoryCredential = function () {
            $localStorage.storeObject(credentialKey, null);
        }

        /**
         * Update in-line auth status as logout
         */
        authFac.unsetAuthUtil = function () {
            isAuthed = false;
            username = '';
            userId = void 0;
            token = void 0;
        }

        /**
         * User logout, GET /users/logout
         * destory the saved user info in $localStorage,
         * update inline auth status, then broadcast 'logout:Success' sign to $rootScope.
         */
        authFac.logout = function (cb) {
            var self = this;
            self.logoutRes().get(function (res) {
                console.log(res);
            })
            self.destoryCredential();
            self.unsetAuthUtil();
            $rootScope.$broadcast('logout:Success');

            if (typeof cb === 'function') {
                cb();
            }
        }

        /**
         * User register, POST /users/register
         * if success, then login automatically, called in controller, not here
         * @o: regObj to register
         * @cbSuccess: callback function when success
         * @cbFail: callback function when fail
         */
        authFac.register = function (o, cbSuccess, cbFail) {
            var self = this;
            self.regRes().save(o).$promise.then(
                function (res) {
                    if (typeof cbSuccess === 'function') {
                        cbSuccess(res);
                    }
                },
                function (res) {
                    if (typeof cbFail === 'function') {
                        cbFail(res);
                    }
                }
            );
        }

        /**
         * Check the login token is expired by get /user/login
         */
        authFac.verifyAuth = function() {
            var self = this;
            self.loginRes().get(function(res) {
                console.log('verify success', res);
                console.log(isAuthed, username);
                $rootScope.$broadcast('login:Success');                
            }, function(res) {
                console.log('verify fail', res);
                self.logout();
            });
        }

        /**
         * load login data from localStorage
         */
        authFac.loadCredential = function () {
            var self = this;
            var credential = $localStorage.getObject(credentialKey, '{}');
            console.log('credential', credential);
            // localStorage have credentials
            if (credential && credential.token) {
                self.setAuthUtil(credential);
                console.log(isAuthed, username);
                // validate local token
                self.verifyAuth();    
            }
        }

        return authFac;
    }])

    ;
