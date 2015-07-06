angular.module('starter.controllers', [])
  .controller('TeamCtrl', function ($scope, teams, positions, $ionicActionSheet) {
  $scope.cars = positions.carArray;
    $scope.teams = positions.teams;

  })

  .controller('mapCoordinates', function ($scope, $http, positions,teams) {

    positions.setSVG();
    positions.init();
    positions.startLoop();
  });