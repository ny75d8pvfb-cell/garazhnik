const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.addInitScript(() => { localStorage.setItem('garazh-theme','dark'); localStorage.setItem('garazh-cookie','1'); });
  await p.goto('http://localhost:8765/#fuses'); await p.waitForTimeout(500);
  await p.evaluate(() => document.querySelector('.fkey').scrollIntoView()); await p.screenshot({ path: 'fz-a.png' });
  await p.evaluate(() => document.querySelector('.fig').scrollIntoView()); await p.screenshot({ path: 'fz-b.png' });
  await p.click('[data-fmod="samara"]'); await p.waitForTimeout(200);
  await p.click('.fblock summary'); await p.evaluate(() => document.querySelector('.fblock').scrollIntoView()); await p.screenshot({ path: 'fz-c.png' });
  await p.fill('#q', 'печка'); await p.waitForTimeout(300); await p.evaluate(() => document.querySelector('.fmodel').scrollIntoView()); await p.screenshot({ path: 'fz-d.png' });
  await b.close();
})();
