(function($){

  var doc = window.document,
      DOM = function(){
        return{
            html:  doc.documentElement,
            body:  doc.body,
            head:  doc.getElementsByTagName('head')[0],
            title: doc.title
        };
      },
      _settings = null,
      _data = null,
      html = DOM().html,
      supportFullScreen = (html.requestFullscreen || html.msRequestFullscreen || html.mozRequestFullScreen || html.webkitRequestFullScreen),
      exitFullScreen = (doc.exitFullscreen || doc.msExitFullscreen || doc.mozCancelFullScreen || doc.webkitCancelFullScreen);

  var fullScreen = {
    active: false,

    make: function(){
      supportFullScreen.call(html);
    },

    exit: function(){
      exitFullScreen.call(doc);
    },

    handler: function(){
      $(".fullscreen").unbind();
      fullScreen.applyStyle();

      if (fullScreen.active){
        fullScreen.active = false;
        $('.fullscreen').bind('click', fullScreen.make);
      } else {
        fullScreen.active = true;
        $('.fullscreen').bind('click', fullScreen.exit);
      }
    },

    bind: function(){
      doc.addEventListener('fullscreenchange', fullScreen.handler, false);
      doc.addEventListener('MSFullscreenChange', fullScreen.handler, false);
      doc.addEventListener('mozfullscreenchange', fullScreen.handler, false);
      doc.addEventListener('webkitfullscreenchange', fullScreen.handler, false);
    },

    applyStyle: function(){
      $('html, body').toggleClass('full');
      $('#projector').toggleClass('super');
      $('.fullscreen').toggleClass('exit');
    }
  };

  var arrowsEvents = {
    index: 0,

    updateCounter: function(){
      $('.current').html(arrowsEvents.index + 1);
    },

    right: function(){
      var images = $('.stage-area').children();
      var activeImage = $('.on');
      arrowsEvents.index +=1;

      if (!images.eq(arrowsEvents.index).length){
        arrowsEvents.index = 0;
      }

      images.eq(arrowsEvents.index).toggleClass('off on');
      activeImage.toggleClass('on off');

      arrowsEvents.updateCounter();
    },

    left: function(){
      var images = $('.stage-area').children();
      var activeImage = $('.on');

      if (arrowsEvents.index) {
        arrowsEvents.index -=1
      }else{
        arrowsEvents.index = $('.stage-area').children().length -1
      }

      images.eq(arrowsEvents.index).toggleClass('off on');
      activeImage.toggleClass('on off');

      arrowsEvents.updateCounter();
    },

    toggle: function(){
      $('.left-arrow, .right-arrow').toggle('slow');
    },

    bind: function(){
      $('.right-arrow').bind('click', arrowsEvents.right);
      $('.left-arrow').bind('click', arrowsEvents.left);
      $('.arrows-area').mouseenter(arrowsEvents.toggle).mouseleave(arrowsEvents.toggle);
    }
  };

  var events = {
    bind: function(){
      fullScreen.bind();
      arrowsEvents.bind();
    }
  };


  var mainScope = {
    init: function(options){
      graphicScope.init.apply(this, options);
      events.bind();

      return this;
    }
  };

  var graphicScope = {
    init: function(options){
      graphicScope.prepareProjector();
      graphicScope.prepareStageArea();
      graphicScope.prepareArrows();
      graphicScope.prepareMenuArea();
    },

    prepareProjector: function(){
      cssScope.init();

      $('#'+ _settings.id).append('<div class="stage-area">');
      $('#'+ _settings.id).append('<div class="arrows-area">');
      $('#'+ _settings.id).append('<div class="menu-area">');
    },

    prepareStageArea: function(){
      var className = 'on';

      $.each(_settings.data, function(_,v){
        $('.stage-area').append("<img src='" + v + "' class=" + className + ">");
        className = 'off';
      });
    },

    prepareArrows: function(){
      $('.arrows-area').append('<span class="left-arrow hidden">');
      $('.arrows-area').append('<span class="right-arrow hidden">');
    },

    addFullScreen: function(){
      $('.menu-area').append('<div class="fullscreen">')
      $('.fullscreen').click(fullScreen.make);
    },

    addCounter: function(){
      $('.menu-area').append('<div class="counter">');
      $('.counter').append('<span class="current">' + 1);
      $('.counter').append('<span class="total"> / ' + _data.length);
    },

    prepareMenuArea: function(){
      graphicScope.addFullScreen();
      graphicScope.addCounter();
    }
  };

  var cssScope = {
    init: function(){
      $('#' + _settings.id).css('height', _settings.height);
      $('#' + _settings.id).css('background', _settings.background);
      $('#' + _settings.id).css('position', _settings.position);
      $('#' + _settings.id).css('width', _settings.width);
    }
  };

  $.fn.knack = function(options, method){
    _settings = $.extend({
      'id': 'projector',
      'height': '300px',
      'background': 'black',
      'position': 'relative',
      'width': '500px'
    }, options);

    _data = _settings.data;

    if (_data){
      if (mainScope[method]){}
      else if (!method){return mainScope.init.apply(this, [])}
      else{$.error('Undefined method ' + method + 'for Knack')}
    }
    else{$.error('Please give me your images.')}
  };

})(jQuery);

$(window).load(function(){
  var images = [
    "assets/images/hot-rod-dark.jpg",
    "assets/images/hot-rod-style.jpg",
    "assets/images/hot-rod.jpg",
    "assets/images/1930-ford-model-a-hot-rod.jpg",
    "assets/images/hot-rod-black.jpg",
    "assets/images/Hot-Rod-for-sale.jpg",
    "assets/images/Hot-Rod-Cars.jpg",
    "assets/images/VOLKSWAGON_hot_rod_rods.jpg"
  ];
  $('#projector').knack({data: images});
});
