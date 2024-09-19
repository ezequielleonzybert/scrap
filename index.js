const puppeteer = require('puppeteer');
const email = 'norapo2550@sigmazon.com';
const password = '123456';
let url;

const fs = require('fs');
const path = require('path');

function mostrarArchivos(directorio) {
    fs.readdir(directorio, (err, archivos) => {
        if (err) throw err;

        archivos.forEach(archivo => {
            const rutaCompleta = path.join(directorio, archivo);

            fs.stat(rutaCompleta, (err, stats) => {
                if (err) throw err;

                if (stats.isDirectory()) {
                    mostrarArchivos(rutaCompleta);  // Recursión para subdirectorios
                } else {
                    console.log(rutaCompleta);  // Mostrar archivos
                }
            });
        });
    });
}

mostrarArchivos('/');  // Cambiá el directorio base si es necesario


(async () => {
    const browser = await puppeteer.launch({
        headless: 'shell',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    console.log("login in");
    url = 'https://www.correoargentino.com.ar/MiCorreo/public/';
    await page.goto(url);
    while (url == page.url()) {
        await page.type('#email', email);
        await page.type('#password', password);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
    }
    console.log("logged");
    url = 'https://www.correoargentino.com.ar/MiCorreo/public/envioCla';
    console.log("setting box properties");
    await page.goto(url);
    await page.waitForSelector('#largo');
    await page.type('#largo', '40');
    await page.waitForSelector('#ancho');
    await page.type('#ancho', '40');
    await page.waitForSelector('#alto');
    await page.type('#alto', '5');
    await page.waitForSelector('#peso');
    await page.type('#peso', '1');
    await page.waitForSelector('#valorContenido');
    await page.type('#valorContenido', '1');
    await page.waitForSelector('#next');
    await page.click('#next');
    console.log("setting delivery type");
    await page.waitForSelector('#tipoEntrega');
    await page.select('#tipoEntrega', 'sucursal');
    await page.waitForSelector('#provincia2');
    await page.type('#provincia2', 'BUENOS AIRES');
    await page.waitForSelector('#sucursalDestino2');
    await page.click('#sucursalDestino2');
    await page.type('#sucursalDestino2', 'HAEDO');
    await page.keyboard.press('Enter');

    console.log("getting price");
    await page.waitForSelector('#CLASICO');
    let precio = '';
    while (!precio.includes('$')) {
        precio = await page.evaluate(() => {
            return document.querySelector('#CLASICO').innerText;
        });
        // console.log('cargando...');
    }

    console.log('Precio:', precio);
    url = 'https://www.correoargentino.com.ar/MiCorreo/public/logout';
    await page.goto(url);
    await browser.close();
})();