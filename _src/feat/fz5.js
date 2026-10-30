const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [n,w,t] of [["am",390,"dark"],["ad",1280,"light"]]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    const errs=[]; p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(t => { localStorage.setItem('garazh-theme',t); localStorage.setItem('garazh-cookie','1'); }, t);
    await p.goto('http://localhost:8765/stati/predohraniteli-granta.html'); await p.waitForTimeout(400);
    await p.screenshot({ path: `fz-${n}1.png` });
    await p.evaluate(() => document.querySelector('#bystro').scrollIntoView()); await p.screenshot({ path: `fz-${n}2.png` });
    await p.evaluate(() => document.querySelector('#kak-proverit').scrollIntoView()); await p.screenshot({ path: `fz-${n}3.png` });
    console.log(n, await p.evaluate(() => document.documentElement.scrollWidth), errs);
  }
  await b.close();
})();
