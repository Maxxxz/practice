const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 只处理/download路径的请求
    if (req.url.startsWith('/download')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const isAuto = url.searchParams.get('isAuto');
        const filePath = path.join(__dirname, '3.9.15.166.zip');
        // 处理HEAD请求
        if (req.method === 'HEAD') {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error: File not found');
                    return;
                }
                
                res.writeHead(200, {
                    'Content-Type': 'application/zip',
                    'Content-Length': stats.size
                });
                res.end();
            });
            return;
        }
        
        // 如果有isAuto=1参数，返回400
        if (isAuto === '1') {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request: isAuto=1 is not allowed');
            return;
        }
        

        

        
        // 处理GET请求
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error: File not found');
                return;
            }
            
            res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename=3.9.15.166.zip'
            });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});