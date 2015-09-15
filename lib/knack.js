(function($){
  console.log('sdsds');
  var mainScope = {
    init: function(options){
      console.log(options);


      return this;
    }
  };

  var errorsScope = {

  }

  // ===== start ====
  $.fn.knack = function(options, method){
    var settings = $.extend({
      'height': '200px',
      'with': '400px'
    }, options);

    if (settings.data){

      if (mainScope[method]){}
      else if (!method){return mainScope.init.apply(this, [settings])}
      else{$.error('Undefined method ' + method + 'for Knack')}

    }
    else{$.error('Please give me your images.')}
  };
  // === end ===

})(jQuery);
