'use strict'

angular.module('shino')
    .controller('HeaderController', ['$scope', 'SignFactory', '$state', 'AuthFactory', '$rootScope', function ($scope, SignFactory, $state, AuthFactory, $rootScope) {
        $scope.logo = faker.image.imageUrl(60, 60);
        $scope.lorem = faker.lorem.sentence();

        $scope.isSignedIn = false;
        $scope.username = 'anonymous';

        /**
         * load local credential in localstorage
         */
        AuthFactory.loadCredential();

        // pop up signin dialog
        $scope.openSignInDialog = function () {
            // console.log('HeaderController openSignIn called');
            SignFactory.openSignInDialog();
            // ngDialog.open({
            //     template: '<p>my template</p>',
            //     plain: true
            // });
        }

        // // pop up signup dialog
        // $scope.openSignUpDialog = function() {
        //     SignFactory.openSignUpDialog();
        // }
        $scope.goToRegister = function () {
            $state.go('app.register');
        }

        // pop up signout dialog
        $scope.openSignOutDialog = function () {
            SignFactory.openSignOutDialog();
        }

        $rootScope.$on('login:Success', function () {
            $scope.isSignedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        })

        $rootScope.$on('logout:Success', function () {
            $scope.isSignedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
        });

        


    }])

    .controller('SignInController', ['$scope', 'SignFactory', 'AuthFactory', function ($scope, SignFactory, AuthFactory) {

        $scope.loginObj = {};
        $scope.doSignIn = function () {
            console.log('do sign in now');
            console.log($scope.loginObj);

            $scope.isLoginFail = false;
            AuthFactory.login($scope.loginObj, function () {
                SignFactory.closeDialog();
            }, function () {
                $scope.isLoginFail = true;
            });

        }

        /**
         * Don't have a account, redirect to sign up dialog
         */
        $scope.openSignUpDialog = function () {
            SignFactory.closeDialog();
            SignFactory.openSignUpDialog();
        }

    }])

    .controller('SignUpController', ['$scope', 'AuthFactory', '$state', function ($scope, AuthFactory, $state) {

        $scope.regObj = {};
        $scope.regFailMsg = '';

        $scope.doRegister = function () {
            console.log('do reg now');
            $scope.regFailMsg = '';
            AuthFactory.register($scope.regObj, function () {
                console.log('reg success');
                AuthFactory.login($scope.regObj);
                $state.go('app');
            }, function (res) {
                $scope.regFailMsg = res.data.err.message;
                console.log($scope.regFailMsg);
            })

        }
    }])

    .controller('SignOutController', ['$scope', 'AuthFactory', 'SignFactory', function ($scope, AuthFactory, SignFactory) {
        $scope.doLogOut = function () {
            AuthFactory.logout(function () {
                SignFactory.closeDialog();
            });
            console.log('user log out now');
        }


    }])

    .controller('FooterController', ['$scope', function ($scope) {
        $scope.streetAddress = faker.address.streetAddress();
        $scope.secondaryAddress = faker.address.secondaryAddress();
        $scope.city = faker.address.city();

        $scope.address = {
            streetAddress: faker.address.streetAddress(),
            secondaryAddress: faker.address.secondaryAddress(),
            city: faker.address.city(),
            phone: faker.phone.phoneNumber(),
            fax: faker.phone.phoneNumber(),
            email: 'liucheng.tech@outlook.com'
        }

    }])

    .controller('IndexController', ['$scope', 'ResFactory', function ($scope, ResFactory) {
        $scope.dish = ResFactory.dishRes().query({
            feature: true
        }).$promise.then(
            // success
            function (res) {
                // console.log(res[0]);
                $scope.dish = res[0];
            }
            );


        $scope.promotion = ResFactory.promotionRes().query({
            feature: true
        }).$promise.then(
            // success
            function (res) {
                $scope.promotion = res[0];
            }
            );

        $scope.specialist = ResFactory.leadershipRes().query({
            feature: true
        }).$promise.then(
            // success
            function (res) {
                $scope.specialist = res[0];
            }
            );

    }])

    .controller('MenuController', ['$scope', 'ResFactory', function ($scope, ResFactory) {
        // ResFactory.dishRes().query({}).$promise.then(
        //         function(res) {
        //             $scope.dishes = res;
        //             console.log($scope.dishes);
        //         }
        //     )
        $scope.dishes = ResFactory.dishRes().query();
        // console.log($scope.dishes);

        $scope.selection = '';

        $scope.setSelection = function (s) {
            $scope.selection = s;

        }

        $scope.getSelection = function () {
            return $scope.selection;
        }

        $scope.checkSelection = function (s) {
            return $scope.selection === s;
        }
    }])

    .controller('AboutController', ['$scope', 'ResFactory', function ($scope, ResFactory) {
        $scope.historyParagraph = faker.lorem.paragraphs();
        $scope.started = '7th March, 2013'
        $scope.company = faker.company.companyName();
        $scope.turnover = faker.finance.amount(100000, 500000);
        $scope.employees = faker.random.number(100, 300);

        $scope.leadership = ResFactory.leadershipRes().query();
    }])

    .controller('ContactController', ['$scope', 'ResFactory', function ($scope, ResFactory) {
        $scope.address = {
            streetAddress: faker.address.streetAddress(),
            secondaryAddress: faker.address.secondaryAddress(),
            city: faker.address.city(),
            phone: faker.phone.phoneNumber(),
            fax: faker.phone.phoneNumber(),
            email: 'liucheng.tech@outlook.com'
        }

        $scope.channels = [
            {
                "value": "tel",
                "label": "Tel."
            },
            {
                "value": "Email",
                "label": "Email"
            }
        ]

        $scope.feedback = {
            approve: false
        }

        $scope.invalidSelection = false;

        $scope.sendFeedback = function () {
            // console.log($scope.feedback);

            /**
             * approve contact, but not select channel
             */
            if ($scope.feedback.approve && ($scope.feedback.mychannel === '') || !$scope.feedback.mychannel) {
                $scope.invalidSelection = true;
                // console.log('feedback incorrect');
                return;
            }

            /**
             * update the sendback
             */
            ResFactory.feedbackRes().save($scope.feedback);

            /**
             * Form Pristine
             */
            $scope.feedbackForm.$setPristine();
            $scope.invalidSelection = false;

            $scope.feedback = {
                mychannel: '',
                firstName: '',
                lastName: '',
                approve: false,
                email: '',
                comment: ''
            }

        }
    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'ResFactory', 'AuthFactory', '$rootScope', '$state', function ($scope, $stateParams, ResFactory, AuthFactory, $rootScope, $state) {
        $scope.dish = ResFactory.dishRes().get({ id: $stateParams.dishId });
        $scope.currentOrder = 'date';
        $scope.currentDate = new Date();
        $scope.isOrderReverse = false;
        $scope.setOrder = function (o) {
            $scope.currentOrder = o;
            $scope.isOrderReverse = !$scope.isOrderReverse;
        }
        $scope.checkOrder = function (o) {
            return $scope.currentOrder === o;
        }

        /**
         * Comment
         */
        $scope.comment = {
            _id: '',
            rating: '5',
            comment: ''
        }

        $scope.sendComment = function () {
            // console.log($scope.comment.rating);
            $scope.comment.rating = parseInt($scope.comment.rating, 10);

            $scope.comment._id = $scope.userId;

            /**
             * Push comment to comments
             * update dish with current comments
             */
            // console.log($scope.comment);
            // $scope.dish.comments.push($scope.comment);
            // ResFactory.dishRes().update({id: parseInt($stateParams.dishId, 10)}, $scope.dish);
            ResFactory.commentRes().save({ id: $scope.dish._id }, $scope.comment)
                .$promise.then(
                function () {
                    $state.reload();

                    $scope.commentForm.$setPristine();
                    $scope.comment = {
                        _id: '',
                        rating: '5',
                        comment: ''
                    }
                },
                function (res) {
                    $scope.comment.rating =  $scope.comment.rating + '';
                    console.log('send comment failed', res);
                }
                );

        }

        /**
         * refresh log status when user login/logout
         */
        $scope.refreshLogStat = function () {
            $scope.isLogedIn = AuthFactory.isAuthenticated();
            $scope.username = AuthFactory.getUsername();
            $scope.userId = AuthFactory.getUserId();
        }

        // first fresh
        $scope.refreshLogStat();

        // update when user login/logout
        $rootScope.$on('login:Success', function () {
            $scope.refreshLogStat();
        });

        $rootScope.$on('logout:Success', function () {
            $scope.refreshLogStat();
        });

    }])
    ;