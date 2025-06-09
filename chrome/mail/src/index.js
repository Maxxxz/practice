const http = require('http');

const server = http.createServer(async (req, res) => {
  if (req.url === '/sendMail' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Mail sent successfully!' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(2266, () => {
  console.log('Server is running on http://localhost:2266');
});