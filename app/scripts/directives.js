'use strict';

angular.module('shino')
    .directive('passMatch', function () {
        return {
            // restrict: 'A', // only activate on element attribute
            require: 'ngModel', // get a hold of NgModelController
            link: function (scope, elem, attrs, model) {
                if (!attrs.passMatch) {
                    console.error('passMatch expects a model as an argument!');
                    return;
                }
                scope.$watch(attrs.passMatch, function (value) {
                    // Only compare values if the second ctrl has a value.
                    if (model.$viewValue !== undefined && model.$viewValue !== '') {
                        model.$setValidity('passMatch', value === model.$viewValue);
                    }
                });
                model.$parsers.push(function (value) {
                    // Mute the nxEqual error if the second ctrl is empty.
                    if (value === undefined || value === '') {
                        model.$setValidity('passMatch', true);
                        return value;
                    }
                    var isValid = value === scope.$eval(attrs.passMatch);
                    model.$setValidity('passMatch', isValid);
                    return isValid ? value : undefined;
                });
            }
        }
    })
    ;
