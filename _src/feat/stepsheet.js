const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
for(const th of ['light','dark']){
const p=await b.newPage({viewport:{width:1100,height:900}});p.on('pageerror',e=>errs.push(e.message));await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.addInitScript(t=>{localStorage.setItem('garazh-cookie','1');localStorage.setItem('garazh-theme',t)},th);
await p.goto('http://localhost:8767/');await p.waitForTimeout(400);
await p.evaluate(()=>{setFam('kpg');const box=document.createElement('div');box.id='fs';box.style.cssText='display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:10px;background:var(--bg)';
let h='';for(const k of Object.keys(STEP_SVG)){const d=STEP_SVG[k];let s='';try{s=d[0]()}catch(e){s='ERR '+e}h+=`<div style="background:var(--surface);border:1px solid var(--line);padding:6px"><div style="font:11px monospace;color:var(--ink)">${k}</div><figure class="stepfig" style="margin:0">${s}</figure></div>`;}
h+=['oiltech','jumpT'].map(k=>`<div style="grid-column:span 2">${FIGS[k]()}</div>`).join('');
box.innerHTML=h;document.querySelector('#main').innerHTML='';document.querySelector('#main').appendChild(box);});
await p.addStyleTag({content:'.zoomhint{display:none!important} header,nav.bottom{display:none!important} .wrap{max-width:none!important}'});
await (await p.$('#fs')).screenshot({path:'st-'+th+'.png'});await p.close();}
console.log(errs);await b.close();})();
