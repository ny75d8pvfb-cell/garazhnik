# -*- coding: utf-8 -*-
# Страницы моделей: всё про одно семейство Лад на одной странице (цифры по моторам, регламент, инструкции,
# предохранители, статьи). Выполняется через exec() в конце articles.py — A, add, F, D, table, ul, tip, E доступны.
import datetime as _dtm

_MODELS = [
    # fam, slug, родительный падеж для заголовка, короткое имя, слова для поиска статей по модели
    ("classic", "obsluzhivanie-vaz-2107", "ВАЗ 2107 и классики (2101–2107)", "классике", ["2107", "2106", "2105", "классик"]),
    ("niva", "obsluzhivanie-niva", "Нивы 2121, 21214 и Legend", "Ниве", ["нив"]),
    ("samara", "obsluzhivanie-vaz-2114", "ВАЗ 2114, 2109, 2115 (Самара)", "Самаре", ["2114", "2109", "2115", "самар"]),
    ("ten", "obsluzhivanie-vaz-2110", "ВАЗ 2110, 2111, 2112", "десятке", ["2110", "2111", "2112", "десятк"]),
    ("kpg", "obsluzhivanie-granta-kalina-priora", "Гранты, Калины и Приоры", "Гранте, Калине и Приоре", ["грант", "калин", "приор"]),
    ("vesta", "obsluzhivanie-vesta-largus", "Весты, Ларгуса и Иксрея", "Весте, Ларгусе и Иксрее", ["вест", "ларгус", "иксре"]),
]

_FIELDS = [  # поле, подпись
    ("oil", "Масло в двигатель"), ("coolant", "Антифриз"), ("gear", "Масло в коробку"),
    ("plug", "Свечи: ключ и момент"), ("plugGap", "Зазор свечей"), ("wheel", "Колёсные болты: ключ и момент"),
    ("grm", "Привод ГРМ"), ("battery", "Аккумулятор"), ("ign", "Зажигание"), ("fuel", "Топливный фильтр"),
    ("cabin", "Салонный фильтр"), ("brakes", "Тормоза"), ("bleed", "Порядок прокачки тормозов"),
]
_NUMERIC = {"oil", "coolant", "gear", "plug", "plugGap", "wheel"}

_JOBS = [("oil", "Замена масла и масляного фильтра"), ("air", "Замена воздушного фильтра"), ("cabin", "Замена салонного фильтра"),
         ("plugs", "Замена свечей зажигания"), ("coolant", "Замена антифриза"), ("brakes", "Проверка износа колодок"),
         ("padsreplace", "Замена передних колодок"), ("bleed", "Замена тормозной жидкости"), ("timing", "ГРМ: проверка и замена"),
         ("altbelt", "Ремень генератора"), ("fuel", "Замена топливного фильтра"), ("battery", "Аккумулятор и прикуривание"),
         ("bulbs", "Замена ламп"), ("wheel", "Замена колеса"), ("valves", "Регулировка клапанов"),
         ("stablink", "Замена стоек стабилизатора"), ("hub", "Замена ступичного подшипника")]
_JOB_FAMS = {"valves": ["classic", "niva"], "stablink": ["kpg", "vesta"], "hub": ["samara", "ten", "kpg", "vesta"]}

# на Весте/Ларгусе момент колёс у разных моделей разный — как в статье про моменты затяжки
_WHEEL_FIX = {"vesta": "Веста, Иксрей: ключ 17 · 90–120 Н·м; Ларгус: 105 Н·м"}


def _val(fk, v, field):
    if field == "plug": return f'ключ {v["plugKey"]} · {v["plugTorque"]}'
    if field == "wheel": return _WHEEL_FIX.get(fk) or f'ключ {v["wheelKey"]} · {v["wheelTorque"]}'
    return v.get(field) or ""


def _cell(field, text):
    return f'<span class="num">{E(text)}</span>' if field in _NUMERIC else E(text)


def _numbers(fk):
    engs = F[fk]["engines"]
    common, differ = [], []
    for field, label in _FIELDS:
        vals = [_val(fk, e["v"], field) for e in engs]
        if not any(vals): continue
        (common if len(set(vals)) == 1 else differ).append((field, label))
    out = ""
    if len(engs) > 1:
        out += "<p>Моторов несколько — сначала цифры, которые у них отличаются, потом общие.</p>"
        for e in engs:
            rows = [[f"<b>{E(label)}</b>", _cell(f, _val(fk, e["v"], f))] for f, label in differ]
            if rows: out += f'<h3>{E(e["name"])} <small>— {E(e["sub"])}</small></h3>' + table(["Что", "Значение"], rows)
        out += "<h3>Общее для всех моторов</h3>"
    v0 = engs[0]["v"]
    out += table(["Что", "Значение"], [[f"<b>{E(label)}</b>", _cell(f, _val(fk, v0, f))] for f, label in common])
    return out


def _sched(fk):
    rows = []
    for s in D["sched"][fk]:
        when = []
        if s["km"]: when.append(f'каждые {s["km"]:,} км'.replace(",", " "))
        if s["years"]: when.append("раз в год" if s["years"] == 1 else f'раз в {s["years"]} {"года" if s["years"] < 5 else "лет"}')
        name = E(s["name"])
        if s.get("job"): name = f'<a class="inlink" href="../?fam={fk}#{s["job"]}">{name}</a>'
        rows.append([name, f'<span class="num">{" или ".join(when)}</span>'])
    return table(["Что", "Когда"], rows)


def _model_page(fk, slug, gen, short, words):
    f = F[fk]
    mine = [a for a in A if a["cat"] != "Модель" and any(w in a["title"].lower().replace("ё", "е") for w in words)]
    fuses = [a for a in mine if a["slug"].startswith("predohraniteli")]
    own = [a for a in mine if a not in fuses]
    jobs = [(j, t) for j, t in _JOBS if fk in _JOB_FAMS.get(j, [fk])]
    secs = [
        ("cifry", "Главные цифры", _numbers(fk) +
         tip("Цифры — по руководствам АвтоВАЗа для типовых комплектаций. Если на твоей машине стоит другой мотор или коробка, сверь с сервисной книжкой.")),
        ("reglament", "Регламент ТО", _sched(fk) +
         "<p>Меняй по тому, что наступит раньше: пробег или время. При езде в пробках, коротких поездках зимой и по пыльным дорогам интервалы сокращают примерно в полтора раза.</p>"),
        ("instrukcii", "Пошаговые инструкции",
         f"<p>В приложении Гаражника каждая работа расписана по шагам. Ссылки откроют её сразу с цифрами для модели «{E(f['name'])}»:</p>" +
         ul([f'<a class="inlink" href="../?fam={fk}#{j}">{E(t)}</a>' for j, t in jobs])),
        ("polomki", "Если что-то сломалось",
         ul([f'<a class="inlink" href="../?fam={fk}#symptoms">Поломки по симптомам</a> — стучит, не заводится, дымит, пахнет: что проверить в первую очередь',
             f'<a class="inlink" href="lampy-na-paneli.html">Лампы на панели</a> — какая горит, можно ли ехать',
             f'<a class="inlink" href="../?fam={fk}#codes">Коды ошибок</a> — если есть разъём OBD-II и сканер ELM327'] +
            [f'<a class="inlink" href="{a["slug"]}.html">{E(a["title"])}</a>' for a in fuses])),
    ]
    if own:
        secs.append(("stati", "Статьи про эту модель",
                     ul([f'<a class="inlink" href="{a["slug"]}.html">{E(a["title"])}</a>' for a in own])))
    rel = [a["slug"] for a in own][:2] + ["to-po-reglamentu", "skolko-masla", "momenty-zatyazhki"]
    rel = list(dict.fromkeys(rel))[:3]
    add(slug, "Модель", f"Обслуживание {gen} своими руками: все цифры и регламент",
        f"Всё для самостоятельного ТО {gen}: объёмы масла и антифриза по моторам, моменты затяжки, зазор свечей, привод ГРМ, регламент, предохранители и пошаговые инструкции.",
        5, "numbers", "Справочник по машине в Гаражнике",
        f"Здесь собрано всё, что нужно для самостоятельного обслуживания {gen}: точные объёмы и моменты по каждому мотору, регламент ТО, ссылки на пошаговые инструкции и схемы предохранителей.",
        secs, rel)
    A[-1]["fam"] = fk
    A[-1]["date"] = _dtm.date(2026, 10, 30)


for _fk, _slug, _gen, _short, _words in _MODELS:
    _model_page(_fk, _slug, _gen, _short, _words)
