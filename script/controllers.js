angular.module('starter.controllers', [])

.controller('ChannelCtrl', function($scope, $state, $ionicLoading, $ionicPopup, Live) {
  var index = 0;
  $scope.keydown = function(e){
    switch(e.keyCode){
      case 38:
        index -= 1;
        if ( index < 0 ) {
          index = $scope.lives.length - 1;
        }
        $state.go('channel.live', {vid: $scope.lives[index].vid});
        break;
      case 40:
        index += 1;
        if ( index >= $scope.lives.length ) {
          index = 0;
        }
        $state.go('channel.live', {vid: $scope.lives[index].vid});
        break;
    }
  };

  $scope.lives = [];

  var fetch;
  (fetch = function (cmd) {
    // var logging = $ionicLoading.show({
    //   'content': '掃描中...'
    // });
    Live[cmd](function (err, data) {
      var lives = [];
      for (key in data) {
        lives.push(data[key]);
      }
      $scope.lives = lives;
      // logging.hide();
      if (err) {
        $ionicPopup.confirm({
          'title': '連線異常, 是否重試？',
          'cancelText': '取消',
          'okText': '重試'
        }).then(function(res) {
          if (res) {
            fetch(cmd);
          }
        });
      }
    });
  })('fetch');

})
.controller('LiveCtrl', function($scope, $sce, $ionicLoading, $ionicPopup, $stateParams, Live) {
  $scope.live = {};
  $scope.embed = '';

  var fetch;
  (fetch = function (cmd) {
    var logging = $ionicLoading.show({
      'content': '掃描中...'
    });
    Live[cmd](function (err, data) {
      $scope.live = data[$stateParams.vid];
      $scope.embed = $sce.trustAsResourceUrl($scope.live.embed);
      logging.hide();
      if (err) {
        $ionicPopup.confirm({
          'title': '連線異常, 是否重試？',
          'cancelText': '取消',
          'okText': '重試'
        }).then(function(res) {
          if (res) {
            fetch(cmd);
          }
        });
      }
    });
  })('fetch');
})
.run(function($rootScope, $ionicSideMenuDelegate) {
});