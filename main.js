var socket = io.connect('http://192.168.1.142:8000');
var Parse= require('node-parse-api').Parse;
var APP_ID="t6QATVAhXYgvqboc92rbbDnFen97qFLsSUhRZSkM";
var MASTER_KEY = "rAt8hiJmnbMwhRbhxECHQelEhSblP6DHtztJ8Jrp";
var appParse = new Parse(APP_ID, MASTER_KEY);

var bodyParser = require('body-parser');
var express = require("express");
var app = express();
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);


///create server
app.use(express.static(__dirname + ''));
console.log('Simple static server listening at '+url+':'+port);

app.get('', function (req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('YOUR SERVER IS RUNNING')

})


io.sockets.on('connection', function (socket) {


  socket.on('sendToParse', function (data) {
    console.log(data);
    appParse.insert('owner', { firstName: data.firstName,lastName:data.lastName,age:data.age,pet:data.pet,drake:data.drake }, function (err, response) {
    // console.log(response);
    console.log("entry made");
  });
  });


socket.on('getFromParse', function (data) {
    appParse.find('WootWoot', '', function (err, response) {
  console.log(response);
  socket.emit('toScreen',{ ParseData: response });
});

  });



// //need this to send data to the Arduino via TX
// var serialport = require("serialport");
// var SerialPort = serialport.SerialPort;
// var port = new SerialPort("/dev/ttyAMA0", {
//   baudrate: 9600,
//   parser: serialport.parsers.readline("\n")
// }, false); // this is the openImmediately flag [default is true]



// port.open(function(error) {

//   if (error) {
//     console.log('failed to open: ' + error);
//   } else {
//     port.write("A");
//     console.log('Serial open');


//     port.on('data', function(data) {
//     //console.log('data length: ' + data.length);
//     console.log(data);
//     port.write("A");
//     });


// }

// });












