'use strict';
// requirements
var Calculator = require('./src/calculator');
const pool = require('./lib/db');
const Hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers');
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
  var x= request.payload.operation;
  var num1= request.payload.num1;
  var num2;
  var ans;
  pool.query('Select val from calculate where id=$1',[Number(request.payload.id)],function(err, res) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('number:',res.rows[0].val);
    // reply(res.rows[0].val);
    num2 = res.rows[0].val;
    if(x=='sum')
    ans = Calculator.sum(Number(num2),Number(num1));
    else if(x=='subtract')
    ans = Calculator.subtract(Number(num2),Number(num1));
    else if(x=='multiply')
    ans = Calculator.multiply(Number(num2),Number(num1));
    else if(x=='divide')
    ans = Calculator.divide(Number(num2),Number(num1));
    else
    reply({
      ans:'no such operation',
    }).code(404);
    if(!isNaN(ans)){
      pool.query('Update calculate set val = $1 where id = $2',[ans,Number(request.payload.id)],function(err,res){
        if(err) {
          return console.error('error running query', err);
        }
        reply({
          answer : ans
        });
      // reply(res.rows[0].val); 
      });
    }
  });
}

var deleteCalculator = function(request,reply){
  pool.query('DELETE FROM calculate',[],function(err,res){
    if(err) {
      return console.error('error running query', err);
    }
    // console.log('number:',res.rows[0]);
    reply("table erased");
  });
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
            reply.file('./src/public/index.html');
        }
    });
});

// Pushing APIs to server
server.route([{
  method: 'PUT',
  path: '/makeCalculator',
  handler: makeCalculator
},{
  method: 'POST',
  path: '/calculate',
  handler: calculate
}, {
  method: 'GET',
  path: '/getCalculator',
  handler: getCalculator
}, {
  method: 'DELETE',
  path:'/deleteCalculator',
  handler: deleteCalculator
}]);
server.ext('onPreResponse', corsHeaders);

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
