angular.module('starter.services', [])

  .factory('positions', function ($http,$interval) {
    var cars = [];

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

    var url = 'img/IPHNGR24_positions.json';
    var strecke = '';
    // Initialisierung

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
      this.ownTs = Date.now();
      this.unix_ts = args.unix_ts;
      this.matrix_id = args.matrix_id;

      this.testNode = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      this.testNode.setAttribute('width', '5');
      this.testNode.setAttribute('height', '5');
      this.testNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'https://cdn2.iconfinder.com/data/icons/social-media-8/128/pointer.png');
      var self = this;

      svg.addEventListener('load', function () {
        var x = svgStartx + ((this.we - startx) * facX);
        var y = svgStarty + ((starty - this.ns) * facY);
        if(strecke == '') {
          strecke = d3.select(svg.contentDocument).select("#Kath_3_").node();
        }
        self.setMarker();
        svg.contentDocument.getElementById('carsOnMap').appendChild(self.testNode);
      });
    }
    Car.prototype.update = function (element, lastUpdate) {
      this.we = element.WE;
      this.ns = element.NS;
      this.speed = element.speed;
      this.ownTs = lastUpdate;
    };
    Car.prototype.setMarker = function () {
      var x = svgStartx + ((this.we - startx) * facX);
      var y = svgStarty + ((starty - this.ns) * facY);
      // 1.5 und 3 wegen icon
      var approxPos = closestPoint(strecke, [x, y]);
      this.testNode.setAttribute('x', approxPos[0] - 3);
      this.testNode.setAttribute('y', approxPos[1] - 4);

      //this.testNode.setAttribute('x', x - 1.5);
      //this.testNode.setAttribute('y', y - 3);
    };
    Car.prototype.removeMarker = function() {
      if(this.testNode != null && this.testNode.parentNode != null){
        this.testNode.parentNode.removeChild(this.testNode);
      }
    };
    function closestPoint(pathNode, point) {
      var pathLength = pathNode.getTotalLength(),
        precision = pathLength / pathNode.pathSegList.numberOfItems * 4,
        best,
        bestLength,
        bestDistance = Infinity;
      // linear scan for coarse approximation
      for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
          best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
      }

      // binary search for precise estimate
      precision *= .5;
      while (precision > 1.2) {
        var before,
          after,
          beforeLength,
          afterLength,
          beforeDistance,
          afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
          best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
          best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
          precision *= .5;
        }
      }

      best = [best.x, best.y];
      best.distance = Math.sqrt(bestDistance);
      return best;

      function distance2(p) {
        var dx = p.x - point[0],
          dy = p.y - point[1];
        return dx * dx + dy * dy;
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
      $http.get(url).success(function (response) {
        response.forEach(function (element, index, array) {
          var car = cars[element.id];
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
    return {
      init: function () {
        $http.get(url).success(function (response) {
          response.forEach(function (element, index, array) {
            var car = new Car(element);
            cars[element.id] = car;
          });
        })
      },
      startLoop: start,
      cancelLoop: function() {
        if( loop != null) {
          $interval.cancel(loop);
        }
      }
    }
  }
);
