var should = require("should"),
    clone = require('../extend-clone.js').clone;

describe('Clone', function(){
  var moe, cloneObj;

  beforeEach(function(){
    obj = {name : 'moe', lucky : [13, 27, 34]};
    cloneObj = clone(moe);
  });

  it('the clone as the attributes of the original', function(){
    clone.name.should.equal("moe");
  });

  it('clones can change shallow attributes without affecting the original', function(){
    cloneObj.name = 'curly';
    moe.name.should.equal("moe");
    cloneObj.name.should.equal("curly");
  });

  it('changes to deep attributes are shared with the original', function(){
    cloneObj.lucky.push(101);
    moe.lucky[3].should.equal(101);
  });
})
