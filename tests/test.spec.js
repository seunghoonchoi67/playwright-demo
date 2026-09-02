const { chromium } = require('playwright');
const { test } = require('@playwright/test');

test.describe('My Test Suite', () => {
  //test('My Test Case', async () => {
  test('My Test Case', async ({ page }) => {
    // const browser = await chromium.launch();
    // const page = await browser.newPage();

    await authenticate(page);

    // await browser.close();
    });
});

async function authenticate(page) {
    await page.goto('https://bitheap.tech');
    await page.click('#menu-item-2330');
    
    // 아이디와 비밀번호 입력: 하드 코딩
    // await page.locator("[name='xoo-el-username']").fill("csh@duksung.ac.kr");
    // await page.locator("[name='xoo-el-password']").fill("SeTestPassword");
    
    // 아이디와 비밀번호 입력: 환경 변수 사용
    await page.locator("[name='xoo-el-username']").fill(process.env.BITHEAP_USERNAME);
    await page.locator("[name='xoo-el-password']").fill(process.env.PASS);

    // 'sign in' 버튼 클릭
    await page.locator("xpath=/html/body/div[8]/div[2]/div/div/div[2]/div/div/div[2]/div/form/button").click(); 

    const text = await page.locator('#menu-item-2333 > a').textContent();
    if(text !== 'Hello, 승훈') {
        console.error("The authentication failed.");
    } else {
        console.log("The authentication succeeded.");
    }

    await page.screenshot({ path: 'screenshot.png' });

}

