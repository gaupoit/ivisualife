(function() {
    lifeApp.controller('LifeController', ['$scope', '$http', '$route', '$routeParams', '$interval',
        function($scope, $http, $route, $routeParams, $interval) {

            $scope.$route = $route;
            $scope.setupCurtains = _setupCurtains;
            $scope.$routeParams = $routeParams;
            if ($scope.$routeParams.userId) {
                var userId = $scope.$routeParams.userId;
                $http.get('api/users/' + userId).success(function(data) {
                    $scope.user = data;
                    $scope.user.bod_string = moment($scope.user.bod).format("dddd, MMMM Do YYYY");
                    var dobYYYYMMDD = moment($scope.user.bod).format('YYYY-MM-DD');
                    var year = moment($scope.user.bod).get('year');

                    var sex = 'unisex';
                    var country = "World";

                    var populationRankUrl = '/api/wp-rank/' + dobYYYYMMDD + '/' + sex + '/' + country + '/today';
                    $http.get(populationRankUrl).success(function(data) {
                        $scope.worldPopulation = Number(data).toLocaleString();
                    });

                    $http.get('/api/life_expectancy/' + $scope.user.country + "/" + year + "/" + $scope.user.sex).success(function(data) {
                        var life_expectancy = math.round(data, 0);
                        var now = moment();
                        var bod = moment($scope.user.bod);
                        $scope.user.livesDay = now.diff(bod, "days");
                        $scope.user.age = now.get('Year') - year;
                        var death = moment($scope.user.bod).add(life_expectancy, 'y');
                        timeUpdate = $interval(function() {
                            var now = moment();
                            var death = moment($scope.user.bod).add(life_expectancy, 'y');
                            $scope.deathCountDown = calculatedTime(now, death);
                        }, 1000)
                        $scope.deathCountDown = calculatedTime(now, death);
                        $scope.user.livesDayPercentage = math.round(($scope.user.age * 100) / life_expectancy, 2);
                        // setupLivesDayChart($scope);

                    });
                }).error(function(data) {
                    console.log(data);
                });
            }

            function _setupCurtains() {
                $('.curtains').curtain({
                scrollSpeed: 400,
                controls: '.menu',
                curtainLinks: '.curtain-links',
                nextSlide: function() {
                    console.log("ok");
                }
                });
            }

            function calculatedTime(date1, date2) {
                var difference = date2.get('time') - date1.get('time');
                var years = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);
                difference -= years * 1000 * 60 * 60 * 24 * 365;
                var days = Math.floor(difference / 1000 / 60 / 60 / 24);
                difference -= days * 1000 * 60 * 60 * 24;
                var hours = Math.floor(difference / 1000 / 60 / 60);
                difference -= hours * 1000 * 60 * 60;
                var minutes = Math.floor(difference / 1000 / 60);
                difference -= minutes * 60 * 1000;
                var seconds = Math.floor(difference / 1000);
                var result = years + ' Years, ';
                result += days + ' Days, ';
                result += hours + ' Hours, ';
                result += minutes + ' Minutes, ';
                result += seconds + ' Seconds';
                return result;
            }
        }
    ]);
})();
