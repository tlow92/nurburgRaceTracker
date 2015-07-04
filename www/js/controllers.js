angular.module('starter.controllers', [])



  .controller('TeamCtrl', function ($scope, teams, positions, $ionicActionSheet) {

    












    $scope.$on('$ionicView.enter', function (e) {
      $scope.showClass();
    });

    $scope.showClass = function () {
      // Show the action sheet

      $scope.expression = '';

      var hideSheet = $ionicActionSheet.show({
        buttons: [
          {text: 'SP 7'},
          {text: 'CUP5 (M235i)'}
        ],
        //destructiveText: 'end',
        titleText: 'Wähle eine Klasse',
        cancelText: 'Ende',
        cancel: function () {
          hideSheet();
        },
        buttonClicked: function (index) {
          switch (index) {
            case 0:
              $scope.expression = 'SP7';
              return true;
              break;
            case 1:
              $scope.expression = 'M 235i CUP';
              return true;
              break;
            case 2:
              $scope.expression = '00:15:00';
              return true;
              break;
            case 3:
              $scope.expression = '00:00:00';
              return true;
            default:
              $scope.expression = '02:00:00';
              return true;
              break;
          }
        }
      });
    }
  })

  .controller('mapCoordinates', function ($scope, $http, positions) {

    positions.setSVG();

    positions.init();

    positions.startLoop();

  });