angular.module('starter.controllers', [])
  .controller('TeamCtrl', function ($scope, teams, positions, $ionicActionSheet) {
  $scope.cars = positions.carArray;
    console.log($scope.cars);
    $scope.$on('$ionicView.enter', function (e) {
      //$scope.showClass();
    });
    teams.shit.then(function(){

      $scope.showClass = function () {
        // Show the action sheet

        $scope.expression = '';

        var hideSheet = $ionicActionSheet.show({
          buttons: [
            {text: 'VLN Produktionswagen V / VT'},
            {text: 'Gruppe H'},
            {text: 'VLN-Cup'},
            {text: 'VLN Specials SP / E1'}
          ],
          titleText: 'Wähle eine Klasse',
          cancelText: 'Ende',
          cancel: function () {
            hideSheet();
          },
          buttonClicked: function (index) {
            switch (index) {
              case 0:
                $scope.expression = 'SP7';
                teams.getClassInformation("sp7");
                return true;
                break;
              case 1:
                $scope.expression = 'M 235i CUP';
                return true;
                break;
              default:
                $scope.expression = '';
                return true;
                break;
            }
          }
        });
      }
    });

  })

  .controller('mapCoordinates', function ($scope, $http, positions) {

    positions.setSVG();

    positions.init();

    positions.startLoop();

  });