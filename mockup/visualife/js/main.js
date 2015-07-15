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
        nextSlide: function(e){
            // e.preventDefault();
            // console.log("ok");
        }
    });


    // Life Pie chart
    // http://api.highcharts.com/highcharts#loading
    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = Highcharts.getOptions().colors[0],
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
        }
        return colors;
    }());

    // Build the chart
    $('#life-pie-chart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: '#11191E',
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: "Life Progress",
            data: [
                {name: "You have lived", y: 40.33},
                {name: "Time you have left", y: 60}
            ]
        }]
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



