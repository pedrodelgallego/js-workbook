(function(){
  var api = {
    emitter: emitter
  };

  function  emitter(){
    var handlers = {};

    return {
      on: function(eventName, handler){
        // The on code goes here
      },

      emit: function(eventName){
        // The emit code goes here
      },
    }
  };

  module.exports = api;
})();
