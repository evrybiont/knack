(function($){
  // === instances ===
  var doc = window.document,
      DOM = function(){
        return{
            html:  doc.documentElement,
            body:  doc.body,
            head:  doc.getElementsByTagName('head')[0],
            title: doc.title
        };
      },
      html = DOM().html,
      supportFullScreen = (html.requestFullscreen || html.msRequestFullscreen || html.mozRequestFullScreen || html.webkitRequestFullScreen),
      exitFullScreen = (doc.exitFullscreen || doc.msExitFullscreen || doc.mozCancelFullScreen || doc.webkitCancelFullScreen);
  // === istances end ===


  // === fullScreenStart ===
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
  // === fullScreenEnd ===


  // === mainScopeStart ===
  var mainScope = {
    init: function(options){
      graphicScope.init.apply(this, [options]);

      return this;
    }
  };
  // === mainScopeEnd ===


  // == graphicScopeStart ===
  var graphicScope = {
    init: function(options){
      graphicScope.prepareProjector.apply(this, [options]);
      graphicScope.prepareStageArea.apply(this, [options]);
      graphicScope.prepareMenuArea();
    },

    prepareProjector: function(options){
      cssScope.init.apply(this, [options]);

      $('#'+ options.id).append('<div class="stage-area">');
      $('#'+ options.id).append('<div class="menu-area">');
    },

    prepareStageArea: function(options){
      var className = 'on';

      $.each(options.data, function(_,v){
        $('.stage-area').append("<img src='" + v + "' class=" + className + ">");
        className = 'off';
      });
    },

    prepareMenuArea: function(){
      $('.menu-area').append('<div class="fullscreen">')
      $('.fullscreen').click(fullScreen.make);
    }
  };
  // === graphicScopeEnd ===


  // === cssScopeStart ===
  var cssScope = {
    init: function(options){
      $('#' + options.id).css('height', options.height);
      $('#' + options.id).css('background', options.background);
      $('#' + options.id).css('position', options.position);
      $('#' + options.id).css('width', options.width);
    }
  };
  // === cssScopeEnd ===

  // ===== start ====
  $.fn.knack = function(options, method){
    var settings = $.extend({
      'id': 'projector',
      'height': '300px',
      'background': 'black',
      'position': 'relative',
      'width': '500px'
    }, options);

    if (settings.data){
      fullScreen.bind();

      if (mainScope[method]){}
      else if (!method){return mainScope.init.apply(this, [settings])}
      else{$.error('Undefined method ' + method + 'for Knack')}

    }
    else{$.error('Please give me your images.')}
  };
  // === end ===

})(jQuery);

$(window).load(function () {
  var images = ["assets/images/hot-rod.jpg", "assets/images/hot-rod-style.jpg", "assets/images/hot-rod-dark.jpg"];
  $('#projector').knack({data: images});
});
