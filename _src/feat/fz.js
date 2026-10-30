const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [name, w, h, theme] of [["m-dark",390,844,"dark"],["d-light",1280,900,"light"],["m-light",390,844,"light"]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type()==='error') errs.push(m.text()); });
    await p.addInitScript(t => { localStorage.setItem('garazh-theme', t); localStorage.setItem('garazh-cookie','1'); }, theme);
    await p.goto('http://localhost:8765/#fuses'); await p.waitForTimeout(600);
    await p.screenshot({ path: `fz-${name}.png`, fullPage: true });
    if (name === "m-dark") {
      await p.click('[data-fmod="2107"]'); await p.waitForTimeout(200);
      await p.fill('#q', 'печка'); await p.waitForTimeout(300);
      await p.screenshot({ path: `fz-search.png`, fullPage: true });
      const ow = await p.evaluate(() => document.documentElement.scrollWidth); console.log('scrollWidth', ow);
      await p.goto('http://localhost:8765/#symptoms'); await p.waitForTimeout(300);
      await p.screenshot({ path: `fz-sym.png` });
    }
    console.log(name, errs.join(' | ') || 'no errors');
    await p.close();
  }
  await b.close();
})();
