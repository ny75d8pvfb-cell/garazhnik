# Стиль «Техническая карта» (14.11): вставляет techcard.css в index.html и перестраивает главную.
# Запуск из корня репо: python3 _src/feat/techcard_patch.py  (повторный запуск заменяет блок CSS, JS-правки — только один раз)
import re, os
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = os.path.join(ROOT, "index.html")
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "techcard.css"), encoding="utf-8").read()
head, body = src.split("/*P*/", 1)
PFX = ':root[data-theme] '

def prefix(css):
    out, i = [], 0
    while i < len(css):
        if css.startswith("/*", i):
            j = css.index("*/", i) + 2; out.append(css[i:j]); i = j; continue
        if css[i].isspace():
            out.append(css[i]); i += 1; continue
        if css.startswith("@media", i):
            j = css.index("{", i); depth, k = 1, j + 1
            while depth:
                depth += {"{": 1, "}": -1}.get(css[k], 0); k += 1
            out.append(css[i:j + 1] + prefix(css[j + 1:k - 1]) + "}"); i = k; continue
        j = css.index("{", i); k = css.index("}", j)
        sels = ",".join(PFX + s.strip() for s in css[i:j].split(","))
        out.append(sels + css[j:k + 1]); i = k + 1
    return "".join(out)

block = "/*TC-BEGIN*/\n" + head + prefix(body) + "\n/*TC-END*/\n"
s = open(P, encoding="utf-8").read()
s = re.sub(r"/\*TC-BEGIN\*/.*?/\*TC-END\*/\n", "", s, flags=re.S)
i = s.rfind("</style>", 0, s.find("<header>"))
s = s[:i] + block + s[i:]

FONT_OLD = "family=Nunito:wght@600;700;800&family=Russo+One&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500"
FONT_NEW = "family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700"
s = s.replace(FONT_OLD, FONT_NEW)

if "function tcSpec(" not in s:
    a = s.index("  const welcome = query || famChosen ? \"\"")
    b = s.index("  const other = query ? globalHits() : \"\";", a)
    s = s[:a] + r'''  const home = !query;
  const nModels = MODELS.length, nArts = ARTS.length;
  const hero = home ? `<section class="tc-hero"><div><span class="tc-lbl">Справочник · ТО и ремонт Лады</span>
    <h2 class="tc-title">ТО и ремонт Лады своими руками — по шагам и с точными цифрами</h2>
    <p class="tc-lead">Пошаговые инструкции, поиск причины по симптому, объёмы, моменты затяжки и ключи — под конкретную модель и мотор.</p>
    ${searchBox("Масло, не заводится, P0300…")}</div>${tcSpec()}</section>` : searchBox("Масло, не заводится, P0300…");
  let sn = 0; const num = () => String(++sn).padStart(2, "0");
  const welcome = home && !famChosen ? `<section class="tc-sec" aria-labelledby="wh"><div class="tc-sh"><span class="n">${num()}</span><h2 id="wh">Модель</h2><span class="tc-lbl">${nModels} ${plural(nModels,"модель","модели","моделей")} · ${nArts} ${plural(nArts,"статья","статьи","статей")}</span></div>
    <div class="tc-models">${MODELS.map(x => `<button type="button" data-model="${x.id}"><b>${esc(x.name)}</b><small>${esc(x.gens.length > 1 ? x.gens.map(y => y.name).join(" · ") : x.gens[0].years)}</small></button>`).join("")}</div>
    <div class="tc-under"><span>Не знаешь поколение или мотор? <button type="button" class="linkbtn" data-openvin>Определи по VIN</button></span><button type="button" class="linkbtn" data-wskip>Выберу позже</button></div></section>` : "";
  const features = home ? `<section class="tc-sec"><div class="tc-sh"><span class="n">${num()}</span><h2>Разделы</h2></div><div class="tc-nav">
    <button type="button" data-goto="schedule"><span class="k">По пробегу</span><b>Регламент ТО</b><small>Что и когда менять</small></button>
    <button type="button" data-goto="symptoms"><span class="k">Поломки</span><b>Что случилось?</b><small>Причина по симптому, лампы, коды</small></button>
    <button type="button" data-goto="numbers"><span class="k">Цифры</span><b>Справочник по машине</b><small>Объёмы, моменты, ключи</small></button>
    <a href="stati/"><span class="k">Статьи</span><b>Статьи о ТО Лады</b><small>${nArts} ${plural(nArts,"статья","статьи","статей")}: ГРМ, масло, зима</small></a>
  </div></section><section class="tc-sec"><div class="tc-sh"><span class="n">${num()}</span><h2>Работы</h2><span class="tc-lbl">${jobs.length} ${plural(jobs.length,"инструкция","инструкции","инструкций")}</span></div></section>` : "";
''' + s[b:]
    old = '  return searchBox("Поиск: масло, не заводится, P0300…") + welcome + features + other +'
    assert old in s; s = s.replace(old, '  return hero + welcome + features + other +')
    old = '(query ? "" : aboutLinks());'
    assert old in s; s = s.replace(old, '(query ? "" : tcTrust() + aboutLinks());', 1)
    old = "function aboutLinks(){"
    s = s.replace(old, r'''const plural = (n, a, b, c) => { const m = n % 100, k = n % 10; return m > 10 && m < 20 ? c : k === 1 ? a : k > 1 && k < 5 ? b : c; };
function tcSpec(){
  const f = F(), g = genOf(), e = engOf(fam);
  const short = v => { if(v == null) return null; v = String(v); if(/^уточняется/.test(v) || /^см\./.test(v)) return null;
    v = v.split(" — ")[0]; if(!v.includes(" · ")) v = v.split(" (")[0]; if(v.length > 36){ const c = v.search(/[;:]|\. /); v = c > 0 ? v.slice(0, c) : v.slice(0, 34) + "…"; } return v; };
  const rows = [["Масло, объём", f.oil], ["Антифриз", f.coolant], ["Свечи: ключ", f.plugKey], ["Свечи: момент", f.plugTorque], ["Колёса: момент", f.wheelTorque]]
    .map(([k, v]) => { const x = short(v); return `<div class="r"><dt>${k}</dt><i></i><dd${x ? "" : ' class="u"'}>${esc(x || "уточняется")}</dd></div>`; }).join("");
  const name = (g ? g.name : f.name) + (e ? " · " + engShort(e) : "");
  return `<aside class="tc-spec" aria-label="Цифры по машине"><div class="top"><b>${esc(name)}</b><span class="tc-lbl">${famPicked ? "Моя машина" : "Пример карты"}</span></div>
    <dl>${rows}</dl><div class="ft"><span class="tc-lbl">${famPicked ? "Цифры для твоего мотора" : "Выбери свою — цифры подстроятся"}</span>${famPicked ? `<button type="button" data-goto="numbers">Вся карта →</button>` : `<button type="button" data-openfam>Выбрать →</button>`}</div></aside>`;
}
function tcTrust(){
  return `<section class="tc-trust"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 3 7v6c0 4.5 3.8 7.5 9 8.5 5.2-1 9-4 9-8.5V7z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg><div><span class="tc-lbl">Как мы проверяем цифры</span><p>Каждое значение сверяем минимум по двум независимым источникам. Если второго нет, пишем «уточняется» — тогда сверь с сервисной книжкой.</p></div></section>`;
}
function aboutLinks(){''', 1)
    old = '  if(b.id === "famBtn"){'
    assert old in s
    s = s.replace(old, '  if(b.hasAttribute("data-openfam")){ scrollTo({top:0}); $("#famBtn").click(); return; }\n' + old, 1)
open(P, "w", encoding="utf-8").write(s)
print("ok")
