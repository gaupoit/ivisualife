/* Author:
    rexy hoang
*/

/*
 * skrollr.init({
 *     forceHeight: false
 * });
 */

$(function(){


    $('.curtains').curtain({
        scrollSpeed: 400,
        controls: '.menu',
        curtainLinks: '.curtain-links',
        nextSlide: function(){
            console.log("ok");
        }
    });

});

/*Sticky menu script*/

// grab the initial top offset of the navigation 
// var stickyNavTop = $('nav.primary').offset().top;
// only show if users scroll pass the first/cover slide
var stickyNavTop = $(window).height() - 50;
var nav = $("nav.primary");
// console.log(stickyNavTop);

// our function that decides weather the navigation bar should have "fixed" css position or not.
var stickyNav = function(){
    var scrollTop = $(window).scrollTop(); // our current vertical position from the top

    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
    // otherwise change it back to relative
    if (scrollTop > stickyNavTop) { 
        nav
            .addClass('sticky')
            .insertBefore( $( ".curtains" ) );
    } else {
        nav
            .removeClass('sticky')
            .insertAfter( $( "header" ) );    
    }
};

    stickyNav();

    // and run it again every time you scroll
    $(window).scroll(function() {
        stickyNav();
    });



