angular
  .module('app', [])
  .controller('SessionsCtrl', function($scope, $http) {
    $http({
      method: 'get',
      url: '/sessions'
    })
      .then(function(res) {
        $scope.sessions = res.data;
        $scope.session = $scope.sessions[0];
      });

    $scope.createSession = function() {
      $http({
        method: 'post',
        url: '/sessions'
      })
        .then(function(res) {
          $scope.sessions.push(res.data);
        });
    };

    $scope.shareSessionLink = function() {
      $scope.link = $scope.session.link;
    };
  });
