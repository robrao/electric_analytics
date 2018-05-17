'use strict';

describe('controllers', function() {
    beforeEach(module('myApp'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('home_controller', function() {
        it('likes to party', function() {
            var $scope = {};
            var controller = $controller('home_controller', { $scope: $scope });
            expect($scope.secret_mission).toBe('he likes to party');
        });
    });
});
