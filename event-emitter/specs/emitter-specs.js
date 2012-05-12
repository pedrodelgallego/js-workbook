var should = require("should"),
    EventEmitter = require('../emitter-solution.js');

describe('EventEmitter', function(){
  var emitter;

  beforeEach(function(){
    emitter  = EventEmitter.emitter();
  });

  it('is an object', function(){
    EventEmitter.should.be.a('object');
  });

  describe('#on', function(){
    it('is be a function', function(){
      emitter.on.should.be.a('function');
    });

    it('with no arguments should throw an error', function(){
      (function(){
        emitter.on()
      }).should.throw('Cannot bind to event emitter. The passed event is not a string');
    });

    it('first parameter should be a string', function(){
      (function(){
        emitter.on(1, function(){})
      }).should.throw('Cannot bind to event emitter. The passed event is not a string');
    });

    it('second parameter should be a function', function(){
      (function(){
        emitter.on("event:name", "not a function")
      }).should.throw();
    });
  });

  describe('#once', function(){
    it('is be a function', function(){
      emitter.once.should.be.a('function');
    });

    it('with no arguments should throw an error', function(){
      (function(){
        emitter.once()
      }).should.throw('Cannot bind to event emitter. The passed event is not a string');
    });

    it('first parameter should be a string', function(){
      (function(){
        emitter.once(1, function(){})
      }).should.throw('Cannot bind to event emitter. The passed event is not a string');
    });

    it('second parameter should be a function', function(){
      (function(){
        emitter.once("event:name", "not a function")
      }).should.throw();
    });
  });

  describe('#emit', function(){
    it('is a function', function(){
      emitter.emit.should.be.a('function');
    });

    it('with no arguments should throw an error', function(){
      (function(){
        emitter.emit()
      }).should.throw();
    });

    it('first parameter should be a string', function(){
      (function(){
        emitter.on(1)
      }).should.throw();
    });
  });

  describe('event and emit', function(){
    it( 'on method should catch and execute emited events', function(){
      var flag = false;

      emitter.on('change:flag', function() {
        flag = true;
      });

      emitter.emit('change:flag');

      flag.should.equal(true);
    });

    it( 'on method should catch and execute only the function associated to an specific event', function(){
      var event1Flag = false,
          event2Flag = false;

      emitter.on('event1', function() {
        event1Flag = true;
      });

      emitter.on('event2', function() {
        event2Flag = true;
      });
      emitter.emit('event2');

      event2Flag.should.equal(true);
      event1Flag.should.equal(false);
    });

    it( 'on method should catch and execute all the function associated to an specific event', function(){
      var flag1 = false,
          flag2 = false;

      emitter.on('event1', function() {
        flag1 = true;
      });

      emitter.on('event1', function() {
        flag2 = true;
      });

      emitter.emit('event1');

      flag1.should.equal(true);
      flag2.should.equal(true);
    });

    it( 'on is a chainable method', function(){
      var flag1 = false,
          flag2 = false;

      emitter.on('event1', function() {
        flag1 = true;
      }).on('event1', function() {
        flag2 = true;
      });

      emitter.emit('event1');

      flag1.should.equal(true);
      flag2.should.equal(true);
    });

    it( 'emit should pass the list of parameters as arguments to the ', function(){
      var flag;
      emitter.on('event1', function(param) {
        flag = param;
      });

      emitter.emit('event1', true);

      flag.should.equal(true);
    });

    it( 'emit should pass the list of parameters as arguments to the ', function(){
      var count = 0;
      emitter.once('event1', function(param) {
        count += 1;
      });

      emitter
        .emit('event1')
        .emit('event1');

      count.should.equal(1);
    });
  });
})
