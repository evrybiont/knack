(function($){

  var doc = window.document,
      DOM = function(){
        return{
          html:  doc.documentElement,
          body:  doc.body,
          head:  doc.getElementsByTagName('head')[0],
          title: doc.title,
          projector: $('#projector')[0]
        };
      },
      _settings = null,
      _data = null,
      html = DOM().html,
      _htmlImages = null,
      supportFullScreen = (html.requestFullscreen ||
                           html.msRequestFullscreen ||
                           html.mozRequestFullScreen ||
                           html.webkitRequestFullScreen),
      exitFullScreen = (doc.exitFullscreen ||
                        doc.msExitFullscreen ||
                        doc.mozCancelFullScreen ||
                        doc.webkitCancelFullScreen);

  var fullScreen = {
    active: false,

    make: function(){
      supportFullScreen.call(DOM().projector);
    },

    exit: function(){
      exitFullScreen.call(doc);
    },

    handler: function(){
      $(".fullscreen").unbind();
      $('.fullscreen').toggleClass('exit');

      if (fullScreen.active){
        fullScreen.active = false;
        $('.fullscreen').bind('click', fullScreen.make);
      } else {
        fullScreen.active = true;
        $('.fullscreen').bind('click', fullScreen.exit);
      }
    },

    bind: function(){
      $('.fullscreen').click(fullScreen.make);
      doc.addEventListener('fullscreenchange', fullScreen.handler, false);
      doc.addEventListener('MSFullscreenChange', fullScreen.handler, false);
      doc.addEventListener('mozfullscreenchange', fullScreen.handler, false);
      doc.addEventListener('webkitfullscreenchange', fullScreen.handler, false);
    }
  };

  var loader = {
    show: function(){
      $('.loader').show();
    },

    hide: function(){
      $('.loader').hide();
    }
  };

  var _counter = {
    index: 0,

    update: function(){
      $('.current').html(_counter.index + 1);
    }
  };

  var arrowsEvents = {
    right: function(){
      var activeImage = $('.on');
      _counter.index +=1;

      if (!_htmlImages.eq(_counter.index).length){
        _counter.index = 0;
      }

      _htmlImages.eq(_counter.index).toggleClass('off on');
      activeImage.toggleClass('on off');

      _counter.update();
    },

    left: function(){
      var activeImage = $('.on');

      if (_counter.index) {
        _counter.index -=1
      }else{
        _counter.index = _htmlImages.length -1
      }

      _htmlImages.eq(_counter.index).toggleClass('off on');
      activeImage.toggleClass('on off');

      _counter.update();
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

  var keyboard = {
    bind: function(){
      $('#projector').keydown(function(e){
        if (!autoPlay.active){
          switch (e.keyCode){
            case 39:
              arrowsEvents.right();
              break;
            case 37:
              arrowsEvents.left();
              break;
          }
        }
      });
    }
  };

  var autoPlay = {
    images: null,

    activeImage: null,

    active: false,

    startPoint: null,

    toggle: function(){
      $('.play').unbind();
      $('.play').toggleClass('stop');
      $('.arrows-area').toggle();

      if($('.stop').length){
        $('.stop').click(autoPlay.stop);
      }else{
        autoPlay.bind();
      }
    },

    timer: null,

    update: function(){
      autoPlay.activeImage = $('.on');

      if (_counter.index < _data.length-1){_counter.index += 1}
      else{_counter.index = 0}

      autoPlay.images.eq(_counter.index).toggleClass('off on');
      autoPlay.activeImage.toggleClass('on off');
      _counter.update();

      if (_counter.index == autoPlay.startPoint){autoPlay.active = false}
      if(!autoPlay.active){autoPlay.toggle()}
    },

    delay: function(){
      autoPlay.update();

      if (autoPlay.active){
        autoPlay.timer = setTimeout(function(){
          autoPlay.delay();
        }, _settings.time);
      }
    },

    play: function(){
      autoPlay.toggle();
      autoPlay.images = $('.stage-area').children();
      autoPlay.active = true;
      autoPlay.startPoint = _counter.index;
      autoPlay.delay();
    },

    stop: function(){
      autoPlay.active = false;
      autoPlay.toggle();
      clearTimeout(autoPlay.timer);
    },

    bind: function(){
      $('.play').click(autoPlay.play);
    }
  };

  var events = {
    bind: function(){
      fullScreen.bind();
      arrowsEvents.bind();
      autoPlay.bind();
      keyboard.bind();
    }
  };

  var mainScope = {
    init: function(options){
      graphicScope.init.apply(this, options);
      events.bind();
      _htmlImages = $('.stage-area').children();
      loader.hide();

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
      attrScope.init();

      $('#'+ _settings.id).append('<div class="stage-area">');
      $('#'+ _settings.id).append('<div class="arrows-area">');
      $('#'+ _settings.id).append('<div class="loader">');
      $('#'+ _settings.id).append('<div class="menu-area">');

      loader.show();
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
    },

    addCounter: function(){
      $('.menu-area').append('<div class="counter">');
      $('.counter').append('<span class="current">' + 1);
      $('.counter').append('<span class="total"> / ' + _data.length);
    },

    addPlayer: function(){
      $('.menu-area').append('<div class="play-box">');
      $('.play-box').append('<span class="play">');
    },

    prepareMenuArea: function(){
      graphicScope.addFullScreen();
      graphicScope.addCounter();
      graphicScope.addPlayer();
    }
  };

  var attrScope = {
    init: function(){
      $('#' + _settings.id).css('height', _settings.height);
      $('#' + _settings.id).css('background', _settings.background);
      $('#' + _settings.id).css('position', _settings.position);
      $('#' + _settings.id).css('width', _settings.width);
      $('#' + _settings.id).attr('tabindex', '0');
    }
  };

  $.fn.knack = function(options, method){
    _settings = $.extend({
      'background': 'black',
      'time': 5000,
      'height': '300px',
      'id': 'projector',
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
