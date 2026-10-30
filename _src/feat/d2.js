const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const bad=[];
for(const th of ['light','dark'])for(const [n,w,h] of [['m',390,844],['d',1280,900]]){
const c=await b.newContext({viewport:{width:w,height:h}});await c.addInitScript((t)=>{localStorage.setItem('garazh-cookie','1');localStorage.setItem('garazh-theme',t)},th);
const p=await c.newPage();p.on('pageerror',e=>errs.push(e.message));await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
for(const f of ['classic','kpg','vesta']){await p.goto('http://localhost:8767/');await p.evaluate(f=>setFam(f),f);
for(const j of ['oil','air','cabin','plugs','coolant','brakes','levels','wheel','padsreplace','timing','fuel','bleed','battery','bulbs','altbelt','season','valves','stablink','hub']){
 await p.goto('http://localhost:8767/#'+j);await p.waitForTimeout(80);
 const r=await p.evaluate(()=>({ov:document.documentElement.scrollWidth-innerWidth,secs:document.querySelectorAll('.jh').length,steps:document.querySelectorAll('ol.steps li').length,txt:/\{\w+\}|undefined|null/.test(document.querySelector('#main').innerText)}));
 if(r.ov>0||r.txt||r.steps===0)bad.push([th,n,f,j,r]);}}
if(th==='light'&&n==='m'){await p.evaluate(()=>setFam('kpg'));await p.goto('http://localhost:8767/#padsreplace');await p.waitForTimeout(300);await p.screenshot({path:'pr-m.png',fullPage:true});}
await c.close();}
console.log(JSON.stringify(bad));console.log(errs);await b.close();})();
