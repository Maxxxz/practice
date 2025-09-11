var net = require('net');

// Synchronously check if a port is in use
function isPortTakenSync(port) {
  var isTaken = false;
  var server = net.createServer();
var server2 = net.createServer();
server2.listen(port);
  try {
    // Try to listen on the port
    server.listen(port);
    server.on('error', function(err) {
        console.error(`Port ${port} is already in use22`);
        isTaken = true;
    });
    server.on('listening',function() {
        console.log(`listening`);
        isTaken = false;
        server.close();
    });
  } catch (e) {
    isTaken = true;
  }

  return isTaken;
}

// Usage example
var port = 3000;
if (isPortTakenSync(port)) {
  console.log(`Port ${port} is already in use`);
} else {
  console.log(`Port ${port} is available`);
}
