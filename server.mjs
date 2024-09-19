const port = process.env.PORT || 4000;

import { createServer } from 'node:http';

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Listening on 0.0.0.0:${port}`);
});