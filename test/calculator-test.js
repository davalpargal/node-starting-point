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
  describe('divide',function(){

  	 it('should return 4 when inputs are 8,2',function(){
  	 	assert.equal(4,Calculator.divide(8,2))
  	 });

  	 it('Infinity when inputs are 3,0',function(){
  	 	assert.equal("Infinity",Calculator.divide(3,0))
  	 });

  	 it('NaN when inputs are 0,0',function(){
  	 	assert.equal("NaN",Calculator.divide(0,0))
  	 });
  });
  describe('multiply', function(){
     it('should return 10 when inputs are 5,2',function(){
       assert.equal(10,Calculator.multiply(5,2))
     });
  });
});
