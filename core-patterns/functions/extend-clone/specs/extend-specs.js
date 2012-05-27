var should = require("should"),
    extend = require('../extend-clone.js').extend;

describe('Extend', function(){
  it('can extend an object with the attributes of another', function(){
    extend({}, {name:'moe'}).name.should.equal('moe');
  });

  it('properties in source override destination', function(){
    extend({name:'pedro'}, {name:'moe'}).name.should.equal("moe");
  });

  it('properties not in source dont get overriden', function(){
    extend({age:'34'}, {name:'moe'}).age.should.equal(34);
  });

  it('properties not in source dont get overriden', function(){
    var fan = extend({age:'34'}, {name:'pedro'}, {club: "Real Madrid"});
    fan.club.should.equal("Real Madrid");
  });

  it('extending from multiple source objects last property trumps', function(){
    var fan = extend({age:'34'}, {name:'pedro'}, {name: "moe"});
    fan.name.should.equal("moe");
  });
});
