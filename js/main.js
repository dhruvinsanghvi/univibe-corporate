  //var scene = document.getElementById('scene');
  //var parallax = new Parallax(scene);


  $(window).scroll(function(a, b) {
      //console.log(a,$(window).scrollTop());
      var x = $('.jumbotron').height();
      if ($(window).scrollTop() > x) {
          console.log('if');
          $('.logo').addClass('color');
          $('.navbar-custom').css('background-color', 'rgba(255,255,255,1)');
          $('.navbar-custom .navbar-nav > li > a').css('color', '#000000');
         

      } else {
          console.log('else');
          $('.logo').removeClass('color');
          $('.navbar-custom').css('background-color', 'transparent');
          $('.navbar-custom .navbar-nav > li > a').css('color', '#ffffff');
         
      }
  });
  $(document).ready(function() {


      $('.team-img').hover(function() {

          $(this).children().stop().animate({ height: 'toggle' });

      });

      /* Add all JS logic in one single file to minimise loading time and script dependency on every page */
      var scene = document.getElementById('scene');
      var parallax = new Parallax(scene);

     var z = $('.jumbotron').outerHeight();
     $('.nav-tabs').affix({
     offset: {
     top: z,
    
      }
    })
   
            var sideslider = $('[data-toggle=collapse-side]');
            var sel = sideslider.attr('data-target');
           
            sideslider.click(function(event){
                $(sel).toggleClass('in');
          
            });
     
    

  });

