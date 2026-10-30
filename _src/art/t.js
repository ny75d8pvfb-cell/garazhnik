const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const D='/tmp/claude-0/-home-claude/9d1a6a5e-378a-5b4d-97e7-14d4ea8a5fe0/scratchpad/art/shots/';fs.mkdirSync(D,{recursive:true});
const pages=['stati/index.html',...fs.readdirSync('/home/claude/garazhnik/stati').filter(f=>f.endsWith('.html')&&f!='index.html').map(f=>'stati/'+f)];
const bad=[];const errs=[];
for(const vw of [{width:390,height:844},{width:1280,height:900}]){const ctx=await b.newContext({viewport:vw});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));
await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
for(const u of pages){await p.goto('http://localhost:8765/'+u);const o=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0)bad.push(vw.width+' '+u+' overflow '+o);
const links=await p.$$eval('a[href]',as=>as.map(a=>a.getAttribute('href')));
for(const l of links){if(l.startsWith('http')||l.startsWith('#'))continue;const path=l.split('#')[0];const full=new URL(path||'.', 'http://localhost:8765/'+u).pathname;const f='/home/claude/garazhnik'+full+(full.endsWith('/')?'index.html':'');if(!fs.existsSync(f))bad.push(u+' broken '+l);}
const ids=await p.$$eval('.toc a',as=>as.map(a=>a.getAttribute('href').slice(1)));for(const i of ids)if(!(await p.$('#'+i)))bad.push(u+' toc '+i);
}
await p.goto('http://localhost:8765/stati/to-po-reglamentu.html');await p.screenshot({path:D+vw.width+'-art.png',fullPage:false});
await p.goto('http://localhost:8765/stati/zamena-svechey.html');await p.screenshot({path:D+vw.width+'-svechi.png',fullPage:true});
await p.goto('http://localhost:8765/stati/');await p.screenshot({path:D+vw.width+'-index.png'});
await p.goto('http://localhost:8765/');await p.waitForTimeout(500);await p.screenshot({path:D+vw.width+'-home.png'});const o=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0)bad.push('home overflow');
await ctx.close();}
console.log(JSON.stringify({bad:[...new Set(bad)],errs:[...new Set(errs)]},null,1));await b.close();})();
