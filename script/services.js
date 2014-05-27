angular.module('starter.services', [])

.factory('Live', function ($http) {
  var cache = null;
  var storage = window.localStorage;
  return {
    fetch: function (cb) {
      if ( cache !== null ) {
        cb && cb(null, cache);
      }else{
        this.reload(cb);
      }
    },
    reload: function (cb) {
      $http({
        'method': 'GET',
        'url': 'https://livelink.firebaseio.com/live/.json',
        'cache': false
      })
      .success( function (res) {
          var location = JSON.parse(storage['location'] || "{}");
          var new_location = {};
          if (typeof res === 'object') {
            for (key in res) {
              if (location[res[key]['vuid']]) {
                res[key]['location'] = location[res[key]['vuid']];
                new_location[res[key]['vuid']] = location[res[key]['vuid']];
              }
            }
            cache = res;
            storage['location'] = JSON.stringify(new_location);
          }
          cb && cb(null, cache);
      })
      .error( function (data, status) {
        cb && cb(status || true, cache);
      });
    },
    setLocation: function (vuid, location) {
      var data = JSON.parse(storage['location'] || "{}");
      if (data[vuid] != location) {
        postParse('live_location', {
          'vuid': vuid,
          'location': location
        }, function (err, obj) {
          if (err) {
            console.log('save token error: ', error);
          }else{
            console.log('save '+vuid+':', location, 'obj id:', obj.id);
          }
        });
      }
      data[vuid] = location;
      storage['location'] = JSON.stringify(data);
    }
  }
});