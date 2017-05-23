var assert = require('assert');

var Calculator = require('../src/calculator');

describe('Calculator', function() {

  describe('sum', function() {

    it('should return 1 when inputs are 1,0', function(){
      assert.equal(1, Calculator.sum(1,0))	
    });

  });  
  describe('subtract', function(){
     it('should return 0 when inputs are 1,1',function(){
       assert.equal(0,Calculator.subtract(1,1))
     });
  });
  

});
