angular.module('starter.controllers', [])

  /*
   .controller('DashCtrl', function($scope,positions) {
   positions.get().then(function(data) {
   console.log(data)
   })
   })
   */
  .controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    }
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('mapCoordinates', function ($scope, $http) {


    function Car(args) {
      this.id = args.id;
      this.name = args.name;
      this.team = args.team;
      this.country = args.country;
      this.nr = args.nr;
      this.deviceid = args.deviceid;
      this.color = args.color;
      this.clazz = args.clazz;
      this.we = args.WE;
      this.ns = args.NS;
      this.dir = args.dir;
      this.speed = args.speed;
      this.ts = args.ts;
      this.unix_ts = args.unix_ts;
      this.matrix_id = args.matrix_id;
    };
    Car.prototype.setMarker = function () {
      //Ursprung:  x = 29 y = 289
      //Oben rechts: x = 293 y = 15

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


      // Initialisierung
      var svg = document.getElementById('svgObject');
      svg.addEventListener('load', function () {
        var testNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        testNode.setAttribute('fill', '#FF0000');
        testNode.setAttribute('width', '2');
        testNode.setAttribute('height', '2');
        testNode.setAttribute('stroke', '#FFF');
        // X und Y-Koordinaten
        testNode.setAttribute('x', x);
        testNode.setAttribute('y', y);
        svg.contentDocument.getElementById('carsOnMap').appendChild(testNode);
      });


    };

    var car = new Car({"id":"216581","WE":6.94734,"NS":50.336328,"dir":50,"speed":13.9,"ts":"2015-07-03 11:40:09","unix_ts":1435923609,"matrix_id":"103"});
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