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
          $('.nav-tabs').css({
              //'top': 50, [Abbas]: Why duplicate??
              //'position': 'fixed', Never mess around with this
              'z-index': 1000,
              'background-color': '#fff',
              'left': '50%',
              'transform': 'translate(-50%, -50%)',
              'top': '80px'
          });

      } else {
          console.log('else');
          $('.logo').removeClass('color');
          $('.navbar-custom').css('background-color', 'transparent');
          $('.navbar-custom .navbar-nav > li > a').css('color', '#ffffff');
          $('.nav-tabs').css({
              //'top': 0, Removing duplicate top value
              'position': 'static',
              'z-index': 0,
              'background-color': '#fff',
              'left': '0',
              'top': '0px',
              'transform': 'translate(0%, -0%)'
          });
      }
  });
  $(document).ready(function() {


      $('.team-img').hover(function() {

          $(this).children().stop().animate({ height: 'toggle' });

      });

      /* Add all JS logic in one single file to minimise loading time and script dependency on every page */
      
      var scene = $('.scene');
      var parallax = new Parallax(scene);

  });

