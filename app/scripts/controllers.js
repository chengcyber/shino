'use strict'

angular.module('shino')
    .controller('HeaderController', ['$scope', function ($scope) {
        $scope.logo = faker.image.imageUrl(60, 60);
        $scope.lorem = faker.lorem.sentence();
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

    .controller('IndexController', ['$scope', 'resFactory', function ($scope, resFactory) {
        $scope.dish = resFactory.dishRes().query({
            feature: true
        }).$promise.then(
            // success
            function (res) {
                // console.log(res[0]);
                $scope.dish = res[0];
            }
        );


        $scope.promotion = resFactory.promotionRes().query({
            feature: true
        }).$promise.then(
            // success
            function (res) {
                $scope.promotion = res[0];
            }
        );

        $scope.specialist = resFactory.leadershipRes().query({
            feature: true
        }).$promise.then(
            // success
            function (res) {
                $scope.specialist = res[0];
            }
        );

    }])

    .controller('MenuController', ['$scope', 'resFactory', function ($scope, resFactory) {
        // resFactory.dishRes().query({}).$promise.then(
        //         function(res) {
        //             $scope.dishes = res;
        //             console.log($scope.dishes);
        //         }
        //     )
        $scope.dishes = resFactory.dishRes().query();
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

    .controller('AboutController', ['$scope', 'resFactory', function ($scope, resFactory) {
        $scope.historyParagraph = faker.lorem.paragraphs();
        $scope.started = '7th March, 2013'
        $scope.company = faker.company.companyName();
        $scope.turnover = faker.finance.amount(100000, 500000);
        $scope.employees = faker.random.number(100, 300);

        $scope.leadership = resFactory.leadershipRes().query();
    }])

    .controller('ContactController', ['$scope', 'resFactory', function ($scope, resFactory) {
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
            resFactory.feedbackRes().save($scope.feedback);

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

    .controller('DishDetailController', ['$scope', '$stateParams', 'resFactory', function ($scope, $stateParams, resFactory) {
        $scope.dish = resFactory.dishRes().get({id: $stateParams.dishId});
        $scope.currentOrder = 'author';
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
            author: '',
            rating: '5',
            comment: ''
        }

        $scope.sendComment = function () {
            // console.log($scope.comment.rating);
            $scope.comment.rating = parseInt($scope.comment.rating, 10);

            /**
             * Push comment to comments
             * update dish with current comments
             */
            // console.log($scope.comment);
            // $scope.dish.comments.push($scope.comment);
            // resFactory.dishRes().update({id: parseInt($stateParams.dishId, 10)}, $scope.dish);
            var newComment = new resFactory.commentRes({id: $stateParams.dishId});

            console.log(resFactory.commentRes({id: $scope.dish._id}).query());

            // for (var property in $scope.comment) {
            //     if ($scope.comment.hasOwnProperty(property)) {
            //         newComment[property] = $scope.comment[property];
            //     }
            // }
            console.log(newComment);
            console.log(typeof newComment.$save);

            // newComment.$save(newComment, function(comment) {
            //         console.log('Comment Saved: ', comment);
            //     })
            
            $scope.commentForm.$setPristine();

            $scope.comment = {
                author: '',
                rating: '5',
                comment: ''
            }
        }
    }])
;