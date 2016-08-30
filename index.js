var telnet = require('./lib/telnet');
var config = require('./config.json');

var ifttt = [
  {
    this: 'Please enter your username or "new":',
    that: config.username
  },
  {
    this: 'Please enter your password:',
    that: config.password
  },
  {
    this: 'Please enter your selection:',
    that: 'g'
  },
  {
    this: 'Please select a realm:',
    that: '1'
  },
  {
    this: '[GREATERMUD]:',
    that: 'e'
  }
];

var connection = new telnet();
connection.on('data', function(data) {
  console.log(data);
});
connection.connect(config.host, config.port, config.timeout);
