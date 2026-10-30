const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const th of ['light','dark']){
const p=await b.newPage({viewport:{width:1100,height:900}});p.on('pageerror',e=>errs.push(e.message));await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.addInitScript((t)=>{localStorage.setItem('garazh-cookie','1');localStorage.setItem('garazh-theme',t)},th);
await p.goto('http://localhost:8767/#about');await p.waitForTimeout(400);
await p.evaluate(()=>{setFam('kpg');const ks=['caliperT','marksT','beltT','gapT','padsT','tankT','dipT','airT','cabinT','fuelT','hoseT','oiltech'];const box=document.createElement('div');box.id='fs';box.style.cssText='display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:12px;background:var(--bg)';
box.innerHTML=ks.map(k=>{let s='';try{s=FIGS[k]()}catch(e){s='ERR '+e}return `<div><div style="font:12px monospace;color:var(--ink)">${k}</div>${s}</div>`}).join('');document.querySelector('#main').innerHTML='';document.querySelector('#main').appendChild(box);});
await p.addStyleTag({content:'.zoomhint{display:none!important} header,nav.bottom{display:none!important}'});
await (await p.$('#fs')).screenshot({path:'tf-'+th+'.png'});await p.close();}
console.log(errs);await b.close();})();
