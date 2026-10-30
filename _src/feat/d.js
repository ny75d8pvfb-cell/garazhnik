const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const [n,w,h] of [['m',390,844],['d',1280,900]]){
const c=await b.newContext({viewport:{width:w,height:h}});await c.addInitScript(()=>{localStorage.setItem('garazh-cookie','1')});
const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.goto('http://localhost:8767/');await p.waitForTimeout(400);await p.screenshot({path:'dr-'+n+'-home.png'});
await p.goto('http://localhost:8767/#oil');await p.waitForTimeout(400);await p.screenshot({path:'dr-'+n+'-oil.png',fullPage:true});
console.log(n,'overflow',await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth));
await p.goto('http://localhost:8767/#timing');await p.waitForTimeout(300);await p.screenshot({path:'dr-'+n+'-timing.png'});
await p.goto('http://localhost:8767/');await p.fill('#q','датчик');await p.waitForTimeout(300);await p.screenshot({path:'dr-'+n+'-search.png',fullPage:true});
await p.click('#themeBtn');await p.waitForTimeout(200);await p.goto('http://localhost:8767/#oil');await p.waitForTimeout(300);await p.screenshot({path:'dr-'+n+'-oil-dark.png'});
await p.click('[data-start]');await p.waitForTimeout(300);console.log('doer',await p.evaluate(()=>!!document.querySelector('#doer:not([hidden]),.doer:not([hidden])')));
await c.close();}
console.log(errs);await b.close();})();
