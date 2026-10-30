const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const views=['','oil','timing','garage','tools','parts','schedule','symptoms','numbers','about','brakes','plugs','valves','stablink','hub','altbelt'];
const out={};
for(const [n,vw] of [['m',{width:390,height:844}],['d',{width:1280,height:860}]]){
 const ctx=await b.newContext({viewport:vw,deviceScaleFactor:1});await ctx.addInitScript(()=>{try{localStorage.setItem('garazh-cookie','1')}catch(e){}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.route(/mc\.yandex/,r=>r.abort());
 for(const v of views){await p.goto('http://localhost:8767/#'+v);await p.waitForTimeout(400);
  await p.screenshot({path:`${n}-${v||'home'}.png`,fullPage:true});
  out[n+':'+v]=await p.evaluate(()=>{const r=[];const W=innerWidth;
   if(document.documentElement.scrollWidth>W)r.push('page overflow '+document.documentElement.scrollWidth);
   for(const el of document.querySelectorAll('body *')){const s=getComputedStyle(el);if(s.display==='none'||s.visibility==='hidden')continue;const b=el.getBoundingClientRect();if(!b.width)continue;
    if(b.right>W+1&&!el.closest('.table,.tbl,[style*=overflow]')){r.push('out '+el.tagName+'.'+el.className+' '+Math.round(b.right));}
    if((el.tagName==='BUTTON'||el.tagName==='A')&&b.height<32&&b.width<120&&el.textContent.trim().length<25)r.push('small tap '+el.tagName+'.'+el.className+' "'+el.textContent.trim().slice(0,20)+'" '+Math.round(b.width)+'x'+Math.round(b.height));
    if(el.scrollWidth>el.clientWidth+2&&['hidden','clip'].includes(s.overflowX)&&el.children.length===0)r.push('clipped '+el.tagName+'.'+el.className+' "'+el.textContent.trim().slice(0,30)+'"');}
   return [...new Set(r)].slice(0,15);});
 }
 out[n+':errors']=errs;await ctx.close();}
console.log(JSON.stringify(out,null,1));await b.close();})();
