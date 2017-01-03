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

    .controller('IndexController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.dish = menuFactory.getDishes().get({id: 0});

        $scope.promotion = menuFactory.getPromotions().get({id:0});

        $scope.specialist = menuFactory.getLeadership().get({id:0});
    }])

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.dishes = menuFactory.getDishes().query(); 

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

    .controller('AboutController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.historyParagraph = faker.lorem.paragraphs();
        $scope.started = '7th March, 2013'
        $scope.company = faker.company.companyName();
        $scope.turnover = faker.finance.amount(100000, 500000);
        $scope.employees = faker.random.number(100, 300);

        $scope.leadership = menuFactory.getLeadership().query();
    }])

    .controller('ContactController', ['$scope', function ($scope) {
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
        
        $scope.sendFeedback = function() {
            // console.log($scope.feedback);

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

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.dishId, 10)});
    }])
    ;