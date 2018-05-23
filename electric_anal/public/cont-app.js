"use strict";
const app = angular.module('myApp', ['ngRoute', 'ngResource', 'chart.js'])
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
.controller("line_ctrl", function ($http, $scope) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $http.get("127.0.6.1:80/my_db")
        .then((response) => {
            console.warn(`RESP: ${JSON.stringify(response)}`);
        });
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };
})
.controller("bar_ctrl", ['$scope', function ($scope) {
  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
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
