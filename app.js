var Parse = require('node-parse-api').Parse;
var APP_ID = "t6QATVAhXYgvqboc92rbbDnFen97qFLsSUhRZSkM";
var MASTER_KEY = "rAt8hiJmnbMwhRbhxECHQelEhSblP6DHtztJ8Jrp";
var appParse = new Parse(APP_ID, MASTER_KEY);

var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;


var port = new SerialPort("/dev/ttyAMA0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
}, false); // this is the openImmediately flag [default is true]


///create server
app.use(express.static(__dirname + ''));
console.log('Simple static server listening at '+url+':'+port);

app.get('', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('YOUR SERVER IS RUNNING')

});


io.sockets.on('connection', function (socket) {
  //open port for sensor data
  port.open(function(error) {

    if (error) {
      console.log('failed to open: ' + error);
  } else {
    console.log('Serial open');


    socket.on('open', function () {
      // console.log(data.open);
      // port.write('A');
      port.write('O');
      // port.write('A');

  });



    port.on('data', function(data) {

    console.log(data);



    });
  }

  });


  socket.on('sendToParse', function (data) {
    console.log(data.name);
    console.log(data.password);

    appParse.insert('owner', { name: data.name, password: data.password }, function (err, response) {
    console.log("entry made");

    appParse.find('owner', '' , function (err, response) {
    // console.log(response);
    socket.emit('toScreen',{ name: data.name });

  });
  });


// //find password to authenticate owner
// socket.on('getFromParse', function (data) {
//     appParse.find('owner', '' , function (err, response) {
//     console.log(response);
//     socket.emit('toScreen',{ name: data.name });
// });


  });//socket on 'parse' end Bracket

});


//function to transmit open signal to Arduino
  function sendOpen(data){
  //console.log(data.length);

  var sensorData = parseInt(data.key, 10);

  if (sensorData <100  && unlocked == true ){
  console.log('A');
  console.log('O');

}else{
}

}
