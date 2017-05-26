var Calculator = require('./src/calculator');

// (() => {
//   var operation = process.argv[3];
//   var operand1 = Number(process.argv[2]);
//   var operand2 = Number(process.argv[4]);
//   // [,,operand1,operation,operand2] = process.argv
//   switch(operation){
//     case '+':
//     // console.log(Calculator.sum(+operand1, +operand2));
//     console.log(Calculator.sum(operand1, operand2));
//     break;
//     default:
//     console.log('Invalid operation!');
//   }
// })();

'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

// server.register({ // register all your plugins 
//   register: require('hapi-postgres-connection') // no options required 
// }, function (err) {
//   if (err) {
//     // handle plugin startup error 
//   }
// });
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

// server.route({
//     method: 'GET',

//     path: '/',
//     handler: function (request, reply) {
//         reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });

server.route({
  method: 'GET',
  path:'/calculate',
  handler: function(request, reply){
    var x= request.query.operation;
    var num1= request.query.num1;
    var num2= request.query.num2;
    if(x=='sum')
      reply({
        ans: Calculator.sum(Number(num1),Number(num2))
      }).code(200);
    else if(x=='subtract')
       reply({
        ans: Calculator.subtract(Number(num1),Number(num2))
      }).code(200);
    else if(x=='multiply')
       reply({
        ans: Calculator.multiply(Number(num1),Number(num2))
      }).code(200); 
    else if(x=='divide')
      reply({
        ans: Calculator.divide(Number(num1),Number(num2))
      }).code(200);
    else
      reply({
        ans:'no such operation',
      }).code(404);
    } 

});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
