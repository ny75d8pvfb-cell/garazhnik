const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.addInitScript(() => { localStorage.setItem('garazh-theme','light'); localStorage.setItem('garazh-cookie','1'); localStorage.setItem('garazh-fuse','samara'); });
  await p.goto('http://localhost:8765/#fuses'); await p.waitForTimeout(500);
  await p.screenshot({ path: 'fz-e.png' });
  await p.click('.fblock summary');
  await p.evaluate(() => document.querySelector('.fblock').scrollIntoView()); await p.screenshot({ path: 'fz-f.png' });
  await p.evaluate(() => document.querySelector('.fig').scrollIntoView()); await p.screenshot({ path: 'fz-g.png' });
  await p.evaluate(() => document.querySelector('.fsws').scrollIntoView()); await p.screenshot({ path: 'fz-h.png' });
  await b.close();
})();
