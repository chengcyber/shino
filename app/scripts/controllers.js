'use strict'

angular.module('shino')
    .controller('HeaderController', ['$scope', function($scope) {
       $scope.logo = faker.image.imageUrl(60, 60);
        $scope.lorem = faker.lorem.text(1);
    }])

    .controller('IndexController', ['$scope', function($scope) {

    }])
;