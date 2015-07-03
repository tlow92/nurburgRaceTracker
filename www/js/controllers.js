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
});