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
        $('.hamburger.is-closed .hamb-top').css('background-color','rgba(0,0,0,1)');
        $('.hamburger.is-closed .hamb-middle').css('background-color','rgba(0,0,0,1)');
        $('.hamburger.is-closed .hamb-bottom').css('background-color','rgba(0,0,0,1)');


    } else {
        console.log('else');
        $('.logo').removeClass('color');
        $('.navbar-custom').css('background-color', 'transparent');
        $('.navbar-custom .navbar-nav > li > a').css('color', '#ffffff');
        $('.nav-tabs').removeClass('navbar-fixed-top');
        $('.theme-btn').css({ 'color': '#ffffff', 'border': '1px solid #ffffff', 'border-radius': '4px' });
        $('.hamburger.is-closed .hamb-top').css('background-color','rgba(255,255,255,0.7)');
        $('.hamburger.is-closed .hamb-middle').css('background-color','rgba(255,255,255,0.7)');
        $('.hamburger.is-closed .hamb-bottom').css('background-color','rgba(255,255,255,0.7)');

    }
});


$(document).ready(function() {
     var trigger = $('.hamburger'),
     overlay = $('.overlay'),
     isClosed = false;

      function hamburger_cross() {

      if (isClosed === true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

    trigger.click(function () {
      hamburger_cross();      
    });

   
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  }); 

    var scene = document.getElementById('scene');
    if (scene) {
        var parallax = new Parallax(scene);
    }

    $('.team-img').hover(function() {
       

        $(this).children().stop().fadeToggle(500, "linear");

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
        $(sel).toggleClass('overlay');

    });
    var offset = 130;

    $('.nav-tabs li a').click(function(event) {
        event.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView();
        scrollBy(0, -offset);
    });

    $('[data-toggle="tooltip"]').tooltip();

});
function validateForm(){
      var x = document.forms["contactusForm"]["number"].value;
      console.log(x);
       var numb = /^[0-9]+$/;
         if(x.match(numb) && x.length == 11){
           return true;
         }
         else{
            alert("please Enter Valid Phone Nummber");
            return false;
         }
}
