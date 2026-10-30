const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.goto('http://localhost:8765/');await p.waitForTimeout(300);
const out={};
for(const [f,ids] of [['classic',['valvefig']],['kpg',['linkfig','hubfig']],['vesta',['tens']]]){
  const r=await p.evaluate(([f,ids])=>{setFam(f);const o={};for(const i of ids)o[i]=FIGS[i]();return o;},[f,ids]);Object.assign(out,r);}
const d=JSON.parse(fs.readFileSync('data.json','utf8'));
for(const k in out){d.figs[k]=out[k].replace(/<span class="zoomhint"[^>]*>.*?<\/span>/,'');}
fs.writeFileSync('data.json',JSON.stringify(d));console.log(Object.keys(out).map(k=>k+':'+d.figs[k].length));await b.close();})();
