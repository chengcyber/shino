'use strict'

angular.module('shino')
    .controller('HeaderController', ['$scope', function($scope) {
        $scope.logo = faker.image.imageUrl(60, 60);
        $scope.lorem = faker.lorem.sentence();
    }])

    .controller('FooterController', ['$scope', function($scope) {
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

    .controller('IndexController', ['$scope', function($scope) {
        $scope.ok = true;
    }])
;