// Выгружает из приложения цифры по семействам/моторам, регламент и каталог моделей в data.json (для статей).
// Запуск: из корня репо `python3 -m http.server 8765`, затем `node export4.js` в _src/art.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
await p.goto('http://localhost:8765/');await p.waitForTimeout(400);
const out=await p.evaluate(()=>{const o={fams:{},sched:{},models:[]};const keep=engSel[fam],keepFam=fam,keepGen=genSel;
 genSel=null;
 for(const k of Object.keys(FAM)){const engs=[];for(const e of (ENG[k]||[])){engSel[k]=e.id;const f=F(k);const v={};for(const [a,x] of Object.entries(f)) if(typeof x!=='object'&&typeof x!=='function') v[a]=x;engs.push({id:e.id,name:e.name,sub:e.sub||'',belt:!!e.belt,v});}
  o.fams[k]={name:FAM[k].name,models:FAM[k].models,engines:engs};
  o.sched[k]=SCHED.filter(s=>!(s.skip&&s.skip(k))).map(s=>({id:s.id,name:val(s.name,k),km:val(s.km,k)||null,years:val(s.years,k)||null,job:s.job}));}
 for(const m of MODELS) o.models.push({id:m.id,name:m.name,gens:m.gens.map(g=>({id:g.id,name:g.name,years:g.years,fam:g.fam,engs:g.engs,v:g.v||{},note:g.note||''}))});
 return o;});
const keys=new Set();for(const f of Object.values(out.fams))for(const e of f.engines)Object.keys(e.v).forEach(k=>keys.add(k));for(const f of Object.values(out.fams))for(const e of f.engines)for(const k of keys)if(!(k in e.v))e.v[k]=null;
const d=JSON.parse(fs.readFileSync('data.json','utf8'));d.fams=out.fams;d.sched=out.sched;d.models=out.models;
fs.writeFileSync('data.json',JSON.stringify(d));console.log(Object.keys(out.fams).length,'семейств',out.models.length,'моделей');await b.close();})();
