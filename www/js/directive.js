angular.module('starter.directives', [])

  .directive('math-coords', function() {
    console.log('asd');
    return {
      restrict: 'C',
      template: '<rect x="{{dx}}" y="{{dy}}" width="5" height="5" style="stroke: #000; fill:#FFF;"/>',
      transclude: true,
      scope: {},
      templateUrl: 'tab-dash.html',
      link: function (scope) {
        scope.pNS = '@coordx';
        scope.pEW = '@coordy';
      }
   }
 });