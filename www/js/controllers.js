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


    var car = {
      init : function(id, name, team, country, nr, deviceid, color, clazz, we, ns, dir, speed, ts, unix_ts, matrix_id) {
        this.id = id;
        this.name = name;
        this.team = team;
        this.country = country;
        this.nr = nr;
        this.deviceid = deviceid;
        this.color = color;
        this.clazz = clazz;
        this.we = we;
        this.ns = ns;
        this.dir = dir;
        this.speed = speed;
        this.ts = ts;
        this.unix_ts = unix_ts;
        this.matrix_id = matrix_id;
      },
      setMarker : function(){
        //Ursprung:  x = 29 y = 289
        //Oben rechts: x = 293 y = 15
        this.we = 6.925903;
        this.ns = 50.346256;

        // start oben links
        var startx = 6.920078;
        var starty = 50.38050;
        // end unten rechts
        var endx = 7.005519;
        var endy = 50.323943;
        // svg oben links
        var svgStartx = 29;
        var svgStarty = 15;
        // svg rechts unten
        var svgEndx = 293;
        var svgEndy = 289;

        var dx = endx - startx;
        var dy = starty - endy;

        var svgDx = svgEndx - svgStartx;
        var svgDy = svgEndy - svgStarty;

        var facX = svgDx / dx;
        var facY = svgDy / dy;

        var x = svgStartx + ((this.we - startx) * facX);
        var y = svgStarty + ((starty - this.ns) * facY);


        console.log(x);
        console.log(y);


        // Initialisierung
        var svg = document.getElementById('svgObject');
        svg.addEventListener('load', function() {
          var testNode = document.createElementNS('http://www.w3.org/2000/svg','rect');
          testNode.setAttribute('fill','#FFF000');
          testNode.setAttribute('width','2');
          testNode.setAttribute('height','2');
          testNode.setAttribute('stroke','#FFF');
          // X und Y-Koordinaten
          testNode.setAttribute('x', x);
          testNode.setAttribute('y', y);
          svg.contentDocument.getElementById('carsOnMap').appendChild(testNode);
        });


      }
    };

car.setMarker();


/*
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
      });*/
});