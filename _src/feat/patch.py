import sys, re
D = "/tmp/claude-0/-home-claude/9d1a6a5e-378a-5b4d-97e7-14d4ea8a5fe0/scratchpad/feat/"
p = sys.argv[1]; s = open(p).read()
def R(o, n, cnt=1):
    global s
    assert s.count(o) == cnt, (s.count(o), o[:80]); s = s.replace(o, n)

# 1. новые работы — в конец JOBS (после «season»)
jobs = open(D + "jobs.js").read()
m = re.search(r'(\{id:"season",[\s\S]*?warn:""\})\n\];', s)
assert m
s = s[:m.end(1)] + "\n" + jobs.rstrip() + "\n];" + s[m.end():]

# 1a. ремень генератора: Веста и Гранта с кондиционером
R('''    "Замена: ослабь натяжение (гайку генератора или натяжной ролик) и сними старый ремень.",
    "Надень новый по той же схеме на все шкивы. Проверь, что ручьи ремня точно легли в канавки.",
    "Натяни, затяни крепления, заведи мотор: ремень не должен свистеть."],''',
'''    {t:"Гранта и Калина-2 с кондиционером: ремень проходит сквозь правую опору двигателя. Для замены подопри мотор снизу (через брусок под поддон), сними правое колесо, подкрылок и опору. Натяжение — винтом натяжителя, прогиб 6–7 мм между шкивами двигателя и компрессора.",only:["kpg"]},
    {t:"Замена: ослабь натяжение (гайку генератора или натяжной ролик) и сними старый ремень.",not:["vesta"]},
    {t:"Веста: доступ к ролику — через подкрылок, частично отогни или сними его. Ослабь гайку натяжного ролика ключом на 13, поверни ролик ключом Torx T55, отпуская ремень, и сними ремень.",only:["vesta"]},
    "Надень новый по той же схеме на все шкивы. Проверь, что ручьи ремня точно легли в канавки.",
    {t:"Натяни, затяни крепления, заведи мотор: ремень не должен свистеть.",not:["vesta"]},
    {t:"Поверни ролик ключом T55, натягивая ремень, и затяни гайку ролика: 30–36 Н·м. Заведи мотор — ремень не должен свистеть.",only:["vesta"]}],''')
R('    alt:"Автоматический натяжной ролик"}', '    alt:"Эксцентриковый натяжной ролик: гайка на 13, ролик поворачивают ключом Torx T55"}')

# 2. цифры для новых работ по семействам
R('for(const k in FAM_BASE) Object.assign(FAM[k], FAM_BASE[k]);',
'''for(const k in FAM_BASE) Object.assign(FAM[k], FAM_BASE[k]);
const FAM_SUSP = {
  classic:{valveGap:"0,15 мм на холодном моторе, впуск и выпуск"},
  niva:{valveGap:"0,15 мм на холодном моторе (если нет гидроопор)"},
  samara:{hubNut:"225–247 Н·м, головка на 30"},
  ten:{hubNut:"225–247 Н·м, головка на 30"},
  kpg:{hubNut:"225–247 Н·м, головка на 30",linkTorque:"43–52 Н·м (гайка стойки к рычагу)",knuckle:"78–96 Н·м (гайки болтов стойки к кулаку)"},
  vesta:{hubNut:"Веста и Иксрей: 238–322 Н·м; Ларгус — по руководству",linkTorque:"53–71 Н·м (гайки пальцев стойки)",knuckle:"90–120 Н·м"}
};
for(const k in FAM_SUSP) Object.assign(FAM[k], FAM_SUSP[k]);''')
R('alt:"Натяжение ремня генератора"};', 'alt:"Натяжение ремня генератора",valveGap:"Зазор клапанов",linkTorque:"Гайки стойки стабилизатора",hubNut:"Гайка ступицы",knuckle:"Стойка к кулаку"};')
R('const TEXT_FIELDS = new Set(["engine","air","cabin","ign","brakes","grm","fuel","bleed","alt"]);',
  'const TEXT_FIELDS = new Set(["engine","air","cabin","ign","brakes","grm","fuel","bleed","alt","valveGap","linkTorque","hubNut","knuckle"]);')
# табличка цифр — без пустых полей
R('    j.plate.map(k => `<div><dt>${PLATE_LABEL[k]}</dt>', '    j.plate.filter(k => f[k]).map(k => `<div><dt>${PLATE_LABEL[k]}</dt>')
R('<dl>${j.plate.map(k => `<div><dt>${PLATE_LABEL[k]}</dt><dd>${esc(f[k])}</dd></div>`).join("")}</dl></details>',
  '<dl>${j.plate.filter(k => f[k]).map(k => `<div><dt>${PLATE_LABEL[k]}</dt><dd>${esc(f[k])}</dd></div>`).join("")}</dl></details>')

# 3. группы и иконки
R('["Двигатель",["plugs","altbelt","timing","coolant"]],["Тормоза",["brakes","padsreplace","bleed"]],',
  '["Двигатель",["plugs","altbelt","timing","coolant","valves"]],["Тормоза",["brakes","padsreplace","bleed"]],["Подвеска",["stablink","hub"]],')
R('const ICON_PATHS = {', '''const ICON_PATHS = {
  valves:'<path d="M12 3v11"/><path d="M8 14h8l-1.5 4h-5z"/><path d="M9 6.5h6M9 9.5h6"/><path d="M6 21h12"/>',
  stablink:'<circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M7.7 7.7l8.6 8.6"/><path d="M2.5 6h1.1M20.4 18h1.1"/>',
  hub:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5"/>',''')

# 4. список работ: только подходящие для выбранной машины
R('const jobs = JOBS.filter(j => match(', 'const jobs = JOBS.filter(j => (!j.fams || j.fams.includes(fam)) && match(')
# страница работы: предупреждение, если работа не для этой машины
R('''    ${backBtn("to","Все работы")}
    <div class="dhead">${icon(j.id)}''', '''    ${backBtn("to","Все работы")}
    ${j.fams && !j.fams.includes(fam) ? `<div class="warn notfor"><p>Эта работа для: ${esc(j.fams.map(k => FAM[k].name).join(", "))}. У выбранной машины (${esc(F().name)}) устроено иначе — выбери другую в «Моя машина».</p></div>` : ""}
    <div class="dhead">${icon(j.id)}''')

# 5. схемы
figs = open(D + "figs.js").read()
R('const ZOOM_HINT = ', figs + 'const ZOOM_HINT = ')
R('const FIGS = {plugread:figPlugs,', 'const FIGS = {valvefig:figValves, linkfig:figLink, hubfig:figHub, tens:figTens, plugread:figPlugs,')
R('const FIG_TITLE = {', 'const FIG_TITLE = {valvefig:"Схема: регулировка клапанов", linkfig:"Схема: стойка стабилизатора", hubfig:"Схема: ступичный подшипник", tens:"Схема: натяжной ролик Весты", ')
R('altbelt:["belt"],wheel:["star"]};', 'altbelt:["belt","tens"],wheel:["star"],valves:["valvefig"],stablink:["linkfig"],hub:["hubfig"]};')

# 6. запчасти для новых работ
R('PARTS.push(', '''PARTS.push(
  {id:"stablink",name:"Стойки стабилизатора",
   params:(f,k) => [["Где стоят", k === "kpg" ? "Соединяют стабилизатор с нижними рычагами" : k === "vesta" ? "Соединяют стабилизатор с амортизаторными стойками" : "На твоей машине стабилизатор крепится к рычагам через резиновые втулки, отдельных стоек нет"]].concat(f.linkTorque ? [["Момент затяжки", f.linkTorque]] : []),
   prem:[["Lemförder","ZF, Германия"],["CTR","Корея"]],
   eco:[["Оригинал Лада",""],["SS20",""],["Trialli",""]],
   tip:"Меняй стойки парой — левую и правую. Пыльник порван — стойка скоро застучит, даже если люфта пока нет."},
  {id:"hubbearing",name:"Передний ступичный подшипник",
   params:(f,k) => [["Тип","Двухрядный, запрессован в поворотный кулак"]].concat(f.hubNut ? [["Гайка ступицы", f.hubNut]] : []),
   prem:[["SKF","Швеция"],["FAG","Schaeffler, Германия"]],
   eco:[["Оригинал Лада",""],["СПЗ","Самарский подшипниковый завод"],["ВБФ","Вологодский подшипниковый завод"]],
   tip:"Гайку ступицы ставь новую. Подшипник не роняй и держи в упаковке до запрессовки, чтобы внутрь не попала грязь."},''')
R('const JOB_PARTS = {', 'const JOB_PARTS = {stablink:["stablink"],hub:["hubbearing"],')
R('const EXTRA_LOG = [', 'const EXTRA_LOG = [["valves","Регулировка клапанов"],["stablink","Стойки стабилизатора"],["hub","Ступичный подшипник"],')
R('const JOB_LOG = {', 'const JOB_LOG = {valves:"valves",stablink:"stablink",hub:"hub",')

# 6a. проверка деталей для новых работ
R('  wheel: [\n    ["Дата шины"', '''  valves: [
    ["Прокладка", "Новая прокладка крышки клапанов эластичная, без надрывов, подходит по форме."],
    ["Щуп", "Пластина 0,15 мм ровная, без загибов и ржавчины."]
  ],
  stablink: [
    ["Пыльники", "Резиновые пыльники шарниров целые, без трещин, внутри смазка."],
    ["Шарниры", "Пальцы поворачиваются с усилием, плавно, без люфта и хруста."],
    ["Резьба и гайки", "Резьба целая, гайки в комплекте. Левая и правая стойки бывают разными — сверь с каталогом."]
  ],
  hub: [
    ["Подшипник", "Вращается плавно, без заеданий и хруста. Уплотнения с обеих сторон целые."],
    ["Комплект", "Новая гайка ступицы и стопорные кольца — в комплекте или купи отдельно."],
    ["Размер", "Сверь размер с каталогом: у разных моделей и годов подшипники отличаются."]
  ],
  wheel: [
    ["Дата шины"''')

# 7. расходы в «Моём гараже»
costs = open(D + "costs.js").read()
R('/* ---------- Мой гараж ---------- */', costs + '/* ---------- Мой гараж ---------- */')
R('''        ${total ? `<p class="total">Потрачено на обслуживание: <b>${rub(total)}</b></p>` : ""}`''',
  '''        ${total ? `<p class="total">Потрачено на обслуживание: <b>${rub(total)}</b> — подробнее в разделе «Расходы» ниже</p>` : ""}`''')
R('''    <p class="approx-note">${storeNote}</p>
  </div>`;
}

function loadLocal(){''', '''    ${renderCosts(car, entries)}
    <p class="approx-note">${storeNote}</p>
  </div>`;
}

function loadLocal(){''')

# 8. печать «Цифр моей машины»
R('''    <div class="dhead">${icon("numbers")}<div><h2>Цифры моей машины</h2><p class="lead">Всё, что ищут в гараже, на одной странице.</p></div></div>''',
'''    <div class="printhead">Гаражник · цифры моей машины<span>${esc(f.name)} · ${esc(String(f.engName || f.models).replace(/\\s*\\(.*\\)\\s*$/, ""))}</span></div>
    <div class="dhead">${icon("numbers")}<div><h2>Цифры моей машины</h2><p class="lead">Всё, что ищут в гараже, на одной странице.</p></div></div>
    <button type="button" class="printbtn" data-print><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="1"/><path d="M7 14h10v7H7z"/></svg><span><b>Распечатать или сохранить PDF</b><small>Шпаргалка в бардачок или на стену гаража — на одном листе</small></span></button>''')
R('''    <p class="approx-note">Для: ${esc(f.name)}, ${esc(f.engName || f.models)}. Цифры — по руководствам по эксплуатации и ремонту АвтоВАЗа. Нашёл ошибку — напиши в Telegram-канал @garage4to.</p>''',
'''    <p class="approx-note">Для: ${esc(f.name)}, ${esc(f.engName || f.models)}. Цифры — по руководствам по эксплуатации и ремонту АвтоВАЗа. Нашёл ошибку — напиши в Telegram-канал @garage4to.</p>
    <p class="printfoot">garazhnik-lada.ru — инструкции по ТО Лады своими руками. Цифры по руководствам АвтоВАЗа; перед работой сверяйся с руководством к своей машине.</p>''')
R('''  else if(b.hasAttribute("data-famclose")){ famMenu(false); }''', '''  else if(b.hasAttribute("data-famclose")){ famMenu(false); }
  else if(b.hasAttribute("data-print")){ window.print(); }''')

# 9. стили
R('.tiernote{', '''.notfor{margin-bottom:16px}
.cstats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:12px}
.cstats div{background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--amber);border-radius:var(--r);padding:10px 12px;display:flex;flex-direction:column;gap:2px}
.cstats span{font:500 11px var(--f-mono);text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.cstats b{font:500 20px var(--f-mono);color:var(--ink);font-variant-numeric:tabular-nums}
.cchart,.ccats{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:12px 14px;margin-bottom:12px}
.cchart-h{font:500 11px var(--f-mono);text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:8px}
.cchart svg{display:block;width:100%;height:auto}
.cb{fill:color-mix(in srgb,var(--amber) 55%,var(--surface))} .cb-now{fill:var(--amber)} .cb-zero{fill:var(--line-2)}
.cb-axis{stroke:var(--line-2);stroke-width:1}
.cb-v{fill:var(--ink);font:500 12px var(--f-mono)} .cb-l{fill:var(--muted);font:500 12px var(--f-mono)}
.ccats ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.ccat-t{display:flex;justify-content:space-between;gap:10px;font-size:14px;margin-bottom:4px}
.ccat-t b{font:500 13.5px var(--f-mono);white-space:nowrap}
.ccat-bar{height:6px;background:var(--raised);border-radius:1px;overflow:hidden}
.ccat-bar i{display:block;height:100%;background:var(--amber)}
.printbtn{display:flex;align-items:center;gap:12px;width:100%;margin:0 0 16px;padding:12px 14px;border:1px solid var(--line-2);border-left:3px solid var(--amber);background:var(--surface);color:var(--ink);border-radius:var(--r);cursor:pointer;text-align:left}
.printbtn:hover{background:var(--raised)}
.printbtn svg{width:26px;height:26px;stroke:var(--amber);flex:none}
.printbtn span{display:flex;flex-direction:column}
.printbtn b{font-size:15.5px} .printbtn small{color:var(--muted);font-size:13px}
.printhead,.printfoot{display:none}
@media print{
  @page{size:A4;margin:12mm}
  html,body{background:#fff!important;background-image:none!important;color:#000!important}
  body::before,header,header::after,nav.bottom,.cookiebar,#zoomov,.back,.printbtn,.footlinks,.tgcard,.dhead .ico,.approx-note{display:none!important}
  main{padding:0!important} .wrap{max-width:none!important;padding:0!important}
  .printhead{display:flex!important;justify-content:space-between;align-items:baseline;gap:12px;font:700 17px var(--f-head,sans-serif);text-transform:uppercase;letter-spacing:.04em;border-bottom:3px solid #000;padding-bottom:6px;margin-bottom:8px;color:#000}
  .printhead span{font:500 12px var(--f-mono);text-transform:none;letter-spacing:0}
  .dhead{display:none!important}
  .numgrid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:6px!important}
  .plate{background:#fff!important;border:1px solid #000!important;border-left:4px solid #000!important;border-radius:0!important;padding:6px 9px!important;margin:0!important;break-inside:avoid}
  .plate .cap{color:#000!important;margin-bottom:5px!important;font-weight:700}
  .plate .cap::before{background:#000!important;box-shadow:none!important}
  .plate dl{gap:4px 12px!important}
  .plate dt{color:#333!important;font-size:10.5px!important;margin:0!important}
  .plate dd,.plate dd.txt{color:#000!important;font-size:12.5px!important}
  .printfoot{display:block!important;margin-top:8px;font-size:10px;color:#333}
  *{box-shadow:none!important;text-shadow:none!important}
}
.tiernote{''')

open(p, "w").write(s)
print("ok")
