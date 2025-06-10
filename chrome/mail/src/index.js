const http = require('http');
const url = require('url');
const {sendEmail} = require('./sendEmail');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === '/sendMail' && req.method === 'GET') {
    const { title, content } = parsedUrl.query;
    const rr = await sendEmail(title, content);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if(rr){
        res.end(JSON.stringify({ 
            message: 'Mail sent successfully!',
            title,
            content
          }));
    }else {
        res.end(JSON.stringify({ 
            message: 'Mail sent successfully!',
            title,
            content
          }));
    }
    
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(2266, () => {
  console.log('Server is running on http://localhost:2266');
});