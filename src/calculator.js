function sum(a, b) {
  return a+b;
}
function subtract(a,b){
	return 0;
}
function divide(a,b){
	var div=a/b;
    if(isNaN(div)) return "NaN";
	else if(!isFinite(div)) return "Infinity";
	else return div;
}
module.exports = {
  sum: sum,
  subtract: subtract,
  divide: divide
}


/*exports.sum = function (a, b) {
  return a + b;
}*/
// exports.sum = (a, b) => a + b;
