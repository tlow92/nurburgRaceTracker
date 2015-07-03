angular.module('starter.controllers', [])

  /*
.controller('DashCtrl', function($scope,positions) {
      positions.get().then(function(data) {
        console.log(data)
      })
    })
*/
.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('mapCoordinates', function($scope, $http) {
    $scope.teamlist = [];
    $scope.teamposition = [];

// JSON to array!

    $http.get('http://live.racing.apioverip.de/IPHNGR24_positions.json')
    .success(function(response){
      $scope.teamlist = response;
    });

    $http.get('http://live.racing.apioverip.de/IPHNGR24_positions.json')
      .success(function(response){
        $scope.teamposition = response;
    });


      console.log($scope);
      console.log($scope.pNS);
      var startx = 6.934339;
      var starty = 50.357903;
      var endx = 6.960766;
      var endy = 50.369982;
      var dx = endx-startx;
      var dy = endy-starty;
      var svgDx =508;
      var svgDy =503;
      var facX = svgDx/dx;
      var facY = svgDy/dy;
      $scope.dx = ($scope.pEW - startx) * facX;
      $scope.dy = ((starty - $scope.pNS)* facY) - svgDy;
});