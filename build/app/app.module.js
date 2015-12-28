angular
  .module('app', [])
  .controller('SessionsCtrl', function($scope) {
    $scope.sessions = [];
    $scope.session = {
      _id: '1234',
      name: 'Session',
      link: 'http://session.ly/1234'
    };

    $scope.createSession = function() {
      $scope.sessions.push($scope.session);
    };

    $scope.shareSessionLink = function() {
      $scope.link = $scope.session.link;
    };
  });
