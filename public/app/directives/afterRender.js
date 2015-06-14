//fork from http://gsferreira.com/archive/2015/03/angularjs-after-render-directive/
lifeApp.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',
        terminal: true,
        transclude: false,
        link: function (scope, element, attrs) {
        	 $timeout(scope.$eval(attrs.afterRender), 0); 
        }
    };
    return def;
}]);