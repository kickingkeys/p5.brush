/**
 * Headless renderer for p5.brush sketches.
 * Usage: node render_local.js <sketch.js> [output.png]
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sketchPath = process.argv[2];
if (!sketchPath) {
    console.error('Usage: node render_local.js <sketch.js> [output.png]');
    process.exit(1);
}
const sketchCode = fs.readFileSync(sketchPath, 'utf8');
const outputPath = process.argv[3] || path.join(__dirname, 'output.png');

const html = `<!DOCTYPE html>
<html>
<head>
<script src="https://cdn.jsdelivr.net/npm/p5@2.2/lib/p5.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/p5.brush@2.1.0-beta"><\/script>
<style>body { margin: 0; overflow: hidden; background: #fffaf3; }</style>
</head>
<body>
<script>
${sketchCode}
<\/script>
</body>
</html>`;

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--enable-webgl',
            '--use-angle=metal',
        ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 600, height: 600 });

    const errors = [];
    page.on('pageerror', err => {
        errors.push(err.message);
    });
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push('CONSOLE: ' + msg.text());
        }
    });

    const tmpHtml = path.join(__dirname, `_tmp_${process.pid}_${Date.now()}.html`);
    fs.writeFileSync(tmpHtml, html);

    try {
        await page.goto('file://' + tmpHtml, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise(r => setTimeout(r, 5000));

        const canvas = await page.$('canvas');
        if (canvas) {
            await canvas.screenshot({ path: outputPath, type: 'png' });
            const buf = fs.readFileSync(outputPath);
            console.log(JSON.stringify({ status: 'ok', errors, image_size: buf.length }));
        } else {
            console.log(JSON.stringify({ status: 'error', message: 'No canvas', errors }));
            process.exit(2);
        }
    } catch (err) {
        console.log(JSON.stringify({ status: 'error', message: err.message, errors }));
        process.exit(3);
    } finally {
        if (fs.existsSync(tmpHtml)) fs.unlinkSync(tmpHtml);
        await browser.close();
    }
})().catch(err => {
    console.error('Fatal:', err.message);
    process.exit(1);
});
