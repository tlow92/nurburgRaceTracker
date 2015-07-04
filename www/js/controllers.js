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


    $scope.teamlist = [];
    $scope.teamposition = [];

    // JSON to array
    $http.get('http://live.racing.apioverip.de/IPHNGR24_list.json')
      .success(function(response){
        $scope.teamlist = response;
      });
    $http.get('http://live.racing.apioverip.de/IPHNGR24_positions.json')
      .success(function(response){
        $scope.teamposition = response;
      });


    var carsJSON = [{"id":"216692","WE":6.944655,"NS":50.333833,"dir":0,"speed":0.0,"ts":"2015-07-03 15:51:42","unix_ts":1435938702,"matrix_id":"-2"},{"id":"216598","WE":6.946232,"NS":50.334745,"dir":0,"speed":0.0,"ts":"2015-07-03 15:38:24","unix_ts":1435937904,"matrix_id":"-2"},{"id":"217670","WE":6.947168,"NS":50.33565,"dir":7,"speed":0.0,"ts":"2015-07-03 12:34:09","unix_ts":1435926849,"matrix_id":"-2"},{"id":"218617","WE":6.946188,"NS":50.334848,"dir":219,"speed":0.0,"ts":"2015-07-03 15:36:29","unix_ts":1435937789,"matrix_id":"5"},{"id":"216678","WE":6.945355,"NS":50.334343,"dir":0,"speed":0.0,"ts":"2015-07-03 15:32:32","unix_ts":1435937552,"matrix_id":"-2"},{"id":"216648","WE":6.945795,"NS":50.334582,"dir":224,"speed":0.0,"ts":"2015-07-03 16:40:45","unix_ts":1435941645,"matrix_id":"7"},{"id":"216919","WE":6.946007,"NS":50.33545,"dir":0,"speed":0.0,"ts":"2015-06-20 14:25:00","unix_ts":1434810300,"matrix_id":"-2"},{"id":"217708","WE":6.94579,"NS":50.335035,"dir":0,"speed":0.0,"ts":"2015-07-03 20:07:26","unix_ts":1435954046,"matrix_id":"-2"},{"id":"217754","WE":6.944653,"NS":50.333825,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:58","unix_ts":1435938958,"matrix_id":"-2"},{"id":"216674","WE":6.945933,"NS":50.334593,"dir":0,"speed":0.0,"ts":"2015-07-03 15:53:24","unix_ts":1435938804,"matrix_id":"-2"},{"id":"218605","WE":6.946125,"NS":50.334847,"dir":0,"speed":0.0,"ts":"2015-07-03 15:51:53","unix_ts":1435938713,"matrix_id":"-2"},{"id":"216628","WE":6.9468,"NS":50.33516,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:07","unix_ts":1435938907,"matrix_id":"-2"},{"id":"216638","WE":6.94525,"NS":50.334255,"dir":0,"speed":0.0,"ts":"2015-07-03 16:01:32","unix_ts":1435939292,"matrix_id":"-2"},{"id":"216690","WE":6.94474,"NS":50.333868,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:19","unix_ts":1435938919,"matrix_id":"-2"},{"id":"216550","WE":6.950198,"NS":50.338302,"dir":311,"speed":0.0,"ts":"2015-06-20 11:40:01","unix_ts":1434800401,"matrix_id":"116"},{"id":"216614","WE":6.94602,"NS":50.33509,"dir":0,"speed":0.0,"ts":"2015-07-03 16:02:36","unix_ts":1435939356,"matrix_id":"-2"},{"id":"216650","WE":6.946748,"NS":50.335235,"dir":0,"speed":0.0,"ts":"2015-07-03 15:10:20","unix_ts":1435936220,"matrix_id":"-2"},{"id":"217248","WE":6.94509,"NS":50.334335,"dir":0,"speed":0.0,"ts":"2015-07-03 14:39:04","unix_ts":1435934344,"matrix_id":"-2"},{"id":"216586","WE":6.946617,"NS":50.335535,"dir":216,"speed":6.7,"ts":"2015-07-03 11:32:21","unix_ts":1435923141,"matrix_id":"2"},{"id":"216596","WE":6.947555,"NS":50.33623,"dir":0,"speed":0.0,"ts":"2015-06-20 14:10:53","unix_ts":1434809453,"matrix_id":"-2"},{"id":"217024","WE":6.94451,"NS":50.334337,"dir":157,"speed":0.0,"ts":"2015-07-03 11:17:45","unix_ts":1435922265,"matrix_id":"-2"},{"id":"216546","WE":6.945045,"NS":50.33416,"dir":287,"speed":0.0,"ts":"2015-07-03 15:20:16","unix_ts":1435936816,"matrix_id":"-2"},{"id":"216582","WE":6.945555,"NS":50.335473,"dir":144,"speed":0.0,"ts":"2015-07-03 17:46:09","unix_ts":1435945569,"matrix_id":"-2"},{"id":"216562","WE":6.946762,"NS":50.335177,"dir":243,"speed":0.0,"ts":"2015-07-03 16:00:00","unix_ts":1435939200,"matrix_id":"3"},{"id":"216572","WE":6.945628,"NS":50.334482,"dir":0,"speed":0.0,"ts":"2015-07-03 15:48:59","unix_ts":1435938539,"matrix_id":"-2"},{"id":"216552","WE":6.937872,"NS":50.377592,"dir":46,"speed":152.0,"ts":"2015-06-20 12:44:18","unix_ts":1434804258,"matrix_id":"351"},{"id":"216686","WE":6.945972,"NS":50.334728,"dir":0,"speed":0.0,"ts":"2015-07-03 15:05:56","unix_ts":1435935956,"matrix_id":"-2"},{"id":"217659","WE":6.945892,"NS":50.335045,"dir":0,"speed":0.0,"ts":"2015-07-03 12:27:04","unix_ts":1435926424,"matrix_id":"-2"},{"id":"216512","WE":6.945248,"NS":50.334267,"dir":0,"speed":0.0,"ts":"2015-07-03 16:12:58","unix_ts":1435939978,"matrix_id":"-2"},{"id":"216485","WE":6.946478,"NS":50.335083,"dir":324,"speed":0.0,"ts":"2015-07-03 15:59:53","unix_ts":1435939193,"matrix_id":"-2"},{"id":"217629","WE":6.946545,"NS":50.33508,"dir":0,"speed":0.0,"ts":"2015-07-03 15:57:58","unix_ts":1435939078,"matrix_id":"-2"},{"id":"216860","WE":6.946883,"NS":50.335235,"dir":0,"speed":0.0,"ts":"2015-07-03 15:57:28","unix_ts":1435939048,"matrix_id":"-2"},{"id":"216870","WE":6.945855,"NS":50.334638,"dir":0,"speed":0.0,"ts":"2015-07-03 15:43:05","unix_ts":1435938185,"matrix_id":"-2"},{"id":"216704","WE":6.945585,"NS":50.334833,"dir":0,"speed":0.0,"ts":"2015-07-03 17:10:11","unix_ts":1435943411,"matrix_id":"-2"},{"id":"218097","WE":6.945435,"NS":50.33475,"dir":0,"speed":0.0,"ts":"2015-07-03 17:37:10","unix_ts":1435945030,"matrix_id":"-2"},{"id":"217661","WE":6.440692,"NS":51.367533,"dir":0,"speed":0.0,"ts":"2015-07-02 15:37:26","unix_ts":1435851446,"matrix_id":"-2"},{"id":"217651","WE":6.946447,"NS":50.335442,"dir":0,"speed":0.0,"ts":"2015-07-02 16:35:58","unix_ts":1435854958,"matrix_id":"-2"},{"id":"216700","WE":6.944948,"NS":50.334412,"dir":0,"speed":0.0,"ts":"2015-07-03 17:16:54","unix_ts":1435943814,"matrix_id":"-2"},{"id":"216710","WE":6.946885,"NS":50.335265,"dir":0,"speed":0.0,"ts":"2015-07-03 16:01:33","unix_ts":1435939293,"matrix_id":"-2"},{"id":"217087","WE":6.947777,"NS":50.335975,"dir":16,"speed":0.0,"ts":"2015-07-03 16:10:54","unix_ts":1435939854,"matrix_id":"104"},{"id":"217760","WE":6.945813,"NS":50.334532,"dir":0,"speed":0.0,"ts":"2015-07-03 15:18:55","unix_ts":1435936735,"matrix_id":"-2"},{"id":"216888","WE":6.944903,"NS":50.333765,"dir":0,"speed":0.0,"ts":"2015-07-03 15:58:05","unix_ts":1435939085,"matrix_id":"-2"},{"id":"216900","WE":6.944202,"NS":50.334758,"dir":0,"speed":0.0,"ts":"2015-07-03 13:52:08","unix_ts":1435931528,"matrix_id":"-2"},{"id":"218575","WE":6.946067,"NS":50.335025,"dir":0,"speed":0.0,"ts":"2015-07-03 15:47:45","unix_ts":1435938465,"matrix_id":"-2"},{"id":"216429","WE":6.946245,"NS":50.335282,"dir":0,"speed":0.0,"ts":"2015-07-03 15:36:12","unix_ts":1435937772,"matrix_id":"-2"},{"id":"217657","WE":6.945512,"NS":50.334412,"dir":0,"speed":0.0,"ts":"2015-07-03 15:52:48","unix_ts":1435938768,"matrix_id":"-2"},{"id":"216649","WE":6.945653,"NS":50.334542,"dir":0,"speed":0.0,"ts":"2015-07-03 15:48:50","unix_ts":1435938530,"matrix_id":"-2"},{"id":"217662","WE":6.944315,"NS":50.334233,"dir":0,"speed":0.0,"ts":"2015-07-03 21:35:05","unix_ts":1435959305,"matrix_id":"-2"},{"id":"217683","WE":6.947643,"NS":50.335747,"dir":60,"speed":19.6,"ts":"2015-07-03 20:33:39","unix_ts":1435955619,"matrix_id":"103"},{"id":"217095","WE":6.94597,"NS":50.334833,"dir":0,"speed":0.0,"ts":"2015-07-03 15:54:52","unix_ts":1435938892,"matrix_id":"-2"},{"id":"216891","WE":7.225067,"NS":50.243147,"dir":0,"speed":0.0,"ts":"2015-05-31 16:51:49","unix_ts":1433091109,"matrix_id":"-2"},{"id":"216675","WE":6.94687,"NS":50.33552,"dir":0,"speed":0.0,"ts":"2015-07-04 00:36:13","unix_ts":1435970173,"matrix_id":"-2"},{"id":"217232","WE":6.947165,"NS":50.33561,"dir":0,"speed":0.0,"ts":"2015-07-03 14:27:07","unix_ts":1435933627,"matrix_id":"-2"},{"id":"216451","WE":6.94563,"NS":50.334543,"dir":0,"speed":0.0,"ts":"2015-07-03 15:31:02","unix_ts":1435937462,"matrix_id":"-2"},{"id":"216691","WE":6.947297,"NS":50.335565,"dir":249,"speed":0.0,"ts":"2015-07-03 16:12:30","unix_ts":1435939950,"matrix_id":"1"},{"id":"216605","WE":6.9467,"NS":50.335205,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:31","unix_ts":1435938931,"matrix_id":"-2"},{"id":"216671","WE":6.94505,"NS":50.334478,"dir":0,"speed":0.0,"ts":"2015-07-03 17:29:57","unix_ts":1435944597,"matrix_id":"-2"},{"id":"217587","WE":6.944375,"NS":50.334207,"dir":0,"speed":0.0,"ts":"2015-07-04 00:21:55","unix_ts":1435969315,"matrix_id":"-2"},{"id":"217236","WE":6.945873,"NS":50.33467,"dir":0,"speed":0.0,"ts":"2015-07-03 15:52:56","unix_ts":1435938776,"matrix_id":"-2"},{"id":"216396","WE":6.946212,"NS":50.33497,"dir":0,"speed":0.0,"ts":"2015-07-03 10:36:21","unix_ts":1435919781,"matrix_id":"-2"},{"id":"216631","WE":6.945978,"NS":50.334727,"dir":0,"speed":0.0,"ts":"2015-07-03 15:52:41","unix_ts":1435938761,"matrix_id":"-2"},{"id":"216629","WE":6.945082,"NS":50.33448,"dir":0,"speed":0.0,"ts":"2015-07-03 13:23:17","unix_ts":1435929797,"matrix_id":"-2"},{"id":"218578","WE":6.944465,"NS":50.333737,"dir":0,"speed":0.0,"ts":"2015-07-03 15:43:22","unix_ts":1435938202,"matrix_id":"-2"},{"id":"216589","WE":6.966415,"NS":50.365895,"dir":0,"speed":0.0,"ts":"2015-05-17 05:41:34","unix_ts":1431841294,"matrix_id":"-2"},{"id":"216569","WE":6.946107,"NS":50.334738,"dir":196,"speed":0.0,"ts":"2015-07-03 15:53:49","unix_ts":1435938829,"matrix_id":"-2"},{"id":"216885","WE":6.945067,"NS":50.334147,"dir":0,"speed":0.0,"ts":"2015-07-03 15:28:04","unix_ts":1435937284,"matrix_id":"-2"},{"id":"216549","WE":6.944872,"NS":50.33403,"dir":0,"speed":0.0,"ts":"2015-07-03 15:11:18","unix_ts":1435936278,"matrix_id":"-2"},{"id":"217614","WE":6.946968,"NS":50.33604,"dir":41,"speed":24.6,"ts":"2015-07-03 17:44:58","unix_ts":1435945498,"matrix_id":"102"},{"id":"216719","WE":6.945292,"NS":50.334312,"dir":38,"speed":0.0,"ts":"2015-07-03 16:50:21","unix_ts":1435942221,"matrix_id":"-2"},{"id":"216584","WE":6.946005,"NS":50.334773,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:56","unix_ts":1435938956,"matrix_id":"-2"},{"id":"216625","WE":6.94501,"NS":50.33439,"dir":0,"speed":0.0,"ts":"2015-07-03 17:50:57","unix_ts":1435945857,"matrix_id":"-2"},{"id":"216869","WE":6.945812,"NS":50.334602,"dir":0,"speed":0.0,"ts":"2015-07-03 14:58:37","unix_ts":1435935517,"matrix_id":"-2"},{"id":"216544","WE":6.94511,"NS":50.3336,"dir":0,"speed":0.0,"ts":"2015-07-03 17:35:56","unix_ts":1435944956,"matrix_id":"-2"},{"id":"216693","WE":6.945235,"NS":50.334202,"dir":293,"speed":0.0,"ts":"2015-07-03 16:00:26","unix_ts":1435939226,"matrix_id":"-2"},{"id":"216673","WE":6.96119,"NS":50.380942,"dir":70,"speed":118.7,"ts":"2015-05-17 08:54:07","unix_ts":1431852847,"matrix_id":"415"},{"id":"216643","WE":6.94483,"NS":50.334402,"dir":0,"speed":0.0,"ts":"2015-07-03 17:18:03","unix_ts":1435943883,"matrix_id":"-2"},{"id":"217575","WE":6.945445,"NS":50.334403,"dir":0,"speed":0.0,"ts":"2015-07-03 14:49:05","unix_ts":1435934945,"matrix_id":"-2"},{"id":"216222","WE":7.166762,"NS":50.550978,"dir":287,"speed":34.1,"ts":"2015-07-03 18:20:32","unix_ts":1435947632,"matrix_id":"-2"},{"id":"217358","WE":6.94649,"NS":50.335208,"dir":0,"speed":0.0,"ts":"2015-07-03 20:23:07","unix_ts":1435954987,"matrix_id":"-2"},{"id":"217759","WE":6.944748,"NS":50.334302,"dir":0,"speed":0.0,"ts":"2015-07-03 15:36:26","unix_ts":1435937786,"matrix_id":"-2"},{"id":"216587","WE":6.944885,"NS":50.334025,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:58","unix_ts":1435938958,"matrix_id":"-2"},{"id":"216641","WE":6.946285,"NS":50.335007,"dir":0,"speed":0.0,"ts":"2015-07-03 15:06:40","unix_ts":1435936000,"matrix_id":"-2"},{"id":"217901","WE":6.945532,"NS":50.334425,"dir":0,"speed":0.0,"ts":"2015-07-03 15:40:28","unix_ts":1435938028,"matrix_id":"-2"},{"id":"218711","WE":6.945947,"NS":50.334973,"dir":0,"speed":0.0,"ts":"2015-07-03 12:03:49","unix_ts":1435925029,"matrix_id":"-2"},{"id":"216694","WE":6.946633,"NS":50.335143,"dir":0,"speed":0.0,"ts":"2015-07-03 15:29:03","unix_ts":1435937343,"matrix_id":"-2"},{"id":"217642","WE":6.926583,"NS":50.348092,"dir":16,"speed":182.4,"ts":"2015-07-03 15:31:13","unix_ts":1435937473,"matrix_id":"201"},{"id":"216537","WE":6.945082,"NS":50.334043,"dir":0,"speed":0.0,"ts":"2015-07-03 15:58:24","unix_ts":1435939104,"matrix_id":"-2"},{"id":"216644","WE":6.94525,"NS":50.334282,"dir":117,"speed":0.0,"ts":"2015-07-03 15:57:33","unix_ts":1435939053,"matrix_id":"-2"},{"id":"216553","WE":6.945037,"NS":50.334122,"dir":0,"speed":0.0,"ts":"2015-07-03 15:58:41","unix_ts":1435939121,"matrix_id":"-2"},{"id":"218661","WE":6.945225,"NS":50.33424,"dir":0,"speed":0.0,"ts":"2015-07-03 16:02:11","unix_ts":1435939331,"matrix_id":"-2"},{"id":"216375","WE":6.944597,"NS":50.334165,"dir":176,"speed":0.0,"ts":"2015-07-03 15:27:04","unix_ts":1435937224,"matrix_id":"-2"},{"id":"216565","WE":6.945338,"NS":50.334692,"dir":0,"speed":0.0,"ts":"2015-06-20 16:05:20","unix_ts":1434816320,"matrix_id":"-2"},{"id":"216093","WE":6.944758,"NS":50.333848,"dir":0,"speed":0.0,"ts":"2015-07-03 15:28:55","unix_ts":1435937335,"matrix_id":"-2"},{"id":"218614","WE":6.946783,"NS":50.335317,"dir":0,"speed":0.0,"ts":"2015-07-03 16:00:16","unix_ts":1435939216,"matrix_id":"-2"},{"id":"216362","WE":6.945532,"NS":50.334455,"dir":0,"speed":0.0,"ts":"2015-07-03 15:31:09","unix_ts":1435937469,"matrix_id":"-2"},{"id":"216434","WE":6.946478,"NS":50.335022,"dir":0,"speed":0.0,"ts":"2015-07-03 15:54:26","unix_ts":1435938866,"matrix_id":"-2"},{"id":"216404","WE":6.945478,"NS":50.334612,"dir":0,"speed":0.0,"ts":"2015-07-03 14:57:02","unix_ts":1435935422,"matrix_id":"-2"},{"id":"216585","WE":6.946883,"NS":50.334958,"dir":0,"speed":0.0,"ts":"2015-07-03 16:11:49","unix_ts":1435939909,"matrix_id":"-2"},{"id":"216595","WE":6.944747,"NS":50.333982,"dir":0,"speed":0.0,"ts":"2015-06-20 15:41:41","unix_ts":1434814901,"matrix_id":"-2"},{"id":"217917","WE":6.94557,"NS":50.334908,"dir":0,"speed":0.0,"ts":"2015-07-03 13:53:18","unix_ts":1435931598,"matrix_id":"-2"},{"id":"217233","WE":6.945332,"NS":50.334317,"dir":0,"speed":0.0,"ts":"2015-07-03 16:00:39","unix_ts":1435939239,"matrix_id":"-2"},{"id":"217745","WE":6.944577,"NS":50.333785,"dir":0,"speed":0.0,"ts":"2015-07-03 16:00:34","unix_ts":1435939234,"matrix_id":"-2"},{"id":"216581","WE":6.94734,"NS":50.336328,"dir":50,"speed":13.9,"ts":"2015-07-03 11:40:09","unix_ts":1435923609,"matrix_id":"103"},{"id":"218604","WE":6.945477,"NS":50.335025,"dir":180,"speed":0.0,"ts":"2015-07-03 16:40:58","unix_ts":1435941658,"matrix_id":"-2"},{"id":"216561","WE":6.982413,"NS":50.347925,"dir":0,"speed":0.0,"ts":"2015-03-28 15:07:05","unix_ts":1427555225,"matrix_id":"-2"},{"id":"216551","WE":6.94727,"NS":50.335552,"dir":0,"speed":0.0,"ts":"2015-07-03 15:56:23","unix_ts":1435938983,"matrix_id":"-2"},{"id":"218654","WE":6.945335,"NS":50.334277,"dir":0,"speed":0.0,"ts":"2015-07-03 15:44:55","unix_ts":1435938295,"matrix_id":"-2"},{"id":"218664","WE":6.945542,"NS":50.334393,"dir":0,"speed":0.0,"ts":"2015-07-03 16:01:38","unix_ts":1435939298,"matrix_id":"-2"},{"id":"216652","WE":6.945683,"NS":50.334955,"dir":0,"speed":0.0,"ts":"2015-07-03 15:07:32","unix_ts":1435936052,"matrix_id":"-2"},{"id":"216611","WE":6.945918,"NS":50.335123,"dir":45,"speed":0.0,"ts":"2015-07-03 20:24:42","unix_ts":1435955082,"matrix_id":"96"},{"id":"217696","WE":6.944655,"NS":50.334125,"dir":0,"speed":0.0,"ts":"2015-07-03 11:23:18","unix_ts":1435922598,"matrix_id":"-2"},{"id":"216473","WE":6.946378,"NS":50.33537,"dir":0,"speed":0.0,"ts":"2015-07-03 10:40:46","unix_ts":1435920046,"matrix_id":"-2"},{"id":"217241","WE":6.946922,"NS":50.336042,"dir":39,"speed":22.0,"ts":"2015-07-03 16:17:22","unix_ts":1435940242,"matrix_id":"102"},{"id":"217872","WE":6.944387,"NS":50.334087,"dir":53,"speed":0.0,"ts":"2015-07-04 00:14:01","unix_ts":1435968841,"matrix_id":"-2"},{"id":"216703","WE":6.946317,"NS":50.33489,"dir":120,"speed":0.0,"ts":"2015-07-03 15:57:19","unix_ts":1435939039,"matrix_id":"-2"},{"id":"217578","WE":6.945475,"NS":50.33456,"dir":0,"speed":0.0,"ts":"2015-07-03 16:36:26","unix_ts":1435941386,"matrix_id":"-2"},{"id":"216527","WE":6.945817,"NS":50.335408,"dir":0,"speed":0.0,"ts":"2015-07-03 23:08:25","unix_ts":1435964905,"matrix_id":"-2"},{"id":"217678","WE":6.944463,"NS":50.334135,"dir":0,"speed":0.0,"ts":"2015-07-03 15:55:11","unix_ts":1435938911,"matrix_id":"-2"},{"id":"216718","WE":6.944585,"NS":50.334305,"dir":0,"speed":0.0,"ts":"2015-07-03 11:42:26","unix_ts":1435923746,"matrix_id":"-2"},{"id":"216709","WE":6.945615,"NS":50.334443,"dir":184,"speed":0.0,"ts":"2015-07-03 15:36:49","unix_ts":1435937809,"matrix_id":"-2"},{"id":"217638","WE":8.573385,"NS":49.330247,"dir":221,"speed":0.0,"ts":"2015-06-24 13:19:50","unix_ts":1435151990,"matrix_id":"-2"},{"id":"216880","WE":6.945985,"NS":50.334445,"dir":0,"speed":0.0,"ts":"2015-07-03 16:16:50","unix_ts":1435940210,"matrix_id":"-2"},{"id":"217674","WE":6.944418,"NS":50.333728,"dir":0,"speed":0.0,"ts":"2015-07-03 17:25:28","unix_ts":1435944328,"matrix_id":"-2"},{"id":"218788","WE":0.0,"NS":0.0,"dir":0,"speed":0.0,"ts":"1900-01-01 00:00:00","unix_ts":0,"matrix_id":"-2"},{"id":"217654","WE":6.945732,"NS":50.334642,"dir":0,"speed":0.0,"ts":"2015-07-03 15:58:18","unix_ts":1435939098,"matrix_id":"-2"},{"id":"217680","WE":12.104222,"NS":48.109843,"dir":243,"speed":0.0,"ts":"2015-06-21 01:54:39","unix_ts":1434851679,"matrix_id":"-2"},{"id":"216894","WE":6.946117,"NS":50.333895,"dir":0,"speed":0.0,"ts":"2015-07-03 15:17:05","unix_ts":1435936625,"matrix_id":"-2"},{"id":"217660","WE":6.944115,"NS":50.33482,"dir":45,"speed":0.0,"ts":"2015-07-03 22:41:08","unix_ts":1435963268,"matrix_id":"93"},{"id":"216420","WE":6.943915,"NS":50.334608,"dir":0,"speed":0.0,"ts":"2015-07-03 17:50:44","unix_ts":1435945844,"matrix_id":"-2"},{"id":"216548","WE":6.94504,"NS":50.334123,"dir":0,"speed":0.0,"ts":"2015-07-03 15:47:59","unix_ts":1435938479,"matrix_id":"-2"},{"id":"216528","WE":6.945092,"NS":50.334112,"dir":0,"speed":0.0,"ts":"2015-07-03 11:05:27","unix_ts":1435921527,"matrix_id":"-2"},{"id":"216538","WE":6.945008,"NS":50.334118,"dir":277,"speed":0.0,"ts":"2015-07-03 15:28:11","unix_ts":1435937291,"matrix_id":"-2"},{"id":"216646","WE":6.979042,"NS":50.351058,"dir":238,"speed":200.4,"ts":"2015-07-03 15:52:24","unix_ts":1435938744,"matrix_id":"723"}];



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
        var image = document.createElement('image');
        image.setAttribute('xlink:href', 'icon.jpg');
        image.setAttribute('width', '10');
        image.setAttribute('height', '10');
        image.setAttribute('x', x);
        image.setAttribute('y', y);
        svg.contentDocument.getElementById('carsOnMap').appendChild(image);
        svg.contentDocument.getElementById('carsOnMap').appendChild(testNode);
      });


    };

    var cars = [];

    carsJSON.forEach(function(element, index, array) {
      cars.push(new Car(element));
      cars[cars.length - 1].setMarker();
    });

    setInterval(function() {
      cars.forEach(function(e, i) {
        e.setMarker();
      });
    }, 2000);


    /*var car = new Car({"id":"216581","WE":6.94734,"NS":50.336328,"dir":50,"speed":13.9,"ts":"2015-07-03 11:40:09","unix_ts":1435923609,"matrix_id":"103"});*/
  });