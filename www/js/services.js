angular.module('starter.services', [])

  .factory('positions', function ($http,$interval, $q) {
    var cars = [];
    var teams = [];
    /**
     * car.id -> position in cars[]
     * @type {Array}
     */
    var carMapping = [];
    var teamMapping = [];

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

    var svg = document.getElementById('svgObject');

    var urlmock = 'img/IPHNGR24_position_current.json';
    var url = 'http://live.racing.apioverip.de/IPHNGR24_positions.json';

    var prom;
    // Initialisierung

    function Car(args) {
      this.id = args.id;
      this.name = args.name;
      this.team = args.team;
      this.country = args.country;
      this.nr = args.nr;
      //this.deviceid = args.deviceid;
      this.color = args.color;
      this.clazz = args.class;
      this.we = args.WE;
      this.ns = args.NS;
      this.dir = args.dir;
      this.speed = args.speed;
      this.ts = args.ts;
      this.ownTs = Date.now();
      this.unix_ts = args.unix_ts;
      this.matrix_id = args.matrix_id;


      if(svg != undefined) {
        this.initMarker();
      }
    }
    Car.prototype.initMarker = function () {

      this.testNode = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      this.testNode.setAttribute('width', '6');
      this.testNode.setAttribute('height', '6');
      this.testNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/location.svg');
      this.testNode.setAttribute('id', this.id);

      var self = this;

      svg.addEventListener('load', function () {
        var x = svgStartx + ((this.we - startx) * facX);
        var y = svgStarty + ((starty - this.ns) * facY);
        self.setMarker();
        svg.contentDocument.getElementById('carsOnMap').appendChild(self.testNode);
      });
    };
    Car.prototype.update = function (element, lastUpdate) {
      if(this.testNode == undefined) {
        this.initMarker();
      }
      this.we = element.WE;
      this.ns = element.NS;
      this.speed = element.speed;
      this.ownTs = lastUpdate;
    };
    Car.prototype.setMarker = function () {
      var oldX = this.testNode.getAttribute('x');
      var oldY = this.testNode.getAttribute('y');
      var x = svgStartx + ((this.we - startx) * facX);
      var y = svgStarty + ((starty - this.ns) * facY);

      if(x == oldX && y == oldY) {
        console.log("no update");
      } else if (oldX == null || oldY == null) {
        this.testNode.setAttribute('x', x);
        this.testNode.setAttribute('y', y);
        this.testNode.setAttribute('transform', 'rotate(-45, ' + (x + 3) + ', ' + (y + 3) + ')');
      } else {
        // 1.5 und 3 wegen icon
        var rotation;
        var diffX = oldX - x;
        var diffY = oldY - y;

        if(diffX == 0){
          if(diffY > 0) {
            rotation = 135;
          } else {
            rotation = -45;
          }
        } else if(diffY == 0) {
          if(diffX > 0) {
            rotation = -135;
          } else {
            rotation = 45
          }
        } else {
          rotation = (Math.atan(Math.abs(diffY) / Math.abs(diffX)) * (180 / Math.PI)) - 45;
        }
        console.log(rotation);
        this.testNode.setAttribute('x', x);
        this.testNode.setAttribute('y', y);
        this.testNode.setAttribute('transform', 'rotate(' + rotation + ', ' + (x + 3) + ', ' + (y + 3) + ')');
      }

    };
    Car.prototype.removeMarker = function() {
      console.log("remove Marker");
      if(this.testNode != null && this.testNode.parentNode != null){
        this.testNode.parentNode.removeChild(this.testNode);
      }
    };
    var render = function () {
      cars.forEach(function(car,index,array) {
        // Wenn Auto 5 Sekunden nichtmehr in Liste ist, wird es von der karte entfernt
        var isVeraltet = car.ownTs < (lastUpdate - 5000);
        if(!isVeraltet) {
          car.setMarker();
        } else {
          car.removeMarker();
        }
      });
    };
    var loop = null;
    var lastUpdate;
    var update = function () {
      lastUpdate = Date.now();
      $http.get(urlmock).success(function (response) {
        response.forEach(function (element, index, array) {
          if(getCar(element.id) == undefined) {
            var car = new Car(element);
            addCar(car);
          } else {
            var car = getCar(element.id);
          }
          car.update(element, lastUpdate);
        });
        render();
      });
    };
    var start = function() {
      if(loop == null){
        loop = $interval(function(){
          update();
        },1500)
      }
    };
    var addCar = function(car){
      var position = cars.push(car);
      if(car.team != undefined)addToTeam(car);
      carMapping[car.id] = position-1;
    };
    var addToTeam = function(car){
      if(teamMapping[car.team] === undefined){
        var team = [];
        var pos = teams.push({push:team.push,name:car.team,forEach:team.forEach});
        teamMapping[car.team] = pos;
      }
      teams[teamMapping[car.team]-1].push(car);
    };
    var getCar = function(id) {
      return cars[carMapping[id]];
    };
    return {
      init: function () {
        if(prom === undefined) {
          prom =  $q(function(resolve, reject) {
            $http.get(urlmock).success(function (response) {
              response.forEach(function (element, index, array) {
                var car = new Car(element);
                addCar(car);
              });
              resolve();
            }).error(reject);
          });
        }
        return prom;
      },
      startLoop: start,
      cancelLoop: function() {
        if( loop != null) {
          $interval.cancel(loop);
        }
      },
      carArray : cars,
      teams: teams,
      getCar : getCar,
      addCar : addCar,
      addToTeam: addToTeam,
      setSVG : function() {
        svg = document.getElementById('svgObject');
      }
    }
  })

  .factory('teams', function ($http, positions, $q) {
    var teams = [];
    var url = 'http://live.racing.apioverip.de/IPHNGR24_list.json';
    var urlmock = 'img/IPHNGR24_list.json';

    var shit = $q(function(resolve, reject) {
      positions.init().then(function() {
        $http.get(urlmock).success(function (response) {
          response.forEach(function(element, index, array){
            var current = positions.getCar(element.deviceid);
            if(current != undefined) {
              if(element.team != undefined){
                current.team = element.team;
                positions.addToTeam(current);
              }
              current.country = element.country;
              current.color = element.color;
              current.clazz = element.class;
              current.name = element.name;
              switch(current.clazz){
                case 'SP7':
                  current.testNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/pointerblau.png');
                  break;
                case 'CUP5':
                  current.testNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/pointerblau.png');
                  break;
                default:
                  current.testNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../img/pointer.png');
                  break;
              }
            }
          });
          resolve();
        }).error(reject);
      });
    });


   return {
      /*getClassInformation: function (clazz) {
        var result = [];
        positions.carArray.forEach(function(element, index, array){
          if(element.clazz == clazz) {
            result.push(element);
          }
        });

        return result;
      }*/
     shit : shit
    }
  });
