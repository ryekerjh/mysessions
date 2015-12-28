angular
  .module('app', [])
  .controller('SessionsCtrl', function($scope) {
    $scope.createSessionLink = function() {
      $scope.link = 'http://session.ly/1234';
    };
  });
