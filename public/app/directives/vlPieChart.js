lifeApp.directive('vlPieChart', function () {
    return {
        restrict: "EA",
        terminal: true,
        transclude: false,
        scope: {
            data: "=day"
        },
        link: function (scope, element, attrs) {
        	 function draw(element, data) {
                var canvas = {
                        context : element.get(0).getContext('2d'),
                        canvasWidth : attrs.width,
                        canvasHeight : attrs.height,
                        data: data
                    };
                drawPieChart(canvas);
             }

             function drawPieChart(element) {
                var centerX = element.canvasWidth / 2,
                    centerY = element.canvasWidth / 2,
                    radius = element.canvasWidth / 2;
                //background circle
                element.context.fillStyle = '#333333';
                element.context.beginPath();
                element.context.arc(centerX,
                    centerY,
                    radius, 0, Math.PI * 2, true);
                element.context.closePath();
                element.context.fill();
                // Inner circle
                element.context.fillStyle = '#fff';
                element.context.beginPath();
                element.context.arc(centerX,
                    centerY,
                    radius - 11, 0, Math.PI * 2, true);
                element.context.closePath();
                element.context.fill();
                //slice
                var startingAngle = (-90 * Math.PI) / 180,
                    lifeLived = element.data / 100; //decimal
                    lifeLived = (lifeLived * 360) - 90 //degrees - starting angle
                var endingAngle = (lifeLived * Math.PI) / 180;
                element.context.fillStyle = '#333333';
                element.context.beginPath();
                element.context.moveTo(centerX, centerY);
                element.context.arc(centerX, centerY, radius - 10, startingAngle, endingAngle, false);
                element.context.closePath();
                element.context.fill();
                element.context.save();
                // text lables
                var x = Math.floor(element.canvasWidth / 2),
                    y = Math.floor(element.canvasHeight / 2);
                if (element.data >= 100) {
                    var angle = 0,
                        dx = 0,
                        dy = 5;
                    element.context.textAlign = "center";
                } else if (element.data > 50) {
                    var angle = 0,
                        dx = 95,
                        dy = 8;
                    element.context.textAlign = "right";
                } else {
                    var angle = endingAngle,
                        dx = 100,
                        dy = -5;
                    element.context.textAlign = "right";
                }
                element.context.translate(x, y);
                element.context.fillStyle = '#fff'
                element.context.rotate(angle);
                var fontSize = Math.floor(element.canvasHeight / 15);
                element.context.font = fontSize + "pt Helvetica";
                element.context.fillText(element.data + '%', dx, dy);
                element.context.restore();

             }

             scope.$watch("data", function(newValue, oldValue) {
                if (!_.isUndefined(newValue)) {
                    draw(element, newValue);    
                }
             });
         }
    };
    // return pieChart;
});