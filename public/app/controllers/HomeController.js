lifeApp.controller('HomeController', ['$scope', '$http', '$route', '$location',
    function($scope, $http, $route, $location) {

        $scope.appName = 'Your Life in Stats';

        $scope.visualize = function(vm) {

            vm.bod = vm.bod_year + "-" + vm.bod_month + "-" + vm.bod_day;

            $http.post('api/users', vm)
                .success(function(data) {
                    console.log(data);
                    $location.path('/life/' + data._id);

                })
                .error(function(data) {
                    console.log("Errors", data);
                });



        };


}]);
