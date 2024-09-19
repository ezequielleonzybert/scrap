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
let url;

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // No muestra la interfaz gráfica
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Configuración para entornos remotos
    });
    const page = await browser.newPage();
    url = 'https://www.correoargentino.com.ar/MiCorreo/public/';
    await page.goto(url);
    while (url == page.url()) {
        await page.type('#email', email);
        await page.type('#password', password);
        await page.keyboard.press('Enter');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
    }

    await page.goto('https://www.correoargentino.com.ar/MiCorreo/public/envioCla');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.type('#largo', 40);
    await page.type('#ancho', 40);
    await page.type('#alto', 5);
    await page.type('#peso', 1);
    await page.type('#valorContenido', 1);
    await page.click('#next');

    await page.waitForSelector('#mediL');
    const mediL = await page.evaluate(() => {
        return document.querySelector('#mediL').innerText;
    });
    console.log('Contenido del mediL:', mediL);

    await browser.close();
})();