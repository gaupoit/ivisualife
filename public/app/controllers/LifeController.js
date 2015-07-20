(function() {
    lifeApp.controller('LifeController', ['$scope', '$http', '$route', '$routeParams', '$interval', 'limitToFilter',
        function($scope, $http, $route, $routeParams, $interval, limitToFilter) {

            $scope.$route = $route;
            $scope.setupCurtains = _setupCurtains;
            $scope.$routeParams = $routeParams;

            $scope.populationSummary = [
                [Date.UTC(1950,1,1),2556],
                [Date.UTC(1955,1,1),2780],
                [Date.UTC(1960,1,1),3039],
                [Date.UTC(1965,1,1),3345],
                [Date.UTC(1970,1,1),3707],
                [Date.UTC(1975,1,1),4086],
                [Date.UTC(1980,1,1),4454],
                [Date.UTC(1985,1,1),4850],
                [Date.UTC(1990,1,1),5278],
                [Date.UTC(1995,1,1),5687],
                [Date.UTC(2000,1,1),6081],
                [Date.UTC(2005,1,1),6462],
                [Date.UTC(2010,1,1),6840],
                [Date.UTC(2015,1,1),7215]
            ];

            $scope.dob = "";

            if ($scope.$routeParams.userId) {
                var userId = $scope.$routeParams.userId;
                $http.get('api/users/' + userId).success(function(data) {
                    $scope.worldRankingPopulation = "...";
                    $scope.worldTotalPopulation = "...";

                    $scope.user = data;
                    $scope.dob = data.bod;
                    $scope.user.bod_string = moment($scope.user.bod).format("dddd, MMMM Do YYYY");
                    $scope.user.calendar = massageDataForCalendar($scope.dob);
                    var dobYYYYMMDD = moment($scope.user.bod).format('YYYY-MM-DD');
                    var year = moment($scope.user.bod).get('year');

                    var sex = 'unisex';
                    var country = "World";

                    var populationRankUrl = '/api/wp-rank/' + dobYYYYMMDD + '/' + sex + '/' + country + '/today';
                    $http.get(populationRankUrl).success(function(data) {
                        var rankPopulation = Number(data);

                        var totalPopulationUrl = '/api/wp-rank/1920-01-01/unisex/World/today';
                        $http.get(totalPopulationUrl).success(function(totalPopulation) {
                          var ranking = Number(totalPopulation) - rankPopulation;
                          $scope.worldRankingPopulation = Number(ranking).toLocaleString();
                          $scope.worldTotalPopulation = Number(totalPopulation).toLocaleString();
                        });
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
                        }, 1000);
                        $scope.deathCountDown = calculatedTime(now, death);
                        $scope.user.livesDayPercentage = math.round(($scope.user.age * 100) / life_expectancy, 2);
                        // setupLivesDayChart($scope);

                    });
                }).error(function(data) {
                    console.log(data);
                });

                _initPopulationChart();
            }

            function _initPopulationChart() {
              var yearLabels = [];
              for (var i = 1950; i <= 2015; i += 5) {
                yearLabels.push(String(i));
              }
              $scope.labels = yearLabels;
              $scope.series = ['Population by each 5 years (million)'];
              $scope.data = [
                [2556, 2780, 3039, 3345, 3707, 4086, 4454, 4850, 5278, 5687, 6081, 6462, 6840, 7215]
              ];
              $scope.onClick = function (points, evt) {
                console.log(points, evt);
              };
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

            function massageDataForCalendar(userBod) {
                var calendar = {
                    dayOfWeek : moment(userBod).format("dddd"),
                    date : moment(userBod).get('date'),
                    monthYear : moment(userBod).format("MMMM, YYYY") 
                }
                return calendar;
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

    lifeApp.directive('hcPopulationRankingChart', function () {
      return {
        restrict: 'C',
        replace: true,
        scope: {
          items: '=',
          user  : '='
        },
        controller: function ($scope, $element, $attrs) {
          console.log(2);

        },
        template: '<div id="hcPopulationRankingChart" style="margin: 0 auto">Chart not working</div>',
        link: function (scope, element, attrs) {
          var chart = new Highcharts.Chart({
            chart: {
              renderTo: 'hcPopulationRankingChart'
            },

            rangeSelector: {
                selected: 1
            },

            title: {
                text: 'Population chart'
            },

            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e of %b '
                }
            },

            yAxis: {
                title: {
                    text: 'Population (million)'
                }
            },

            series: [{
                type: "area",
                name: 'Population growth',
                data: scope.items,
                id: 'dataseries',
                tooltip: {
                    valueDecimals: 4
                }
              },
              {
                id: "flagSeries",
                type: "flags",
                name: "Where you were",
                data: [],
                onSeries: 'dataseries',
                shape: 'squarepin',
                color: '#000000', //Highcharts.getOptions().colors[0], // same as onSeries
                fillColor: '#000000', //Highcharts.getOptions().colors[0],
                // onSeries: 'dataseries',
                // width: 16,
                style: { // text style
                    color: 'white'
                },
                states: {
                    hover: {
                        fillColor: '#0000ff' // darker
                    }
                }
              }

            ]
          });
          scope.$watch("items", function (newValue) {
            chart.series[0].setData(newValue, true);
          }, true);

          scope.$watch("user", function (user) {
            if (!user) {
              return;
            }
            var flagSeries = chart.get("flagSeries");
            if (flagSeries.points.length == 1) { // already add Birthday flags
              return;
            }
            var bod = user.bod;
            flagSeries.addPoint({
                title: "Birthday",
                x: Date.UTC(moment(bod).get('year'), moment(bod).get('month'), moment(bod).get('date')),
                text: 'Happy birtday to u ^_^'
            }, true, false);
          }, true);
        }
      }
    });

})();
