const express = require('express');
const app = express();
const puppeteer = require("puppeteer-extra");
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const pluginAnonymizeUA = require('puppeteer-extra-plugin-anonymize-ua');

puppeteer.use(pluginStealth());
puppeteer.use(pluginAnonymizeUA());

function findAndExtractSubstring(str, substr) {
    const regex = new RegExp(`${substr}":"(.*?)"`);
    const match = str.match(regex);
    return match ? match[1].replace(/\\/g, '') : null;
}

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    app.get('/url', async (req, res) => {
        const url = req.query.link;
        const page = await browser.newPage();
        page.on("response", async (response) => {
            try {
                const data = await findAndExtractSubstring(await response.text(), "playable_url");
                if (data) {
                    res.status(200).json({ link: data, message: "Thành công" });
                    await page.close();
                }
            } catch (error) {
                console.error(error);
            }
        });
        await page.goto(url, {
            waitUntil: "load",
            timeout: 0,
        });
    });
})();

process.on('uncaughtException', function (error) {
    console.log(error);
});

module.exports = app;
