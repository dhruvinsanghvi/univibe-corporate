  //var scene = document.getElementById('scene');
  //var parallax = new Parallax(scene);
  
     $(window).scroll(function(a,b) {
//console.log(a,$(window).scrollTop());
var x = $(".jumbotron").height();
  if($(window).scrollTop() > x ){
    console.log("if");
    $(".navbar-default").css("background-color", "rgba(255,255,255,1)");
    $(".navbar-default .navbar-nav > li > a").css("color", "#000000");
    $(".nav-tabs").css({"top": 50, "position":"fixed", "z-index":1000, "background-color":"#fff","left":"50%",
      "transform":"translate(-50%, -50%)","top":"80px"});
 
  } else {
    console.log("else");
    $(".navbar-default").css("background-color", "transparent");
    $(".navbar-default .navbar-nav > li > a").css("color", "#ffffff");
    $(".nav-tabs").css({"top": 0, "position":"static", "z-index":0, "background-color":"#fff","left":"0","top":"0px","transform":"translate(0%, -0%)"});

 

  
  }
 });
  $(document).ready(function(){

    $('.team-img').hover(function(){
     
         $(this).children().stop().animate({height: 'toggle'});
       
    });
 
});