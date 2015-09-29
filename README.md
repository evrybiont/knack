# knack
JavaScript Image Gallery
[DEMO v=0.1](http://evrybiont.github.io/knack/)

All you need to do is add div tag with 'projector' id and init it after loading page by jquery knak function. See example below.


<div id="projector"></div>

  %script
    $(window).load(function(){
      var images = [
        ["image-url", "image-info"],
        ["assets/images/hot-rod-style.jpg", "2 hot-rod-style"],
        ["assets/images/hot-rod-style.jpg"]
      ];
    
      $('#projector').knack({data: images});
    });



Enjoy!
