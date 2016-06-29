$(window).scroll(function(a, b) {
    //console.log(a,$(window).scrollTop());
    //var x = $('.jumbotron').height();
    var x = 56;
    if ($(window).scrollTop() > x) {
        console.log('if');
        $('.logo').addClass('color');
        $('.navbar-custom').css('background-color', 'rgba(255,255,255,1)');
        $('.navbar-custom .navbar-nav > li > a').css('color', '#000000');
        $('.theme-btn').css({ 'color': '#000000', 'border': '1px solid #000000', 'border-radius': '4px' });
        $('.nav-tabs').addClass('navbar-fixed-top');


    } else {
        console.log('else');
        $('.logo').removeClass('color');
        $('.navbar-custom').css('background-color', 'transparent');
        $('.navbar-custom .navbar-nav > li > a').css('color', '#ffffff');
        $('.nav-tabs').removeClass('navbar-fixed-top');
        $('.theme-btn').css('color', '#ffffff');

    }
});


$(document).ready(function() {

    var scene = document.getElementById('scene');
    if (scene) {
        var parallax = new Parallax(scene);
    }

    $('.team-img').hover(function() {

        $(this).children().fadeToggle(500, "linear");

    });

    /* Add all JS logic in one single file to minimise loading time and script dependency on every page */
    //var scene = document.getElementById('scene');
    //var parallax = new Parallax(scene);

    var z = $('.jumbotron').outerHeight();
    $('.nav-tabs').affix({
        offset: {
            top: z,
        }
    });

    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    sideslider.click(function(event) {
        $(sel).toggleClass('in');

    });
    var offset = 130;

    $('.nav-tabs li a').click(function(event) {
        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -offset);
    });

});
