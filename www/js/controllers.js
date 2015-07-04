angular.module('starter.controllers', [])

  /*
   .controller('DashCtrl', function($scope,positions) {
   positions.get().then(function(data) {
   console.log(data)
   })
   })
   */

  .controller('TeamCtrl', function ($scope, teams) {



  })

  .controller('mapCoordinates', function ($scope, $http, positions) {

    positions.init();

    positions.startLoop();

  });