"use strict";
const app = angular.module('myApp', ['ngRoute', 'ngResource'])
.config(['$routeProvider', '$provide', function($routeProvider, $provide) {

    $routeProvider
    .when('/identities', {
        templateUrl: '/assets/pages/identities.html',
        controller: 'identities_controller',
    })
    .when('/', {
        templateUrl: '/assets/pages/home.html',
        controller: 'home_controller'
    })

    // to provide usage logs
    $provide.decorator('ngClickDirective', ['$delegate',
            function ($delegate) {
        const originalCompile = $delegate[0].compile;
        $delegate[0].compile = function(element, attrs, transclude) {
            if (!attrs.no_track) {
                element.bind('click', function() {
                    // note: probably needs to be in 'link' to handle ng-repeats
                    console.log(element);
                    console.log(JSON.stringify(element));
                    console.log(attrs.foo);
                    console.log(attrs.id);
                    console.log(attrs.ngClick);
                });
            }
            return originalCompile(element, attrs, transclude);
        };
        return $delegate;
    }])
}])
.controller('home_controller', ['$scope', function ($scope) {
    $scope.secret_base = 'calgary';
    $scope.true_identity = 'Arty';
    $scope.secret_mission = 'he likes to party';
}])
.controller('identities_controller', ['$scope', '$http', function ($scope, $http) {
    $scope.identities = [];
    $scope.get_new_id = (index) => {
        $http.get("https://api.randomuser.me")
        .then((response) => {
            if (typeof index === 'number' && index >= 0){
                $scope.identities[index] = response.data.results[0];
            } else {
                $scope.identities.push(response.data.results[0]);
            }
        });
    };
    $scope.delete_id = index => $scope.identities.splice(index, 1);
}])
.directive('identity', function () {
    return {
        restrict: 'E',
        replace: false,
        templateUrl: '/assets/directives/templates/identity.html',
        scope: {
            identity: '=',
            getNewId: '&',
            deleteId: '&',
            index: '='
        },
        link: (scope, elems, attrs) => {
            scope.identity.gender = 'orange';
        }
    }
})
.directive('foo', function () {
    return {
        restrict: 'E',
        replace: false,
        template: `<h4>foo</h4>
<p>bar</p>
<p>baz</p>`,
        //templateUrl: '/assets/directives/templates/foo.html',
        // scope: {
        //     identity: '=',
        //     getNewId: '&',
        //     deleteId: '&',
        //     index: '='
        // },
        link: (scope, elems, attrs) => {
            scope.quux = 'quux';
        }
    }
});
