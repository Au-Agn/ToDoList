require('babel-polyfill');
const puppeteer = require('puppeteer');
// describe('on page load', () => {
let page;
let browser;
const width = 1920;
const height = 1080;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({
    width,
    height
  });
});
afterAll(() => {
  browser.close();
});
const user = {
  newCategory: 'test category',
  newTask: 'test task'
};
describe('on page load', () => {
  it('form works correctly', async () => {
    await page.waitForSelector("[data-test='app']");
    await page.click("input[name='newCategory']");
    await page.type("input[name='newCategory']", user.newCategory);

    await page.click("input[name='newTask']");
    await page.type("input[name='newTask']", user.newTask);

    await page.click("button[type='submit']");
  }, 160000);
});
