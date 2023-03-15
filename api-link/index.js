const puppeteer = require("puppeteer-extra");
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const pluginAnonymizeUA = require('puppeteer-extra-plugin-anonymize-ua');
const fs = require('fs');
const url =
    "https://fb.watch/jh4UoGMpoW/";
puppeteer.use(pluginStealth());
puppeteer.use(pluginAnonymizeUA());
let Browser;
(async () => {
    await Browser == await puppeteer.launch({ headless: false })
})()
function findAndExtractSubstring(str, substr) {
    if (str.includes(substr)) {
        const startIndex = str.indexOf(substr);
        const endIndex = startIndex + substr.length;
        return str.slice(startIndex).split(",")[0].replace(/\\/g, '').split(`":`)[1].replaceAll(`"`, '');
    }
    return null;
}
async function StartScraping() {

    const page = await Browser.newPage();
    page.on("response", async (response) => {
        try {
            console.log(await findAndExtractSubstring(`${await response.text()}`, `"playable_url":"`))
            if (await findAndExtractSubstring(`${await response.text()}`, `"playable_url":"`)) {
                fs.writeFileSync('response.txt', await findAndExtractSubstring(`${await response.text()}`, `"playable_url":"`));
                await page.close()
                await browser.close()
            }
        } catch (error) {
        }
    });
    await page.goto(url, {
        waitUntil: "load",
        timeout: 0,
    });
}
StartScraping()
// new promises(resolve => resolve())