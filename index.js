// const port = process.env.PORT || 4000;

// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello World!\n');
// });

// server.listen(port, '0.0.0.0', () => {
//     console.log(`Listening on 0.0.0.0:${port}`);
// });

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // No muestra la interfaz gráfica
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Configuración para entornos remotos
    });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const title = await page.title();
    console.log(`Title of the page: ${title}`);

    await browser.close();
})();