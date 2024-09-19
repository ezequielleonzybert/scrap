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
const email = 'norapo2550@sigmazon.com';
const password = '123456';

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // No muestra la interfaz gráfica
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Configuración para entornos remotos
    });
    const page = await browser.newPage();
    await page.goto('https://www.correoargentino.com.ar/MiCorreo/public/');
    await page.type('#email', email);
    await page.type('#password', password);
    await page.keyboard.press('Enter');
    await page.type('#email', email);
    await page.type('#password', password);
    await page.keyboard.press('Enter');

    await page.waitForSelector('h3');
    const h3Text = await page.evaluate(() => {
        return document.querySelector('h3').innerText;
    });
    console.log('Contenido del <h3>:', h3Text);

    await browser.close();
})();