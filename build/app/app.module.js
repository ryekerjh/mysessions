angular
  .module('app', [])
  .controller('SessionsCtrl', function($scope, $http) {
    $scope.newSession = {};

    $http({
      method: 'get',
      url: '/sessions'
    })
      .then(function(res) {
        $scope.sessions = res.data;
        $scope.session = $scope.sessions[0];
      });

    $scope.activateNewSession = function() {
      $scope.newSession.active = true;
    };

    $scope.createSession = function(e) {
      if (e.keyCode === 13) {
        $http({
          method: 'post',
          url: '/sessions',
          data: $scope.newSession
        })
          .then(function(res) {
            $scope.sessions.push(res.data);
            $scope.newSession = {};
          });
      }
    };

    $scope.shareSessionLink = function() {
      $scope.link = $scope.session.link;
    };
  });
