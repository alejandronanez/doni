const scrapeIt = require('scrape-it');
const puppeteer = require('puppeteer');

const baseUrl = 'https://coolors.co/fafafa-a39ba8-b8c5d6-edf5fc-23ce6b';

module.exports = async function (...args) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(baseUrl, {waitUntil: 'networkidle'});
  await page.waitForSelector('.color-info-name');

  const colors = await page.evaluate(() => {
    const colorNames = Array.from(document.querySelectorAll('.color-info-name'));
    const colorHex = Array.from(document.querySelectorAll('.hex.tooltip input'));
    console.log(colorNames);
    return colorNames.map((anchor, index) => ({
      name: anchor.textContent,
      hex: colorHex[index].value
    }));
  });

  console.log(colors);
  await browser.close();
}('#fafafa', '#a39ba8', '#b8c5d6', '#edf5fc', '#23ce6b');
