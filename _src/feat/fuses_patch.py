# -*- coding: utf-8 -*-
# Встраивает раздел «Предохранители» в index.html. Запуск: python3 fuses_patch.py path/to/index.html
import sys, json, os
sys.path.insert(0, os.path.dirname(__file__))
import fuses, fusefig
P = sys.argv[1]
s = open(P).read()

def rep(old, new, cnt=1):
    global s
    assert s.count(old) == cnt, (old[:80], s.count(old))
    s = s.replace(old, new)

models = []
for m in fuses.M:
    models.append({k: m.get(k) for k in ["id", "name", "short", "fam", "slug", "title", "where", "intro", "key", "cols", "blocks", "relays"]})
J = lambda o: json.dumps(o, ensure_ascii=False, separators=(",", ":"))

ALIAS = {"Прикуриватель / розетка": "зарядка телефона usb прикуриватель розетка 12",
         "Бензонасос": "не заводится топливный насос бензонасос не жужжит",
         "Печка (вентилятор салона)": "отопитель печка не дует обдув",
         "Вентилятор радиатора": "перегрев вентилятор не включается",
         "Ближний свет": "фара фары не горит свет", "Дальний свет": "фара фары свет",
         "Габариты": "подсветка номера габарит", "Стоп-сигналы": "стоп тормоз фонарь", "Поворотники и аварийка": "поворотник аварийка поворот",
         "Звуковой сигнал": "гудок клаксон сигнал бибикалка", "Дворники и омыватель": "стеклоочиститель дворник омыватель",
         "Обогрев заднего стекла": "обогрев стекла", "Стеклоподъёмники": "стеклоподъемник окно", "Блок управления двигателем (ЭБУ)": "мозги контроллер эбу не заводится",
         "Задний ход": "задний ход фонарь", "Приборная панель": "приборка щиток панель"}

JS = r'''
/* ---------- предохранители ---------- */
const FUSE_M = __M__;
const FUSE_KEYS = __KEYS__;
const FUSE_ALIAS = __ALIAS__;
const FUSE_COLORS = __COLORS__;
const FUSE_MAXI = __MAXI__;
const FUSE_TYPES = __TYPES__;
const FUSE_FIG = __FIG__;
const FUSE_DEF = {classic:"2107", niva:"niva", samara:"samara", ten:"ten", kpg:"granta", vesta:"vesta"};
let fuseModel = null; try{ fuseModel = localStorage.getItem("garazh-fuse"); }catch(e){}
function renderFuses(){
  const id = FUSE_M.some(m => m.id === fuseModel) ? fuseModel : (FUSE_DEF[fam] || "granta");
  const m = FUSE_M.find(x => x.id === id);
  const q = query.trim().toLowerCase();
  const hit = (...p) => !q || p.join(" ").toLowerCase().includes(q);
  const cols = m.cols;
  const keys = FUSE_KEYS.filter(k => m.key[k] && hit(k, FUSE_ALIAS[k] || "", [].concat(m.key[k]).join(" ")));
  const cell = v => `<span class="fnum">${esc(v)}</span>`;
  const keyTable = keys.length ? `<div class="table fkey"><table><thead><tr><th>Что не работает</th>${cols ? cols.map(c => `<th>${esc(c)}</th>`).join("") : "<th>Где искать</th>"}</tr></thead><tbody>${keys.map(k => `<tr><td><b>${esc(k)}</b></td>${[].concat(m.key[k]).map((v, i) => `<td data-l="${cols ? esc(cols[i]) : ""}">${cell(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : "";
  let anyRow = false;
  const blocks = m.blocks.map(([title, rows]) => {
    const r = rows.filter(x => hit(x[2], x[0]));
    if(!r.length) return "";
    anyRow = anyRow || !!q;
    return `<details class="fblock"${q ? " open" : ""}><summary>${esc(title)}<span>${r.length}</span></summary><div class="table"><table><thead><tr><th>№</th><th>Ток, А</th><th>Что защищает</th></tr></thead><tbody>${r.map(x => `<tr><td class="fno">${esc(x[0])}</td><td class="fa">${esc(x[1])}</td><td>${esc(x[2])}</td></tr>`).join("")}</tbody></table></div></details>`;
  }).join("");
  const rel = m.relays.filter(x => hit(x[0], x[1]));
  const relays = rel.length ? `<details class="fblock"${q ? " open" : ""}><summary>Реле<span>${rel.length}</span></summary><ul class="frel">${rel.map(x => `<li><b>${esc(x[0])}</b><small>${esc(x[1])}</small></li>`).join("")}</ul></details>` : "";
  const nothing = q && !keys.length && !blocks && !relays;
  const chips = `<div class="chips fmods" role="group" aria-label="Модель">${FUSE_M.map(x => `<button type="button" data-fmod="${x.id}" aria-pressed="${x.id === id}">${esc(x.short)}</button>`).join("")}</div>`;
  const sw = FUSE_COLORS.map(([a, n, c]) => `<div class="fsw"><i style="background:${c}"></i><b>${a} А</b><small>${esc(n)}</small></div>`).join("");
  return `<div class="detail">${faultsNav("fuses")}
    <p class="famnote">Перестало работать что-то одно — прикуриватель, печка, фара, поворотники? Сначала проверь его предохранитель. Это пять минут и пара десятков рублей.</p>
    ${chips}
    ${searchBox("Что не работает: прикуриватель, печка, фара…")}
    <section class="group fmodel">
      <h2 class="gh">${esc(m.name)}</h2>
      <p class="fintro">${esc(m.intro)}</p>
      <div class="fwhere">${m.where.map(([t, d]) => `<div><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join("")}</div>
      ${keyTable}${blocks}${relays}
      ${nothing ? `<p class="empty">В таблицах ${esc(m.short)} такого нет. Попробуй другое слово: «свет», «печка», «насос».</p>` : ""}
      <p class="fcheck">Номинал всегда сверяй со схемой на крышке блока и с самим предохранителем. На разных годах и комплектациях порядок отличается — ставь такой же, какой стоял.</p>
      <a class="artstrip" href="stati/${m.slug}.html"><span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg></span><span><b>${esc(m.title)}</b><small>Статья: полная таблица, реле и советы</small></span><span class="go" aria-hidden="true">→</span></a>
    </section>
    <section class="group">
      <h2 class="gh">Как проверить и заменить</h2>
      ${fig("0 0 640 240", FUSE_FIG.replace(/^<svg[^>]*>|<\/svg>$/g, ""), "Рис. 1. Слева направо: целый и сгоревший плоский предохранитель, мини, макси и цилиндрический «бочонок».", "Виды предохранителей")}
      <ol class="fsteps">
        <li><b>Выключи зажигание</b> и всё, что включал.</li>
        <li><b>Найди нужный предохранитель</b> по таблице выше и сверь со схемой на крышке блока. Там же, в блоке, обычно лежит пластиковый пинцет.</li>
        <li><b>Вытащи и посмотри на просвет.</b> Перемычка разорвана, корпус потемнел или оплавился — меняй.</li>
        <li><b>Надёжнее — проверить тестером, не вынимая.</b> Включи зажигание, минус щупа — на «массу», плюс — по очереди на обе контрольные точки сверху. 12 В с двух сторон — цел, с одной — сгорел. Снятый можно прозвонить в режиме прозвонки.</li>
        <li><b>Поставь новый того же номинала</b> — он того же цвета. Держи в бардачке набор запасных на 10, 15, 20 и 30 А.</li>
      </ol>
      <div class="callout dang"><b>Нельзя</b> ставить предохранитель большего номинала, проволоку или «жучок». Тогда при замыкании сгорит не вставка за 20 рублей, а проводка — так машины и горят.</div>
      <div class="callout att"><b>Сгорел снова сразу?</b> Значит, в цепи замыкание или неисправен сам потребитель: заклинивший моторчик печки, монетка в прикуривателе, пережатый провод. Ищи причину. <b>Предохранитель цел, а не работает?</b> Проверь реле, выключатель, окисленный контакт в гнезде и сам прибор.</div>
    </section>
    <section class="group">
      <h2 class="gh">Цвет и ток</h2>
      <p class="famnote">Цвет плоских предохранителей одинаковый у всех производителей: по нему видно номинал, даже если цифры стёрлись.</p>
      <div class="fsws">${sw}</div>
      <p class="famnote">Макси (под капотом): ${FUSE_MAXI.map(([a, n]) => `${a} А — ${n.toLowerCase()}`).join(", ")}.</p>
    </section>
    <section class="group">
      <h2 class="gh">Какие бывают</h2>
      <div class="ftypes">${FUSE_TYPES.map(([t, d]) => `<div><b>${esc(t)}</b><span>${esc(d)}</span></div>`).join("")}</div>
    </section></div>`;
}
'''
JS = (JS.replace("__M__", J(models)).replace("__KEYS__", J(fuses.KEYS)).replace("__ALIAS__", J(ALIAS))
        .replace("__COLORS__", J(fuses.COLORS)).replace("__MAXI__", J(fuses.MAXI)).replace("__TYPES__", J(fuses.TYPES))
        .replace("__FIG__", J(fusefig.figure())))

CSS = """
.fseg{grid-template-columns:repeat(4,1fr)}
@media (max-width:640px){.fseg{grid-template-columns:repeat(2,1fr)}.fseg button:nth-child(3){border-left:0}.fseg button:nth-child(n+3){border-top:1px solid var(--line-2)}}
.fmods{margin-bottom:12px}
.fmods button[aria-pressed="true"]{color:var(--amber);border-color:var(--amber);background:var(--amber-soft)}
.fintro{font-size:14px;color:var(--muted);margin:0 0 12px;max-width:75ch}
.fwhere{display:grid;gap:8px;margin:0 0 14px}
.fwhere div{display:grid;grid-template-columns:minmax(150px,220px) 1fr;gap:12px;background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--amber);border-radius:var(--r);padding:10px 12px;font-size:14px}
.fwhere b{font-weight:600}
.fwhere span{color:var(--muted)}
.fkey{margin-bottom:12px}
.fkey td:first-child{white-space:nowrap}
.fnum{font-family:var(--f-mono);font-size:13.5px}
.fblock{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);margin:0 0 8px}
.fblock>summary{cursor:pointer;padding:11px 14px;font-weight:600;display:flex;align-items:center;gap:8px;list-style:none}
.fblock>summary::-webkit-details-marker{display:none}
.fblock>summary::before{content:"+";font-family:var(--f-mono);color:var(--amber);width:14px}
.fblock[open]>summary::before{content:"−"}
.fblock>summary span{margin-left:auto;font:500 12px var(--f-mono);color:var(--muted)}
.fblock .table{border:0;border-top:1px solid var(--line);border-radius:0 0 var(--r) var(--r)}
.fno,.fa{font-family:var(--f-mono);white-space:nowrap}
.fa{color:var(--amber);font-weight:600}
.fblock th:nth-child(1),.fblock th:nth-child(2){width:1%}
.frel{list-style:none;margin:0;padding:6px 14px 12px;display:grid;gap:8px;border-top:1px solid var(--line)}
.frel li{display:flex;flex-direction:column;font-size:14px}
.frel small{color:var(--muted);font-size:12.5px}
.fcheck{font-size:13px;color:var(--muted);margin:10px 0 14px;max-width:75ch}
.fsteps{margin:12px 0 0;padding-left:22px;display:grid;gap:8px;font-size:14.5px;max-width:75ch}
.fsws{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin:0 0 10px}
.fsw{display:grid;grid-template-columns:22px 1fr;column-gap:10px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:8px 10px}
.fsw i{grid-row:span 2;width:22px;height:30px;border-radius:3px;border:1px solid var(--line-2)}
.fsw b{font-family:var(--f-mono);font-size:14px}
.fsw small{color:var(--muted);font-size:12px}
.ftypes{display:grid;gap:8px}
.ftypes div{display:grid;grid-template-columns:minmax(150px,220px) 1fr;gap:12px;font-size:14px;padding:10px 12px;background:var(--surface);border:1px solid var(--line);border-radius:var(--r)}
.ftypes span{color:var(--muted)}
.fblock td,.fkey td{text-align:left!important}
.fblock td:first-child,.fkey td:first-child{min-width:0!important}
.fblock td:nth-child(1),.fblock td:nth-child(2){width:1%;padding-right:10px}
@media (max-width:640px){.fblock td{padding:8px 10px;font-size:13.5px}}
@media (max-width:640px){.fkey thead{display:none}.fkey tr{display:grid;gap:3px;padding:9px 12px;border-bottom:1px solid var(--line)}.fkey tr:last-child{border-bottom:0}.fkey td{padding:0;border:0!important;white-space:normal!important}.fkey td[data-l]:not([data-l=""])::before{content:attr(data-l) " — ";color:var(--muted);font-size:12px}}
@media (max-width:640px){.fwhere div,.ftypes div{grid-template-columns:1fr;gap:3px}.fkey td:first-child{white-space:normal}}
"""

# 1. JS перед renderLamps
rep("function renderLamps(){", JS + "function renderLamps(){")
# 2. вкладка в «Поломках»
rep('const it = [["symptoms","Симптомы"],["lamps","Лампы на панели"],["codes","Коды ошибок"]];',
    'const it = [["symptoms","Симптомы"],["lamps","Лампы на панели"],["codes","Коды ошибок"],["fuses","Предохранители"]];')
# 3. роутинг и рендер
rep('view === "codes" ? renderCodes() :', 'view === "codes" ? renderCodes() : view === "fuses" ? renderFuses() :')
rep('h === "lamps" || h === "codes"){', 'h === "lamps" || h === "codes" || h === "fuses"){')
# 4. клик по модели
rep('  else if(b.hasAttribute("data-print")){ window.print(); }',
    '  else if(d.fmod){ fuseModel = d.fmod; try{ localStorage.setItem("garazh-fuse", d.fmod); }catch(_){} const y = scrollY; render(); scrollTo(0,y); }\n  else if(b.hasAttribute("data-print")){ window.print(); }')
# 5. общий поиск
rep('  CODE_GROUPS.flatMap(g => g[1])',
    '  if(/предохран|реле|прикуривател|не работает/i.test(query)) out.push(["Поломки · предохранители", "Предохранители и реле: где стоят и за что отвечают", "fuses"]);\n  CODE_GROUPS.flatMap(g => g[1])')
# 6. полоска на странице симптомов
anchor = '<a class="artstrip" href="#lamps" data-goto-link="lamps">'
rep(anchor, '<a class="artstrip" href="#fuses" data-goto-link="fuses"><span class="ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3" width="12" height="11" rx="1.5"/><path d="M9 14v7M15 14v7M9 8.5h2l1-2 1 4 1-2h1"/></svg></span><span><b>Не работает прикуриватель, печка, фара?</b><small>Предохранители и реле по моделям: где стоят и за что отвечают</small></span><span class="go" aria-hidden="true">→</span></a>\n    ' + anchor)
# 7. стили — перед закрытием первого </style>
i = s.rindex("</style>", 0, s.index("</head>"))
s = s[:i] + CSS + s[i:]
open(P, "w").write(s)
print("ok", len(models))
