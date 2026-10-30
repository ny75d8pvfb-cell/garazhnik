const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:900}});await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.addInitScript(()=>{localStorage.setItem('garazh-cookie','1')});
await p.goto('http://localhost:8767/#about');await p.waitForTimeout(400);
const out=process.argv[2]||'sheet';
await p.evaluate(()=>{setFam('kpg');const box=document.createElement('div');box.id='fs';box.style.cssText='display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:12px;background:var(--bg)';
let h='';for(const k of Object.keys(FIGS)){let s='';try{s=FIGS[k]()}catch(e){s='ERR'}h+=`<div><div style="font:12px monospace;color:var(--ink)">${k}</div>${s}</div>`;}
for(const k of Object.keys(STEP_SVG||{})){h+=`<div><div style="font:12px monospace;color:var(--ink)">step:${k}</div><figure class="stepfig">${STEP_SVG[k]}</figure></div>`;}
box.innerHTML=h;document.body.innerHTML='';document.body.appendChild(box);});
await p.addStyleTag({content:'.zoomhint{display:none!important}'});
await (await p.$('#fs')).screenshot({path:out+'.png'});await b.close();})();
