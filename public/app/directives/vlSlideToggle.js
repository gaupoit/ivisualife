//fork from http://plnkr.co/edit/iSJKUk?p=info
lifeApp.directive('slideToggle', function() {  
  return {
    restrict: 'A',      
    scope:{},
    controller: function ($scope) {}, 
    link: function(scope, element, attr) {
      element.bind('click', function() {                  
        var $slideBox = angular.element(attr.slideToggle);
        var slideDuration = parseInt(attr.slideToggleDuration, 10) || 200;
        $slideBox.stop().slideToggle(slideDuration);
      });
    }
  };  
});