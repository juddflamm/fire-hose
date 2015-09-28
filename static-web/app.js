'use strict';

var app = angular.module('fire-hose', ['firebase']);

app.controller('Main', function($scope, $firebaseObject) {

  var firebaseRef = new Firebase("https://firehose.firebaseio.com/");
  var firebaseObj = $firebaseObject(firebaseRef);
  firebaseObj.$bindTo($scope, "liveData");

});
