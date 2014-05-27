// Ionic Starter App
angular.module('starter', ['ionic', 'iopro', 'starter.services', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

  $stateProvider
    .state('channel', {
      url: "/channel",
      abstract: true,
      templateUrl: "template/channel.html",
      controller: 'ChannelCtrl'
    })
    .state('channel.live', {
      url: '/live/:vid',
      views: {
        'main-view': {
          templateUrl: 'template/live.html',
          controller: 'LiveCtrl'
        }
      }
    })
    .state('channel.home', {
      url: '/home',
      views: {
        'main-view': {
          templateUrl: 'template/home.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/channel/home');

   $sceDelegateProvider.resourceUrlWhitelist([
     'self',
     'http://www.ustream.tv/embed/*',
     'http://www.youtube.com/embed/*']);
})

.filter('toDateTime', function(){
  return function(str){
    var time = new Date(str);
    time.setHours(time.getHours()+8);
    return time.toISOString().replace('T',' ').replace(/\.\w+/,'');
  };
})

.filter('maxContent', function(){
  return function(str){
    var results = "";
    var length = 0;

    for (var n = 0; n < str.length; n++) {
        var charCode = str.charCodeAt(n);
        if (charCode < 128) {
            length += 1;
        } else if (charCode < 2048) {
            length += 2;
        } else if (charCode < 65536) {
            length += 3;
        } else if (charCode < 2097152) {
            length += 4;
        } else if (charCode < 67108864) {
            length += 5;
        } else {
            length += 6;
        }
        results += str[n];
        if (length > 180) {
          results += "...";
          break;
        }
    }

    return results;
  };
})

.filter('nl2br', function(){
  return function (str) {
    return str.replace(/\n/gi,"<br/>");
  }
})

.run(function($rootScope){
});