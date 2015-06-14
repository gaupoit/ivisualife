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
                    var year = moment($scope.user.bod).get('year');
                    $http.get('/api/population/' + year).success(function(data) {
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
                scrollSpeed: 200,
                controls: '.menu',
                curtainLinks: '.curtain-links',
                nextSlide: function() {
                    console.log("ok");
                }
                });
            }

            function setupLivesDayChart() {
                $scope.chart = {

                };
                $scope.chart.labels = ["Download Sales", "In-Store Sales"];
                $scope.chart.data = [$scope.user.livesDayPercentage, 100 - $scope.user.livesDayPercentage];
            }

            function setupCanvas(percentageLived) {
                canvas = $('#life-pie');
                context = canvas.get(0).getContext('2d');
                canvasWidth = canvas.width();
                canvasHeight = canvas.height();
                drawCanvas(percentageLived);
            }

            function drawCanvas(percentageLived) {
                centerX = canvasWidth / 2;
                centerY = canvasWidth / 2;
                radius = canvasWidth / 2;
                // background circle
                context.fillStyle = '#333333'
                context.beginPath();
                context.arc(centerX, //x
                    centerY, //y
                    radius, //radius
                    0, Math.PI * 2, true);
                context.closePath();
                context.fill();
                // Inner circle
                context.fillStyle = '#fff'
                context.beginPath();
                context.arc(centerX, //x
                    centerY, //y
                    radius - 11, //radius
                    0, Math.PI * 2, true);
                context.closePath();
                context.fill();
                // slice
                var startingAngle = (-90 * Math.PI) / 180;
                var lifeLived = percentageLived; // percentage
                lifeLived = lifeLived / 100; //decimal
                lifeLived = (lifeLived * 360) - 90; // degrees - starting angle
                var endingAngle = (lifeLived * Math.PI) / 180;
                context.fillStyle = '#333333';
                context.beginPath();
                context.moveTo(centerX, centerY);
                context.arc(centerX, centerY, radius - 10, startingAngle, endingAngle, false);
                context.closePath();
                context.fill();
                // text labels
                context.save();
                var x = Math.floor(canvasWidth / 2);
                var y = Math.floor(canvasHeight / 2);
                if (percentageLived >= 100) {
                    var angle = 0;
                    var dx = 0;
                    var dy = 5;
                    context.textAlign = "center";
                } else if (percentageLived > 50) {
                    var angle = 0;
                    var dx = 95;
                    var dy = 8;
                    context.textAlign = "right";
                } else {
                    var angle = endingAngle;
                    var dx = 100;
                    var dy = -5;
                    context.textAlign = "right";
                }
                context.translate(x, y);
                context.fillStyle = '#fff'
                context.rotate(angle);
                var fontSize = Math.floor(canvasHeight / 15);
                context.font = fontSize + "pt Helvetica";
                context.fillText(percentageLived + '%', dx, dy);
                context.restore();
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