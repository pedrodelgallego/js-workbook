var should = require("should"),
    binder = require('../bind.js'),
    bind = binder.bind,
    bindAll = binder.bindAll;

describe('bind', function(){
  var context, func;
  beforeEach(function(){
    context = {name : 'moe'};
    func = function(arg) {
      return "name: " + (this.name || arg);
    };
  });

  it('is be a function', function(){
    bind.should.be.a('function');
  });

  it('with no arguments should throw an error', function(){
    (function(){
      bind();
    }).should.throw();
  });

  it('first parameter should be a function', function(){
    (function(){
      bind("not a function");
    }).should.throw();
  });

  it('can bind a function to a context', function(){
    var bound = bind(func, context);
    bound().should.be.equal('name: moe');
  });

  it('can bind without specifying a context', function(){
    var bound = bind(func, null, 'curly');
    bound().should.be.equal('name: curly');
  });

  it('the function was partially applied in advance', function(){
    func = function(salutation, name) { return salutation + ': ' + name; };
    func = bind(func, this, 'hello');
    func('moe').should.be.equal('hello: moe');
  });

  it('the function was partially applied in advance and can accept multiple arguments', function(){
    var func = function(salutation, firstname, lastname) { return salutation + ': ' + firstname + ' ' + lastname; };
    func = bind(func, this, 'hello', 'moe', 'curly');
    func().should.be.equal('hello: moe curly');
  });
});
