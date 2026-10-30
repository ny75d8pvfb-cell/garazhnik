const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const [n,w,h] of [['m',390,844],['d',1280,900]]){
const c=await b.newContext({viewport:{width:w,height:h}});await c.addInitScript(()=>{localStorage.setItem('garazh-cookie','1')});
const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.goto('http://localhost:8765/');await p.waitForTimeout(300);
await p.click(n==='m'?'nav.bottom [data-tab="faults"]':'.tabs [data-tab="faults"]');await p.waitForTimeout(300);
console.log(n,'hash',await p.evaluate(()=>location.hash),'sym cards',await p.$$eval('.sym',a=>a.length));
await p.screenshot({path:n+'-faults.png'});
await p.click('.fseg [data-goto="lamps"]');await p.waitForTimeout(300);console.log('lamps',await p.$$eval('.lampc',a=>a.length));await p.screenshot({path:n+'-lamps.png'});
await p.click('.fseg [data-goto="codes"]');await p.waitForTimeout(300);console.log('codes',await p.$$eval('.codec',a=>a.length));await p.screenshot({path:n+'-codes.png'});
for(const q of ['P0335','0301','p2123','смесь','0420','9999']){await p.fill('#q',q);await p.waitForTimeout(150);console.log(q,await p.$$eval('.codec .code',a=>a.map(x=>x.textContent)));}
console.log('overflow',await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth));
await p.goto('http://localhost:8765/#symptoms');await p.waitForTimeout(200);console.log('symptoms route tab',await p.$eval('[data-tab="faults"][aria-selected="true"]',()=>1).catch(()=>0));
await c.close();}
console.log(errs);await b.close();})();
