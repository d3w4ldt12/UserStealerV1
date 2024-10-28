const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3001;

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/save-login') {
        let body = '';

        // Collect data from the request
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            const { username } = JSON.parse(body);

            // Append the username to Logins.txt
            fs.appendFile('Logins.txt', username + '\n', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error writing to file');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Username saved!');
            });
        });
    } else if (req.method === 'GET') {
        // Serve the HTML file
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('public/index.html').pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
