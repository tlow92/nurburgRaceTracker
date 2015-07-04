angular.module('starter.controllers', [])

  /*
   .controller('DashCtrl', function($scope,positions) {
   positions.get().then(function(data) {
   console.log(data)
   })
   })
   */

  .controller('TeamCtrl', function ($scope, teams, positions) {

    var sp7 = teams.getClassInformation('SP7','#00eb00');

    $scope.getSP7 = function () {
      return sp7;
    }

      .controller(function($scope, $ionicActionSheet, $timeout) {

        // Triggered on a button click, or some other target
        $scope.show = function() {

          // Show the action sheet
          var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '<b>Share</b> This' },
              { text: 'Move' }
            ],
            destructiveText: 'Delete',
            titleText: 'Modify your album',
            cancelText: 'Cancel',
            cancel: function() {
              // add cancel code..
            },
            buttonClicked: function(index) {
              return true;
            }
          });
        };
      });




  })

  .controller('mapCoordinates', function ($scope, $http, positions) {

    positions.setSVG();

    positions.init();

    positions.startLoop();

  });