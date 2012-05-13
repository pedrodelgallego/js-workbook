(function(){
  var api = {
    binder: binder
  };

  function    binder(){
    var handlers = {};
    var guid = 0;

    return {
      bind: function(fn, context){},

      bindAll: function(fn, context){},
    }
  };

  module.exports = api;
})();
