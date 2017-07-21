var net = require('net');
var util = require('util');
var events = require('events');

module.exports = Connection;

function Connection() {
  this.commands = {
    255: 'IAC',
    254: 'DONT',
    253: 'DO',
    252: 'WONT',
    251: 'WILL',
    250: 'SB',
    240: 'SE'
  };

  this.options = {
    1: 'ECHO',
    3: 'SUPPRESS-GO-AHEAD'
  };
}

util.inherits(Connection, events.EventEmitter);

Connection.prototype.connect = function (host, port, timeout) {
  var self = this;
  this.socket = net.createConnection(port, host);
  this.socket.setTimeout(timeout);
  this.socket.on('connect', function() { console.log('connection open'); });
  this.socket.on('data', function(data) {
    data = parse(self.socket, data);
    self.emit('data', data);
  });
  this.socket.on('error', function(error) { console.log('connection error:', error); });
  this.socket.on('end', function() { console.log('?socket end?'); });
  this.socket.on('close', function() { console.log('connection closed'); });
};

function parse(socket, chunk) {
  if (isNegotiation(chunk))
    chunk = negotiate(socket, chunk);

  if (chunk !== undefined)
    return chunk.toString();
}

function isNegotiation(data) {
  return data[0] === 255 && data[1] !== 255;
}

function negotiate(socket, chunk) {
  var data = chunk;
  var command;
  var response;

  for (var i = 0; i < chunk.length; i+=3) {
    if (chunk[i] != 255) {
      data = chunk.slice(0, i);
      command = chunk.slice(i);
      break
    }
  }

  response = data.toString('hex')
    .replace(/fd/g, 'fc')
    .replace(/fb/g, 'fd');

  if (socket.writable)
    socket.write(Buffer(response, 'hex'));

  if (command !== undefined)
    return command;
}
