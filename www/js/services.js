angular.module('starter.services', [])

  .factory('positions', function ($http,$interval, $q) {
    var cars = [];
    var teams = [];
    /**
     * car.id -> position in cars[]
     * @type {Array}
     */
      var quadtree;
      function closestPoint(pathNode, point) {
        var promise = $q(function(resolve,reject){
          if(quadtree!=undefined){
            var foundPoint = quadtree.find(point);
            resolve(foundPoint);
          }else{
            reject();
          }
        });
        return promise;
      };


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
    var strecke = '';
    var precision,pathLength;

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
      this.tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      this.tooltip.setAttribute('class', this.id);
      this.tooltip.setAttribute('width', 36);
      this.tooltip.setAttribute('height', 5);
      this.tooltip.setAttribute('rx','2');
      this.tooltip.setAttribute('ry','2');
      this.tooltip.setAttribute('x','-14');
      this.tooltip.setAttribute('y','6');
      this.tooltip.setAttribute('opacity','0.4');
      this.tooltip.setAttribute('display', 'none');
      this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      this.text.setAttribute('class', this.id);
      this.text.setAttribute('width', 30);
      this.text.setAttribute('height', 10);
      this.text.setAttribute('x','-12');
      this.text.setAttribute('y','9');
      this.text.setAttribute('font-size', 2);
      this.text.setAttribute('fill', '#FFF');
      this.text.setAttribute('font-family', 'Tahoma');
      this.text.setAttribute('letter-spacing', '0.4');
      this.text.textContent = this.id;
      this.text.setAttribute('display', 'none');

      this.testGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      /*
      this.testGroup.setAttribute('onclick', '' +
        'var tooltips = document.getElementById(\'svgMarker\').getElementsByTagName(\'rect\');' +
        'var text = document.getElementById(\'svgMarker\').getElementsByTagName(\'text\');' +
        'var stroke = document.getElementById(\'svgMarker\').getElementsByTagName(\'path\');' +
        'for(var i=0;i<tooltips.length;i++){tooltips[i].setAttribute(\'display\',\'none\');text[i].setAttribute(\'display\',\'none\');stroke[i].removeAttribute(\'stroke\')};' +
        'var ele = document.getElementsByClassName('+this.id+');' +
        'ele[0].setAttribute(\'display\', \'block\');' +
        'ele[1].setAttribute(\'display\', \'block\');' +
        'document.getElementById('+this.id+').setAttribute(\'stroke\', \'#000\');');
      */
      //this.testGroup.setAttribute('onmouseleave', 'hideAllTooltips()');
      this.testPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      //this.testPath.setAttribute('d', 'M10.368,19.102c0.349,1.049,1.011,1.086,1.478,0.086l5.309-11.375c0.467-1.002,0.034-1.434-0.967-0.967L4.812,12.154   c-1.001,0.467-0.963,1.129,0.085,1.479L9,15L10.368,19.102z');
      //this.testPath.setAttribute('transform', 'scale(0.25,0.25)');
      this.testPath.setAttribute('d', 'M256,0C167.641,0,96,71.625,96,160c0,24.75,5.625,48.219,15.672,69.125C112.234,230.313,256,512,256,512l142.594-279.375 C409.719,210.844,416,186.156,416,160C416,71.625,344.375,0,256,0z M256,256c-53.016,0-96-43-96-96s42.984-96,96-96   c53,0,96,43,96,96S309,256,256,256z');
      this.testPath.setAttribute('transform', 'scale(0.0075,0.0075)');
      this.testPath.setAttribute('fill', '#FFF');
      this.testPath.setAttribute('id', this.id);
      this.testGroup.appendChild(this.testPath);

      var self = this;

      svg.addEventListener('load', function () {
        var x = svgStartx + ((this.we - startx) * facX);
        var y = svgStarty + ((starty - this.ns) * facY);
        if(strecke == '') {
          strecke = d3.select(svg.contentDocument).select("#Kath_3_").node();
          pathLength = strecke.getTotalLength();
          precision = 1;//25.378km
          currentLength = 0;
          var data = [];
          while (currentLength < pathLength) {
            var currPoint = strecke.getPointAtLength(currentLength);
            data.push([currPoint.x, currPoint.y]);
            currentLength += precision
          }

          quadtree = d3.geom.quadtree()
            .extent([[-1, -1], [400 + 1, 400 + 1]])
          (data);
        }
        self.setMarker();
        //svg.contentDocument.getElementById('carsOnMap').appendChild(self.testGroup);
        document.getElementById('svgMarker').appendChild(self.testGroup);
        self.testGroup.appendChild(self.tooltip);
        self.testGroup.appendChild(self.text);
      })
    };

    Car.prototype.update = function (element, lastUpdate) {
      if(this.testGroup == undefined) {
        this.initMarker();
      }
      this.we = element.WE;
      this.ns = element.NS;
      this.speed = element.speed;
      this.ownTs = lastUpdate;
    };
    Car.prototype.setMarker = function () {
      var oldX = this.oldX;
      var oldY = this.oldY;
      var x = svgStartx + ((this.we - startx) * facX);
      var y = svgStarty + ((starty - this.ns) * facY);
      // 1.5 und 3 wegen icon
      this.oldX = x;
      this.oldY = y;
      var self = this;
      closestPoint(strecke, [x, y]).then(function(approxPos){
        self.testGroup.setAttribute('transform', 'translate('+(approxPos[0]-3)+', '+(approxPos[1]-3.5)+')');
      });

      if(x == oldX && y == oldY) {
        //console.log("no update");
      } else {
        this.testGroup.setAttribute('transform', 'translate('+x+', '+y+')');
      }

    };
    Car.prototype.removeMarker = function() {
      console.log("remove Marker");
      if(this.testGroup != null && this.testGroup.parentNode != null){
        this.testGroup.parentNode.removeChild(this.testGroup);
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
        },3000)
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
              var setColor = function(colorHexCode){
                current.testPath.setAttribute('fill', colorHexCode);
              };
              switch(current.clazz){
                case 'CUP1':
                  setColor('#00ccff');
                  break;
                case 'CUP2':
                  setColor('#0044ff');
                  break;
                case 'CUP4':
                  setColor('#0080ff');
                  break;
                case 'CUP5':
                  setColor('#0066cc');
                  break;
                case 'H1':
                  setColor('#00ff00');
                  break;
                case 'H2':
                  setColor('#00b300');
                  break;
                case 'H3':
                  setColor('#00ff80');
                  break;
                case 'H4':
                  setColor('#c0ff00');
                  break;
                case 'V1':
                  setColor('#cc0000');
                  break;
                case 'VT1':
                  setColor('#b30000');
                  break;
                case 'V2':
                  setColor('#e60000');
                  break;
                case 'VT2':
                  setColor('#ff1a1a');
                  break;
                case 'V3':
                  setColor('#ff1a53');
                  break;
                case 'VT3':
                  setColor('#ff3466');
                  break;
                case 'V4':
                  setColor('#ff2d1a');
                  break;
                case 'V5':
                  setColor('#ff4434');
                  break;
                case 'V6':
                  setColor('#ff7734');
                  break;
                case 'SP1':
                  setColor('#7c204e');
                  break;
                case 'SP2':
                  setColor('#7c2037');
                  break;
                case 'SP2T':
                  setColor('#7c3720');
                  break;
                case 'SP3T':
                  setColor('#a5492a');
                  break;
                case 'SP4':
                  setColor('#eb6ceb');
                  break;
                case 'SP4T':
                  setColor('#e53fe5');
                  break;
                case 'SP5':
                  setColor('#b9b900');
                  break;
                case 'SP6':
                  setColor('#01DF3A');
                  break;
                case 'SP7':
                  setColor('#d2d200');
                  break;
                case 'SP8':
                  setColor('#cdcd00');
                  break;
                case 'SP8T':
                  setColor('#e6e600');
                  break;
                case 'SP9':
                  setColor('#eaff00');
                  break;
                case 'SPPRO':
                  setColor('#ffff00');
                  break;
                case 'SPX':
                  setColor('#525252');
                  break;
                case 'E1-XP1':
                  setColor('#8d8d8d');
                  break;
                case 'E1-XP2':
                  setColor('#b3b3b3');
                  break;
                case 'E1-XP':
                  setColor('#d9d9d9');
                  break;
                default:
                  setColor('#FFF');
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
