function sum(a, b) {
  return a+b;
}

function subtract(a,b){
	return a-b;
}

function divide(a,b){
	var div=a/b;
    if(isNaN(div)) return "NaN";
	else if(!isFinite(div)) return "Infinity";
	else return div;
}

function multiply(a,b){
	return a*b;
}

function abs(a){
  return Math.abs(a);
}



module.exports = {
  sum: sum,
  subtract: subtract,
  divide: divide,
  multiply: multiply,
  absolute: abs
}


/*exports.sum = function (a, b) {
  return a + b;
}*/
// exports.sum = (a, b) => a + b;
