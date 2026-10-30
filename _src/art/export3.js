const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.goto('http://localhost:8767/');await p.waitForTimeout(400);
const MAP={belt:['beltT','kpg'],caliper:['caliperT','kpg'],dipstick:['dipT','kpg'],gap:['gapT','kpg'],hubfig:['hubfig','kpg'],jump:['jumpT','kpg'],linkfig:['linkfig','kpg'],marks:['marksT','kpg'],oilmap:['oiltech','kpg'],pads:['padsT','kpg'],plugread:['plugread','kpg'],star:['starT','kpg'],tank:['tankT','kpg'],tens:['tens','vesta'],valvefig:['valvefig','classic'],volt:['volt','kpg']};
const out=await p.evaluate((MAP)=>{const o={figs:{},steps:{}};for(const [k,[fn,f]] of Object.entries(MAP)){setFam(f);o.figs[k]=FIGS[fn]().replace(/<span class="zoomhint"[^>]*>.*?<\/span>/,'');}
 setFam('kpg');for(const k of Object.keys(STEP_SVG)){const d=STEP_SVG[k];o.steps[k]={svg:d[0](),cap:typeof d[1]==='function'?d[1]():d[1]};}
 o.css=[...document.querySelectorAll('head style')].map(s=>s.textContent).join('\n');return o;},MAP);
const d=JSON.parse(fs.readFileSync('data.json','utf8'));Object.assign(d.figs,out.figs);Object.assign(d.steps,out.steps);d.css=out.css;
fs.writeFileSync('data.json',JSON.stringify(d));console.log(Object.keys(out.figs).length,Object.keys(out.steps).length,out.css.length);await b.close();})();
