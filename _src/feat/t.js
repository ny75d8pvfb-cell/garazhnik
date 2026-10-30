const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:390,height:844}});
await ctx.addInitScript(()=>{try{localStorage.setItem('garazh-cookie','1')}catch(e){}});
const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load/.test(m.text()))errs.push(m.text())});
await p.route(/mc\.yandex|fonts\.g/,r=>r.abort());
const setEng=async(f,e)=>{await p.evaluate(([f,e])=>{localStorage.setItem('garazh-fam',f);},[f,e]);};
await p.goto('http://localhost:8765/');await p.waitForTimeout(300);
for(const f of ['classic','niva','samara','ten','kpg','vesta']){
  await p.click('#famBtn');await p.click(`[data-fam="${f}"]`);await p.click('[data-famclose]');await p.waitForTimeout(150);
  const ids=await p.$$eval('[data-job]',a=>a.map(x=>x.dataset.job));
  console.log(f, ['valves','stablink','hub'].filter(x=>ids.includes(x)).join(','));
}
// classic valves
await p.click('#famBtn');await p.click('[data-fam="classic"]');await p.click('[data-famclose]');
await p.goto('http://localhost:8765/#valves');await p.waitForTimeout(300);await p.screenshot({path:'v-top.png'});
const fv=await p.$('.fig:not(.fig-sm)');await fv.screenshot({path:'v-fig.png'});
console.log('valves steps',await p.$$eval('ol.steps li',a=>a.length), 'undef', (await p.content()).includes('{valveGap}')||(await p.content()).includes('undefined'));
await p.click('#famBtn');await p.click('[data-fam="kpg"]');await p.click('[data-famclose]');
for(const j of ['stablink','hub','altbelt']){await p.goto('http://localhost:8765/#'+j);await p.waitForTimeout(300);
  const html=await p.content();console.log(j,'braces',/\{(hubNut|knuckle|linkTorque|wheelKey)\}/.test(await p.innerText('main')),'undef',(await p.innerText('main')).includes('undefined'));
  const f=await p.$('.fig:not(.fig-sm)');if(f)await f.screenshot({path:j+'-fig.png'});}
await p.click('#famBtn');await p.click('[data-fam="vesta"]');await p.click('[data-famclose]');
await p.goto('http://localhost:8765/#altbelt');await p.waitForTimeout(300);const t=await p.$('.fig.fig-sm');if(t)await t.screenshot({path:'tens.png'});
console.log('vesta altbelt steps',await p.$$eval('ol.steps li',a=>a.map(x=>x.innerText.slice(0,40))));
await p.goto('http://localhost:8765/#hub');await p.waitForTimeout(200);console.log('vesta hub text ok',!(await p.innerText('main')).match(/\{\w+\}|undefined/));
// samara hub
await p.click('#famBtn');await p.click('[data-fam="samara"]');await p.click('[data-famclose]');await p.goto('http://localhost:8765/#hub');await p.waitForTimeout(200);console.log('samara hub ok',!(await p.innerText('main')).match(/\{\w+\}|undefined/));
await p.goto('http://localhost:8765/#stablink');await p.waitForTimeout(200);console.log('samara notfor',!!(await p.$('.notfor')));
console.log(errs);await b.close();})();
