const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.addInitScript(() => { localStorage.setItem('garazh-theme','light'); localStorage.setItem('garazh-cookie','1'); });
  await p.goto('http://localhost:8765/#fuses'); await p.waitForTimeout(500);
  const f = await p.$('.fig'); await f.screenshot({ path: 'fz-fig.png' });
  await b.close();
})();
