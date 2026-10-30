import sys
D = "/tmp/claude-0/-home-claude/9d1a6a5e-378a-5b4d-97e7-14d4ea8a5fe0/scratchpad/feat/"
p = sys.argv[1]; s = open(p).read()
def R(o, n, cnt=1):
    global s
    assert s.count(o) == cnt, (s.count(o), o[:90]); s = s.replace(o, n)

META = r'''
/* формат руководства для работ: разделы по номерам шагов, ключи, «Внимание», ошибки, источники */
const ZR_GRANTA_GRM = "https://www.zr.ru/content/articles/583063-lada-granta-proverka-i-zamena-remnya-grm/";
const JOB_META = {
 air:{diff:1,secs:[["Снятие",0],["Установка",4]],
  mistakes:["Поставили фильтр другой стороной — уплотнитель не прилегает.","Не почистили корпус — мусор сразу лёг на новый фильтр.","Закрыли крышку со щелью — пыль идёт мимо фильтра."]},
 cabin:{diff:2,secs:[["Где фильтр",0],["Снятие",2],["Установка",4]],
  mistakes:["Поставили фильтр против стрелки направления воздуха.","Не выгребли листья из ниши — они гниют и пахнут в салоне.","Сдвинули поводки дворников — щётки бьют по уплотнителю капота."]},
 plugs:{diff:2,secs:[["Подготовка",0],["Снятие",2],["Установка",7],["Сборка и проверка",10]],keys:{5:"свечная головка + удлинитель",9:"динамометрический ключ"},
  mistakes:["Выкручивали на горячем моторе и сорвали резьбу в головке блока.","Вкручивали сразу трещоткой — свеча пошла криво.","Перепутали провода или катушки по цилиндрам — мотор троит.","Не проверили зазор новых свечей."],
  src:[["Руководство АвтоВАЗа — моменты затяжки и зазоры свечей",""]]},
 coolant:{diff:3,secs:[["Подготовка",0],["Слив",3],["Заливка",5],["Удаление воздуха и проверка",7]],atts:{0:"Пробку бачка на горячем моторе не открывай — брызнет кипяток."},
  mistakes:["Открыли пробку на горячем моторе.","Смешали разные типы антифриза.","Не удалили воздух — перегрев и холодная печка.","На классике не слили жидкость из блока цилиндров."],
  src:[["Руководство АвтоВАЗа — объём системы охлаждения и тип жидкости",""]]},
 brakes:{diff:1,secs:[["Признаки",0],["Осмотр",1],["Сборка",6]],keys:{2:"баллонный ключ"},
  mistakes:["Проверили только одну сторону оси.","Не обратили внимания на износ диска.","Не заметили, что уровень тормозной жидкости упал к MIN."]},
 levels:{diff:1,secs:[["Подготовка",0],["Проверка",1]]},
 wheel:{diff:1,secs:[["Подготовка",0],["Снятие",2],["Установка",4],["Проверка",7]],keys:{1:"баллонный ключ",6:"динамометрический ключ"},
  mistakes:["Срывали болты на поднятой машине — колесо крутится.","Подняли не за штатное место и помяли порог.","Дотягивали ногой на ключе и сорвали шпильку."]},
 padsreplace:{diff:3,secs:[["Подготовка",0],["Снятие",2],["Установка",5],["Проверка",8]],keys:{3:"ключи 13 и 17"},atts:{5:"Пока суппорт откинут, не нажимай педаль тормоза — поршень может выйти из цилиндра."},
  mistakes:["Поменяли колодки только с одной стороны — машину уводит.","Не откачали жидкость — она вытекла из бачка при утапливании поршня.","Поехали, не прокачав педалью поршни, — первые нажатия проваливаются.","Не загнули стопорную пластину болта."],
  src:[["«За рулём»: Lada Granta — механика торможения","https://www.zr.ru/content/articles/540223-lada_granta_mehanika_tormozhenija/"]]},
 timing:{diff:4,secs:[["Цепь: проверка и подтяжка",0],["Подготовка",3],["Снятие",5],["Установка",8],["Проверка",10]],
  mistakes:["Провернули вал без ремня на моторе, который гнёт клапаны.","Перетянули ремень — гул и износ роликов и помпы.","Поставили новый ремень на старые ролики.","Не проверили метки после двух оборотов коленвала."],
  src:[["«За рулём»: Lada Granta — проверка и замена ремня ГРМ",ZR_GRANTA_GRM],["Руководство АвтоВАЗа к своему мотору — метки и натяжение",""]]},
 fuel:{diff:2,secs:[["Подготовка",0],["Снятие",4],["Установка",7],["Проверка",10]],
  mistakes:["Поставили фильтр против стрелки.","Не сбросили давление — облились бензином.","Не дощёлкнули быстросъёмные разъёмы — течь."]},
 bleed:{diff:3,secs:[["Подготовка",0],["Прокачка",3],["Проверка",7]],keys:{3:"ключ на 8"},
  mistakes:["Бачок опустел ниже MIN — в систему попал воздух.","Помощник отпустил педаль при открытом штуцере.","Нарушили порядок прокачки колёс."]},
 battery:{diff:1,secs:[["Проверка",0],["Обслуживание и зарядка",2],["Замена",4],["Прикуривание",6]],keys:{0:"мультиметр",4:"ключ на 10"},
  mistakes:["Снимали сначала плюс — можно замкнуть ключом на кузов.","Заряжали в закрытом помещении без проветривания.","Купили аккумулятор с другой полярностью."]},
 bulbs:{diff:1,secs:[["Подготовка",0],["Фары",1],["Задние фонари",5],["Если не горит",6]],
  mistakes:["Взялись за колбу пальцами — лампа быстро сгорит.","Поменяли одну лампу ближнего света вместо пары."]},
 altbelt:{diff:3,secs:[["Осмотр",0],["Снятие",3],["Установка",6]],
  mistakes:["Перетянули ремень — убили подшипники генератора и ролика.","Ремень лёг не во все ручьи шкива.","Сняли ремень на неостывшем моторе и обожглись."],
  src:[["«За рулём»: Гранта — замена ремня вспомогательных агрегатов","https://www.zr.ru/content/articles/833513-lada-granta-proverka-i-zamena-remnya-privoda-vspomogatelnyx-agregatov/"],["«За рулём»: Lada Vesta на ремонтопригодность","https://www.zr.ru/content/articles/848471-proveryaem-lada-vesta-na-remontoprigodnost/"]]},
 season:{diff:1,secs:[["Перед зимой",0],["Перед летом",7]]},
 valves:{diff:4,secs:[["Подготовка",0],["Разборка",2],["Регулировка",5],["Сборка",10]],keys:{4:"ключ на 10",8:"ключи 13 и 17",7:"щуп 0,15 мм"},
  mistakes:["Регулировали на горячем моторе.","Зажали щуп — зазор меньше нормы, клапан прогорает.","Не перепроверили зазор после затяжки контргайки.","Перетянули гайки крышки — прокладку выдавило."],
  src:[["«За рулём»: регулировка зазоров в приводе клапанов","https://www.zr.ru/content/articles/954942-regulirovka-zazorov-v-privode-klapanov/"]]},
 stablink:{diff:2,secs:[["Проверка",0],["Снятие",1],["Установка",7]],keys:{5:"ключ + шестигранник"},
  mistakes:["Били молотком по пальцу — повредили резьбу.","Затягивали гайку, не удерживая палец, — сорвали шарнир.","Поменяли одну стойку из двух."],
  src:[["Моменты затяжки Lada Granta и Kalina","https://xn--80aal0a.xn--80asehdb/do-my-self/repair/repair-lada-granta/11474-momenty-zatjazhki-osnovnyh-rezbovyh-soedinenij-uzlov-i-agregatov-lada-granta-kalina.html"],["Моменты затяжки Lada Vesta","https://xn--80aal0a.xn--80asehdb/do-my-self/repair/repair-lada-vesta/4538-momenty-zatjazhki-otvetstvennyh-rezbovyh-soedinenij-lada-vesta.html"]]},
 hub:{diff:5,secs:[["Проверка",0],["Разборка",1],["Замена подшипника",5],["Сборка",9]],atts:{3:"Не вешай суппорт на тормозном шланге."},
  mistakes:["Запрессовали подшипник через внутреннее кольцо.","Затянули гайку ступицы на вывешенном колесе — не дотянули.","Поставили старую гайку ступицы."],
  src:[["Моменты затяжки Lada Kalina (carservic)","https://carservic.ru/mz/avto/mz-ld/momenty-zatyazhki-lada-kalina-1"],["Моменты затяжки Lada Vesta","https://xn--80aal0a.xn--80asehdb/do-my-self/repair/repair-lada-vesta/4538-momenty-zatjazhki-otvetstvennyh-rezbovyh-soedinenij-lada-vesta.html"]]}
};
JOBS.forEach(j => { const m = JOB_META[j.id]; if(m) Object.assign(j, m); });
'''
R('JOBS.forEach(j => { if(j.sections) j.steps = j.sections.flatMap(x => x.steps); });',
  'JOBS.forEach(j => { if(j.sections) j.steps = j.sections.flatMap(x => x.steps); });' + META)

# рендер: разделы по диапазонам шагов, ключи и «Внимание» по номеру шага
R('''function stepHtml(j, s, i){
  const key = s.key ? `<span class="keytag">${esc(s.key)}</span>` : "";
  const att = s.att ? `<p class="callout att"><b>Внимание.</b> ${esc(s.att)}</p>` : "";''',
'''function stepHtml(j, s, i){
  const kk = s.key || (j.keys && j.keys[i]), aa = s.att || (j.atts && j.atts[i]);
  const key = kk ? `<span class="keytag">${esc(kk)}</span>` : "";
  const att = aa ? `<p class="callout att"><b>Внимание.</b> ${esc(aa)}</p>` : "";''')
R('''    : `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>Порядок работы</h3>''',
'''    : j.secs ? j.secs.map(([h, from], si) => { const to = si + 1 < j.secs.length ? j.secs[si+1][1] : j.steps.length;
        const st = []; for(let i = from; i < to; i++) if(ok(j.steps[i])) st.push(stepHtml(j, j.steps[i], i));
        return st.length ? `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>${esc(h)}</h3><ol class="steps">${st.join("")}</ol></section>` : ""; }).join("")
    : `<section class="blk jsec"><h3 class="jh"><span>${++n}</span>Порядок работы</h3>''')

# технические схемы
R('function figOilTech(){', open(D + "techfigs.js").read() + '\nfunction figOilTech(){')
R('const FIGS = {oiltech:figOilTech, ', 'const FIGS = {oiltech:figOilTech, caliperT:figCaliperT, marksT:figMarksT, beltT:figBeltT, gapT:figGapT, padsT:figPadsT, tankT:figTankT, dipT:figDipT, airT:figAirT, cabinT:figCabinT, fuelT:figFuelT, hoseT:figHoseT, ')
R('const FIG_JOBS = {oil:["oiltech","dipstick"],levels:["dipstick","tank"],air:["air"],cabin:["cabin","air"],plugs:["gap","plugread"],coolant:["tank"],brakes:["pads"],padsreplace:["caliper","pads","star"],timing:["marks"],fuel:["fuelf"],bleed:["bleedorder","hose"],',
  'const FIG_JOBS = {oil:["oiltech","dipT"],levels:["dipT","tankT"],air:["airT"],cabin:["cabinT","airT"],plugs:["gapT","plugread"],coolant:["tankT"],brakes:["padsT"],padsreplace:["caliperT","padsT","star"],timing:["marksT"],fuel:["fuelT"],bleed:["bleedorder","hoseT"],')
R('altbelt:["belt","tens"]', 'altbelt:["beltT","tens"]')
# фильтры на схемы, которые зависят от машины
R('const figs = (FIG_JOBS[j.id] || []).filter(id => !(j.id === "cabin" && fam === "classic") && !(id === "fuelf" && F().tankFilter))',
  'const figs = (FIG_JOBS[j.id] || []).filter(id => !(j.id === "cabin" && fam === "classic") && !((id === "fuelf" || id === "fuelT") && F().tankFilter))')

# стили технических схем (обе темы)
R('.tl-body{fill:none;stroke:var(--ink);stroke-width:1.6}', r'''.tl-body{fill:none;stroke:var(--ink);stroke-width:1.6}
:root{--tl-fill:#20262c;--tl-fill2:#2c333b;--tl-pad:#6b5a43;--tl-oil:#b98a2e;--tl-cool:#b34d6d;--tl-brk:#b8a45c;--tl-glass:#1b2836}
:root[data-theme="light"]{--tl-fill:#EDEAE3;--tl-fill2:#D9D5CB;--tl-pad:#C9B596;--tl-oil:#D7A84A;--tl-cool:#E79AB0;--tl-brk:#E4D598;--tl-glass:#E6EEF6}
.tl-fill{fill:var(--tl-fill)} .tl-fill2{fill:var(--tl-fill2)}
.tl-thin{stroke:var(--ink);stroke-width:1;fill:none;opacity:.75}
.tl-dot{fill:var(--ink)}
.tl-acc{stroke:var(--amber);stroke-width:2.6;fill:none;stroke-linecap:round}
.tl-accline{stroke:var(--amber);stroke-width:2;fill:none;stroke-dasharray:6 4}
.tl-accf{fill:var(--amber);stroke:var(--ink);stroke-width:1.2}
.tl-arrf{fill:var(--amber)}
.tl-mark{stroke:var(--amber);stroke-width:4;stroke-linecap:round}
.tl-dim{stroke:var(--ink);stroke-width:1.2;fill:none}
.tl-v{fill:var(--amber);font:600 13px var(--f-mono)}
.tl-warnt{fill:var(--warn)}
.tl-h{fill:var(--ink);font:600 14px var(--f-body)}
.tl-belt{stroke:var(--ink);stroke-width:7;fill:none;stroke-linecap:round;opacity:.8}
.tl-hose{stroke:var(--muted);stroke-width:5;fill:none;stroke-linecap:round}
.tl-hosec{stroke:var(--blue-ink);stroke-width:6;fill:none;stroke-linecap:round;opacity:.55}
.tl-pipe{stroke:var(--muted);stroke-width:6;stroke-linecap:round}
.tl-stick{stroke:var(--ink);stroke-width:5;stroke-linecap:round}
.tl-padf{fill:var(--tl-pad)} .tl-padf2{fill:var(--tl-pad);opacity:.55}
.tl-warnf{fill:var(--warn)}
.tl-oilf{fill:var(--tl-oil)} .tl-coolf{fill:var(--tl-cool)} .tl-brakef{fill:var(--tl-brk)}
.tl-glass{fill:var(--tl-glass)}
.tl-seal{fill:none;stroke:var(--amber);stroke-width:3;stroke-dasharray:2 3}
.tl-wiper{stroke:var(--ink);stroke-width:5;stroke-linecap:round}
.tl-ghost{display:none}
.figcap2{margin:6px 0 0;font-size:13px;color:var(--muted);text-align:left}
.fig figcaption{text-align:left}''')

# тема по умолчанию — как в телефоне/компьютере
R('''var t="light";try{t=localStorage.getItem("garazh-theme")||"light"}catch(e){}''',
  '''var t=null;try{t=localStorage.getItem("garazh-theme")}catch(e){}if(!t){t=(window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark"}''')
open(p, "w").write(s)
print("ok")
