

var encycloApp = angular.module('encycloApp', []).config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|blob):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

encycloApp.controller('encycloController', function ($scope, $http) {
    $scope.summary = [];
    $http.get("resource/summary.txt").success(function (data) {
        $scope.summary = data.split("\n");
    });

    $scope.image = "image/0001.png";
    $scope.word = $scope.summary[0];
    //alert("word= " + $scope.word);
    $scope.page = 1;

    var goToPage = function (page) {
        $scope.page = page;
        var paddedPage = ("0000" + page).substr(-4,4);
        $scope.image = "image/" + paddedPage + ".png";
    }

    $scope.changeWord = function () {
        var i = 1;
        for (i = 1; i < $scope.summary.length; i++) {
            if($scope.summary[i].toLowerCase().trim() > $scope.word.toLowerCase().trim()) {
                break;
            }
        }
        if(i >= $scope.summary.length) i = $scope.summary.length;
        goToPage(i);
    }

    $scope.changePage = function () {
        goToPage($scope.page);
        $scope.word = $scope.summary[$scope.page-1];
    }


});
         