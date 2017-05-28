'use strict';
// requirements
var Calculator = require('./src/calculator');
const pool = require('./lib/db');
const Hapi = require('hapi');
const server = new Hapi.Server();
//calling functions
var makeCalculator=function (request, reply) {
  pool.query('Insert Into calculate values ($1,$2)',[request.payload.id,0],function(err, res) {
     if(err) {
       return console.error('error running query', err);
     }
     console.log('done');
  });
  reply("Inserted!!");
}

var getCalculator = function (request, reply) {
  pool.query('Select val from calculate where id=$1',[Number(request.query.id)],function(err, res) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('number:',res.rows[0]);
    reply(res.rows[0].val);
  });
}

var calculate = function(request, reply){
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
//server connection
server.connection({ port: 3000, host: 'localhost' });
server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./public/hello.html');
        }
    });
});
//Apis
var makeCalc = {
  method: 'POST',
  path: '/makeCalculator',
  handler: makeCalculator
};

var getCalc = {
  method: 'GET',
  path: '/getCalculator',
  handler: getCalculator
};

var operate = {
  method: 'GET',
  path: '/calculate',
  handler: calculate
};
// JSON consisting APIs
var jsonArray = [];
jsonArray.push(makeCalc);
jsonArray.push(getCalc);
jsonArray.push(operate);
// Pushing APIs to server
server.route(jsonArray);

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
