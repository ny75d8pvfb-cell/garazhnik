import sys, re
p = sys.argv[1]; s = open(p).read()
def R(o, n, cnt=1):
    global s
    assert s.count(o) == cnt, (s.count(o), o[:90]); s = s.replace(o, n)

# ---------- 1. Новая работа «Замена масла» в формате руководства ----------
m = re.search(r'  \{id:"oil",title:"Замена масла и масляного фильтра"[\s\S]*?warn:"Слитое масло нельзя выливать на землю или в канализацию\."\},\n', s)
assert m
OIL = r'''  {id:"oil",title:"Замена масла и масляного фильтра",lvl:1,diff:2,time:"40–60 мин",
   desc:"Главная работа ТО. Понадобится яма, эстакада или подставки.",
   plate:["oil","engine"],
   tools:["wrenches","sockets","filterkey","torque","Ёмкость для слива","Воронка","Перчатки"],
   cat:{kpg:[["Масляный фильтр, оригинал АвтоВАЗ","21080-1012005"],["Аналог по размерам","MANN W 914/2"]],samara:[["Масляный фильтр, оригинал АвтоВАЗ","21080-1012005"],["Аналог по размерам","MANN W 914/2"]],ten:[["Масляный фильтр, оригинал АвтоВАЗ","21080-1012005"],["Аналог по размерам","MANN W 914/2"]]},
   sections:[
    {h:"Подготовка",steps:[
     {t:"Купи масло нужного объёма ({oil}), новый масляный фильтр и уплотнительную шайбу сливной пробки."},
     {t:"Поставь машину ровно на яму, эстакаду или подставки. Прогрей двигатель 5 минут — тёплое масло стекает лучше — и заглуши.",att:"Под машиной не касайся приёмной трубы глушителя — она горячая."},
     {t:"Открой маслозаливную горловину на крышке головки блока (1 на рис. 1) — так масло сольётся быстрее."}]},
    {h:"Слив масла и снятие фильтра",steps:[
     {t:"Поставь ёмкость под поддон и выкрути сливную пробку (4 на рис. 1).",key:"ключ под сливную пробку",att:"Масло горячее — работай в перчатках."},
     {t:"Нива: не перепутай пробку двигателя со сливной пробкой переднего моста — она рядом.",only:["niva"]},
     {t:"Дай маслу стечь 10–15 минут."},
     {t:"Сними старый масляный фильтр (3 на рис. 1), подставив под него ветошь.",key:"съёмник фильтра"}]},
    {h:"Установка",steps:[
     {t:"Протри посадочную площадку фильтра на блоке. Старое резиновое кольцо не должно остаться на блоке."},
     {t:"Сверь резьбу нового фильтра со штуцером: фильтр с другой резьбой накрутится, но под давлением его сорвёт."},
     {t:"Смажь резиновое кольцо нового фильтра свежим маслом и закрути фильтр рукой: после касания кольцом — ещё на 3/4 оборота.",key:"руками"},
     {t:"Вкрути сливную пробку с новой шайбой. Не перетягивай: резьба в поддоне мягкая.",key:"ключ под сливную пробку"},
     {t:"Залей масло через горловину, немного не доливая до полного объёма ({oil}).",key:"воронка"}]},
    {h:"Проверка",steps:[
     {t:"Заведи мотор на 1–2 минуты: лампа давления масла должна погаснуть за пару секунд.",warnx:"Лампа не гаснет — сразу заглуши мотор и ищи причину."},
     {t:"Заглуши, через 5 минут проверь уровень щупом (2 на рис. 1) и долей до середины между MIN и MAX."},
     {t:"Осмотри пробку и фильтр: подтёков быть не должно. Через 50–100 км проверь ещё раз."},
     {t:"Отработку слей в канистру и сдай в пункт приёма."}]}],
   mistakes:["Перетянули сливную пробку и сорвали резьбу в поддоне.","Не сменили шайбу пробки — подтекает.","Старое кольцо фильтра осталось на блоке — новый фильтр не уплотнится, масло выдавит.","Сразу залили полный объём и перелили выше MAX.","Нива: слили масло из переднего моста вместо двигателя."],
   src:[["Руководство по эксплуатации АвтоВАЗа — объёмы и интервалы",""],["«За рулём»: замена масла — советы и типичные ошибки","https://www.zr.ru/content/articles/979926-zamena-masla/"]],
   warn:"Слитое масло нельзя выливать на землю или в канализацию."},
'''
s = s[:m.start()] + OIL + s[m.end():]
R('const JOB_GROUPS = [', 'JOBS.forEach(j => { if(j.sections) j.steps = j.sections.flatMap(x => x.steps); });\nconst JOB_GROUPS = [')

# ---------- 2. Страница работы: крошки, паспорт, разделы ----------
old_start = s.index('function renderJob(j){')
old_end = s.index('function renderVideos(target, compact){')
NEWJOB = r'''function jobGroup(id){ const g = JOB_GROUPS.find(([,ids]) => ids.includes(id)); return g ? g[0] : "Работы"; }
const diffBar = d => `<span class="diff" aria-label="Сложность ${d} из 5">${[1,2,3,4,5].map(i => `<i class="${i <= d ? "on" : ""}"></i>`).join("")}</span><b>${d} из 5</b>`;
function stepHtml(j, s, i){
  const key = s.key ? `<span class="keytag">${esc(s.key)}</span>` : "";
  const att = s.att ? `<p class="callout att"><b>Внимание.</b> ${esc(s.att)}</p>` : "";
  const wx = s.warnx ? `<p class="callout dang"><b>Предупреждение.</b> ${esc(s.warnx)}</p>` : "";
  return `<li><div>${fill(s.t || s)}${key}${att}${wx}${stepFig(j.id, i)}${photoStrip(j.id, String(i), "", true)}</div></li>`;
}
function renderJob(j){
  const f = F();
  const eng = String(f.engName || f.models).replace(/\s*\(.*\)\s*$/, "");
  const diff = j.diff || (j.lvl === 1 ? 2 : 4);
  const toolNames = j.tools.map(t => { const T = TOOLS.find(x => x.id === t);
    return T ? `<button type="button" data-tool="${T.id}">${esc(T.name)}</button>` : `<span>${esc(t)}</span>`; }).join("");
  const parts = (JOB_PARTS[j.id] || []).map(p => `<button type="button" class="part" data-part="${p}">${esc(PARTS.find(x => x.id === p).name)}</button>`).join("");
  const cat = j.cat && j.cat[fam] ? `<table class="cattbl"><tbody>${j.cat[fam].map(([a,b]) => `<tr><td>${esc(a)}</td><td class="mono">${esc(b)}</td></tr>`).join("")}</tbody></table>` : "";
  const nums = j.plate.filter(k => f[k]).map(k => `<div><dt>${PLATE_LABEL[k]}</dt><dd class="${TEXT_FIELDS.has(k)?"txt":""}">${esc(f[k])}</dd></div>`).join("");
  let n = 0; const ok = s => stepOk(s);
  const idx = new Map(); j.steps.forEach((s,i) => idx.set(s, i));
  const sec = j.sections ? j.sections.map(x => { const st = x.steps.filter(ok); return st.length ? `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>${esc(x.h)}</h3><ol class="steps">${st.map(s => stepHtml(j, s, idx.get(s))).join("")}</ol></section>` : ""; }).join("")
    : `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>Порядок работы</h3><ol class="steps">${j.steps.map((s,i) => [s,i]).filter(([s]) => ok(s)).map(([s,i]) => stepHtml(j, s, i)).join("")}</ol></section>`;
  const figs = (FIG_JOBS[j.id] || []).filter(id => !(j.id === "cabin" && fam === "classic") && !(id === "fuelf" && F().tankFilter)).map(id => FIGS[id]()).filter(Boolean);
  const figHtml = figs.length ? `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>Схемы</h3>${figs.map((h,i) => `<div class="figwrap"><div class="fignum">Рис. ${i+1}</div>${h}</div>`).join("")}</section>` : "";
  const mist = j.mistakes ? `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>Типичные ошибки</h3><ul class="mist">${j.mistakes.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : "";
  const src = j.src ? `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>Источники</h3><ul class="srcs">${j.src.map(([t,u]) => `<li>${u ? `<a href="${u}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>` : esc(t)}</li>`).join("")}</ul><p class="approx-note">Нашёл ошибку — напиши в Telegram-канал @garage4to.</p></section>` : "";
  const logBtn = JOB_LOG[j.id] ? `<section class="blk"><button type="button" class="logbtn" data-logjob="${JOB_LOG[j.id]}">${icon("garage")}<span><b>Сделал? Запиши в «Мой гараж»</b><small>Дата, пробег и что использовал — Гаражник посчитает следующую замену</small></span></button></section>` : "";
  return `<div class="detail job">
    <nav class="jcrumbs" aria-label="Навигация"><button type="button" data-goto="to">Работы</button><span>›</span><span>${esc(jobGroup(j.id))}</span></nav>
    ${j.fams && !j.fams.includes(fam) ? `<div class="warn notfor"><p>Эта работа для: ${esc(j.fams.map(k => FAM[k].name).join(", "))}. У выбранной машины (${esc(F().name)}) устроено иначе — выбери другую в «Моя машина».</p></div>` : ""}
    <h2 class="jtitle">${esc(j.title)}</h2>
    <p class="lead">${esc(j.desc)}</p>
    <div class="passport">
      <div class="pp-row pp-top">
        <div><span class="pp-k">Сложность</span><span class="pp-v">${diffBar(diff)}</span></div>
        <div><span class="pp-k">Время</span><span class="pp-v"><b>${esc(j.time)}</b></span></div>
        <div><span class="pp-k">Для машины</span><span class="pp-v"><b>${esc(f.name)}</b> · ${esc(eng)}</span></div>
      </div>
      ${nums ? `<div class="pp-row"><span class="pp-k">Цифры для твоей машины</span><dl class="pp-nums">${nums}</dl></div>` : ""}
      <div class="pp-row"><span class="pp-k">Инструмент</span><div class="tools">${toolNames}</div></div>
      ${parts || cat ? `<div class="pp-row"><span class="pp-k">Запчасти</span>${parts ? `<div class="tools">${parts}</div>` : ""}${cat}</div>` : ""}
    </div>
    <button type="button" class="startbtn" data-start="${j.id}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><span><b>Начать работу</b><small>По одному шагу, крупно, экран не гаснет</small></span></button>
    ${renderChecks(j.id)}
    ${sec}
    ${figHtml}
    ${j.warn ? `<p class="callout dang"><b>Предупреждение.</b> ${esc(j.warn)}</p>` : ""}
    ${mist}
    ${src}
    <section class="blk vidblk" id="vidblk">${renderVideos(j.id)}</section>
    ${logBtn}
  </div>`;
}

'''
s = s[:old_start] + NEWJOB + s[old_end:]

# ---------- 3. Техническая схема масляной системы ----------
R('const ZOOM_HINT = ', r'''function figOilTech(){
  const call = (x, y, n, tx, ty) => `<path d="M${x} ${y} L${tx} ${ty}" class="tl-lead"/><circle cx="${tx}" cy="${ty}" r="11" class="tl-num"/><text x="${tx}" y="${ty+4}" class="tl-numt" text-anchor="middle">${n}</text>`;
  return fig("0 0 560 300", `
    <rect x="150" y="70" width="230" height="120" rx="4" class="tl-body"/>
    <rect x="166" y="50" width="198" height="22" rx="3" class="tl-body"/>
    <path d="M150 190 h230 l-26 50 h-178 z" class="tl-body"/>
    <path d="M176 240 v6 M200 240 v6" class="tl-hid"/>
    <rect x="236" y="244" width="16" height="9" class="tl-part"/>
    <rect x="300" y="36" width="34" height="14" rx="2" class="tl-part"/>
    <path d="M196 50 V20" class="tl-part-l"/><circle cx="196" cy="16" r="5" class="tl-part"/>
    <rect x="380" y="112" width="34" height="56" rx="5" class="tl-part"/>
    <path d="M150 214 h230" class="tl-hid"/><text x="265" y="230" class="tl-s" text-anchor="middle">уровень масла</text>
    ${call(317, 43, 1, 450, 40)}${call(196, 18, 2, 100, 30)}${call(414, 140, 3, 470, 140)}${call(244, 253, 4, 160, 280)}${call(330, 228, 5, 450, 260)}
    <text x="265" y="132" class="tl-s" text-anchor="middle">двигатель</text>`,
    `<ol class="legend"><li>Маслозаливная горловина</li><li>Щуп уровня масла</li><li>Масляный фильтр</li><li>Сливная пробка</li><li>Поддон картера</li></ol>`,
    "Схема системы смазки: где заливать, где сливать");
}
const ZOOM_HINT = ''')
R('const FIGS = {', 'const FIGS = {oiltech:figOilTech, ')
R('const FIG_JOBS = {oil:["oilmap","dipstick"]', 'const FIG_JOBS = {oil:["oiltech","dipstick"]')

# ---------- 4. Общий поиск на главной ----------
R('''  return searchBox("Найти работу: масло, свечи, ГРМ…") + features +''',
'''  const other = query ? globalHits() : "";
  return searchBox("Поиск по сайту: работа, поломка, код ошибки, запчасть…") + features + other +''')
R('function renderList(){', r'''function globalHits(){
  const q = query.trim(); if(q.length < 2) return "";
  const out = [];
  SYMPTOMS.filter(x => match(x.t, x.c.join(" "))).slice(0,4).forEach(x => out.push(["Поломки · симптом", x.t, "symptoms"]));
  LAMPS.filter(x => match(x.name, x.means)).slice(0,3).forEach(x => out.push(["Поломки · лампа", x.name, "lamps"]));
  CODE_GROUPS.flatMap(g => g[1]).filter(c => match(c[0], c[1])).slice(0,4).forEach(c => out.push(["Код ошибки", c[0] + " — " + c[1], "codes"]));
  PARTS.filter(x => match(x.name, x.prem.flat().join(" "), x.eco.flat().join(" "))).slice(0,3).forEach(x => out.push(["Запчасти", x.name, "parts"]));
  TOOLS.filter(x => match(x.name, x.what)).slice(0,3).forEach(x => out.push(["Инструмент", x.name, "tools"]));
  return out.length ? `<section class="group ghits"><h2 class="gh">В других разделах<span>${out.length}</span></h2><div class="hits">${out.map(([k,t,to]) => `<button type="button" class="hit" data-gs="${to}"><small>${esc(k)}</small><b>${esc(t)}</b></button>`).join("")}</div></section>` : "";
}
function renderList(){''')
R('''  else if(d.goto){ query = ""; go(d.goto); }''', '''  else if(d.goto){ query = ""; go(d.goto); }
  else if(d.gs){ go(d.gs); }''')
# убрать дубль: Telegram-карточку с QR на главной (ссылка остаётся в шапке и внизу)
R('(query ? "" : tgCard() + aboutLinks());', '(query ? "" : aboutLinks());')

# ---------- 5. Тема: светлая по умолчанию + переключатель ----------
R('<a class="tg" href="https://t.me/garage4to"', '<button type="button" class="tg themebtn" id="themeBtn" aria-label="Сменить тему"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><span>Тема</span></button>\n      <a class="tg" href="https://t.me/garage4to"')
R('<style id="strict">', '''<script>(function(){var t="light";try{t=localStorage.getItem("garazh-theme")||"light"}catch(e){}document.documentElement.setAttribute("data-theme",t);})();</script>
<style id="strict">''')
R('''  else if(b.hasAttribute("data-print")){ window.print(); }''', '''  else if(b.hasAttribute("data-print")){ window.print(); }
  else if(b.id === "themeBtn"){ const t = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light"; document.documentElement.setAttribute("data-theme", t); try{ localStorage.setItem("garazh-theme", t); }catch(e){} document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "light" ? "#F4F3EF" : "#101316"); }''')

CALM = r'''
/* ===== Строгий спокойный стиль (обе темы) ===== */
header::after{display:none}
body{background-image:none}
.brand h1{text-transform:none;letter-spacing:.01em}
.brand .sub{text-transform:none;letter-spacing:.02em;font:500 12.5px var(--f-body);color:var(--muted)}
.tabs button,.fambtn,.back,.btn,nav.bottom button,.fseg button,.gh,.detail h2,.dhead h2,.startbtn b,.entry h3,.feature b,.logbtn b,.artstrip b,.tg{text-transform:none;letter-spacing:.01em}
.tabs button{font:500 15.5px var(--f-body)}
nav.bottom button{font:500 11px var(--f-body)}
.fseg button{font:500 14px var(--f-body)}
.gh{font:600 18px/1.2 var(--f-body);border-left:0;padding-left:0}
.detail h2.gh{font:600 18px/1.2 var(--f-body);text-transform:none;letter-spacing:0}
.tg{font:500 13px var(--f-body)}
.feature,.logbtn{border:1px solid var(--line-2);border-top:1px solid var(--line-2);border-left:1px solid var(--line-2)}
.feature .ico svg,.logbtn .ico svg{stroke:var(--amber)}
.card:hover{box-shadow:none;border-color:var(--amber)}
.plate{border-left:1px solid var(--line-2)}
.pill.lvl1,.pill.lvl2{color:var(--muted)}
/* страница работы — как в руководстве */
.jcrumbs{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:13.5px;color:var(--dim);margin-bottom:10px}
.jcrumbs button{border:0;background:none;padding:4px 0;color:var(--amber);cursor:pointer;font:inherit;font-weight:500}
.jtitle{font:700 28px/1.15 var(--f-head,var(--f-body))!important;margin:0 0 8px!important;letter-spacing:.005em!important}
.job .lead{margin-bottom:16px}
.passport{border:1px solid var(--line-2);border-radius:var(--r);background:var(--surface);margin-bottom:16px}
.pp-row{padding:12px 14px;border-top:1px solid var(--line)}
.pp-row:first-child{border-top:0}
.pp-top{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px 18px}
.pp-k{display:block;font:500 11px var(--f-mono);text-transform:uppercase;letter-spacing:.07em;color:var(--dim);margin-bottom:5px}
.pp-v{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:14.5px}
.diff{display:inline-flex;gap:3px}
.diff i{width:14px;height:8px;border-radius:1px;background:var(--line-2)}
.diff i.on{background:var(--amber)}
.pp-nums{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px 18px;margin:0}
.pp-nums dt{font-size:12.5px;color:var(--muted)}
.pp-nums dd{margin:2px 0 0;font:500 16px/1.3 var(--f-mono);color:var(--amber)}
.pp-nums dd.txt{font:500 14px/1.45 var(--f-body);color:var(--ink)}
.cattbl{width:100%;border-collapse:collapse;margin-top:8px;font-size:13.5px}
.cattbl td{padding:6px 0;border-top:1px solid var(--line)}
.cattbl td.mono{font:500 13.5px var(--f-mono);text-align:right;color:var(--ink)}
.jsec{margin-top:22px}
.jh{display:flex;align-items:center;gap:10px;font:600 19px/1.25 var(--f-body);margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid var(--ink)}
.jh span{display:inline-grid;place-items:center;min-width:26px;height:26px;padding:0 6px;background:var(--ink);color:var(--bg);font:600 13px var(--f-mono);border-radius:2px}
.keytag{display:inline-block;margin-left:8px;font:500 11.5px var(--f-mono);color:var(--muted);border:1px solid var(--line-2);border-radius:2px;padding:1px 6px;vertical-align:1px;white-space:nowrap}
.callout{margin:8px 0 0;padding:8px 12px;font-size:14px;border-radius:2px;border-left:3px solid}
.callout.att{background:var(--amber-soft);border-color:var(--amber)}
.callout.dang{background:color-mix(in srgb,var(--warn) 10%,var(--surface));border-color:var(--warn)}
.callout b{font-weight:700}
.job > .callout{margin-top:18px}
.figwrap{margin-bottom:14px}
.fignum{font:500 11.5px var(--f-mono);text-transform:uppercase;letter-spacing:.07em;color:var(--dim);margin-bottom:5px}
.mist{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px}
.srcs{margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px;font-size:14px}
.legend{margin:8px 0 0;padding-left:20px;text-align:left;columns:2;column-gap:24px;font-size:13px;color:var(--ink)}
.tl-body{fill:none;stroke:var(--ink);stroke-width:1.6}
.tl-part{fill:var(--surface);stroke:var(--ink);stroke-width:1.6}
.tl-part-l{stroke:var(--ink);stroke-width:1.6}
.tl-hid{stroke:var(--muted);stroke-width:1.2;stroke-dasharray:5 4;fill:none}
.tl-lead{stroke:var(--ink);stroke-width:1}
.tl-num{fill:var(--surface);stroke:var(--ink);stroke-width:1.4}
.tl-numt{fill:var(--ink);font:600 12px var(--f-mono)}
.tl-s{fill:var(--muted);font:500 12px var(--f-body)}
.ghits .hits{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}
.hit{display:flex;flex-direction:column;gap:2px;text-align:left;border:1px solid var(--line-2);background:var(--surface);border-radius:var(--r);padding:10px 12px;cursor:pointer;color:var(--ink)}
.hit:hover{border-color:var(--amber)}
.hit small{font:500 11px var(--f-mono);text-transform:uppercase;letter-spacing:.06em;color:var(--dim)}
.hit b{font-weight:500;font-size:14.5px}
@media (max-width:640px){.jtitle{font-size:24px!important}.legend{columns:1}.tabs button{font-size:14.5px}}

/* ===== Светлая тема «как руководство» ===== */
:root[data-theme="light"]{
  color-scheme:light;
  --bg:#F4F3EF; --peg:#E9E7E1; --surface:#FFFFFF; --raised:#F7F6F2; --sunk:#ECEAE4; --line:#E3E0D8; --line-2:#CDC9BE;
  --ink:#1A1C1F; --muted:#585D64; --dim:#80858C;
  --blue:#E9E7E1; --blue-ink:#1F4E8C; --blue-soft:#EEF2F8;
  --amber:#A35C00; --amber-ink:#FFFFFF; --amber-soft:#FBF2E2;
  --warn:#B4380F; --ok:#2E7A3A;
}
:root[data-theme="light"] html,:root[data-theme="light"] body{background:var(--bg)}
:root[data-theme="light"] header,:root[data-theme="light"] nav.bottom{background:var(--surface);border-bottom:1px solid var(--line-2)}
:root[data-theme="light"] nav.bottom{border-top:1px solid var(--line-2)}
:root[data-theme="light"] body::before{background:var(--surface)}
:root[data-theme="light"] .logo{background:var(--ink)}
:root[data-theme="light"] .logo svg{stroke:#fff}
:root[data-theme="light"] .startbtn{background:var(--ink);color:#fff;box-shadow:none}
:root[data-theme="light"] .startbtn svg{fill:#fff}
:root[data-theme="light"] .startbtn small{color:#d6d6d6}
:root[data-theme="light"] .btn{background:var(--ink);color:#fff}
:root[data-theme="light"] .fambtn{color:var(--ink);border-color:var(--ink)}
:root[data-theme="light"] .fambtn svg{stroke:var(--ink)}
:root[data-theme="light"] .tabs button[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--ink)}
:root[data-theme="light"] nav.bottom button[aria-selected="true"]{color:var(--ink);box-shadow:inset 0 3px 0 var(--ink)}
:root[data-theme="light"] .fseg button[aria-selected="true"]{color:var(--ink);box-shadow:inset 0 -3px 0 var(--ink);background:var(--raised)}
:root[data-theme="light"] .ico{border-color:var(--line-2)}
:root[data-theme="light"] .ico svg{stroke:var(--ink)}
:root[data-theme="light"] .feature .ico svg,:root[data-theme="light"] .logbtn .ico svg,:root[data-theme="light"] .artstrip .ico svg{stroke:var(--amber)}
:root[data-theme="light"] .card,:root[data-theme="light"] .entry,:root[data-theme="light"] .feature,:root[data-theme="light"] .artstrip,:root[data-theme="light"] .logbtn{box-shadow:0 1px 0 rgba(0,0,0,.03)}
:root[data-theme="light"] .fig{background:var(--surface)}
:root[data-theme="light"] .search input{background:var(--surface)}
:root[data-theme="light"] .cookiebar{background:var(--surface);box-shadow:0 10px 30px rgba(0,0,0,.15)}
:root[data-theme="light"] .tools button{background:var(--surface);color:var(--ink)}
:root[data-theme="light"] .tools button.part{color:var(--amber)}
:root[data-theme="light"] .pill{background:var(--raised)}
:root[data-theme="light"] ol.steps li::before{background:var(--surface);color:var(--ink);border-color:var(--ink)}
:root[data-theme="light"] .warn{background:#FDF0EB}
:root[data-theme="light"] .tip{background:var(--amber-soft)}
:root[data-theme="light"] .lampc-ico,:root[data-theme="light"] .lamp-ico{background:#16181b}
:root[data-theme="light"] .zoomov{background:var(--bg)}
'''
R('</style>\n</head>', CALM + '</style>\n</head>')

R('  oil:{3:"drain",4:"filterOff",5:"filterOn",7:"pour"},', '  oil:{3:"drain",6:"filterOff",9:"filterOn",11:"pour"},')
# в превью-артефакте нет базы данных — работаем как сайт
R('if(!window.claude?.use){', 'if(true){')
open(p, 'w').write(s)
print("ok")
