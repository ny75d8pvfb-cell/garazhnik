# -*- coding: utf-8 -*-
# Собирает раздел «Статьи»: stati/*.html, stati/index.html, stati/style.css, обновляет sitemap.xml.
import json, os, sys, html, datetime
sys.path.insert(0, os.path.dirname(__file__))
from articles import A, D
E = html.escape
OUT = sys.argv[1]                      # папка сайта
SITE = "https://garazhnik-lada.ru"
TODAY = datetime.date(2026, 10, 29)
NOW = datetime.date(2026, 10, 30)
DT = lambda a: a.get("date", TODAY)
os.makedirs(os.path.join(OUT, "stati"), exist_ok=True)

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Russo+One&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap">'
METRIKA = '''<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(113852084,"init",{webvisor:true,clickmap:true,accurateTrackBounce:true,trackLinks:true});</script><noscript><div><img src="https://mc.yandex.ru/watch/113852084" style="position:absolute;left:-9999px" alt=""></div></noscript>'''
LOGO = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3.6 17.2a1.6 1.6 0 0 0 2.3 2.3l5.7-5.7a4 4 0 0 0 5.2-5.4l-2.4 2.4-2.2-.4-.4-2.2z"/></svg>'
TG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 4 2.8 11.1c-.9.4-.9 1.2.1 1.5l4.6 1.4 1.8 5.5c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8L22.9 5.5c.3-1.3-.5-1.9-1.9-1.5z"/><path d="m7.5 14 9.5-6"/></svg>'
COOKIE = '''<div class="cookiebar" id="cookiebar" hidden><p>Сайт использует cookies и Яндекс Метрику, чтобы понимать, какие материалы полезны. <a href="../#about">Подробнее</a></p><button type="button" class="btn" id="cookieOk">Понятно</button></div>
<script>(function(){var s=false;try{s=localStorage.getItem("garazh-cookie")==="1"}catch(e){}var b=document.getElementById("cookiebar");if(!s)b.hidden=false;document.getElementById("cookieOk").onclick=function(){b.hidden=true;try{localStorage.setItem("garazh-cookie","1")}catch(e){}}})();</script>'''

def head(title, desc, canon, extra=""):
    return f'''<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<meta name="theme-color" content="#0E1317">
<link rel="canonical" href="{canon}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="../icon-192.png">
<meta property="og:type" content="article">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:url" content="{canon}">
<meta property="og:image" content="{SITE}/og.png">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Гаражник">
{FONTS}
<link rel="stylesheet" href="style.css">
{extra}
{METRIKA}
</head>
<body>
<header class="ahead"><div class="wrap ahead-in">
  <a class="abrand" href="../"><span class="logo" aria-hidden="true">{LOGO}</span><span><b>Гаражник</b><small>твой помощник в ТО</small></span></a>
  <nav class="anav"><a href="index.html">Статьи</a><a class="tg" href="https://t.me/garage4to" target="_blank" rel="noopener" aria-label="Telegram-канал">{TG}</a><a class="btn-app" href="../">Открыть Гаражник</a></nav>
</div></header>
'''

FOOT = f'''<footer class="afoot"><div class="wrap">
  <p><b>Гаражник</b> — бесплатный справочник по ТО Лады своими руками. <a href="../">Приложение</a> · <a href="index.html">Статьи</a> · <a href="../#about">О сайте</a> · <a href="https://t.me/garage4to" target="_blank" rel="noopener">Telegram</a></p>
  <p class="disc">Материалы носят справочный характер. Работы ты выполняешь сам и под свою ответственность. Если сомневаешься — особенно с тормозами и ГРМ — обратись к мастеру. Цифры — по руководствам АвтоВАЗа; нашёл ошибку — напиши в Telegram.</p>
</div></footer>
{COOKIE}
</body>
</html>
'''

def card(a):
    return f'<a class="acard" href="{a["slug"]}.html"><span class="acat">{E(a["cat"])}</span><b>{E(a["title"])}</b><small>{E(a["desc"])}</small><span class="ameta">{a["mins"]} мин чтения</span></a>'

by = {a["slug"]: a for a in A}
for a in A:
    canon = f'{SITE}/stati/{a["slug"]}.html'
    ld = {"@context": "https://schema.org", "@type": "Article", "headline": a["title"], "description": a["desc"],
          "author": {"@type": "Organization", "name": "Редакция Гаражника"}, "publisher": {"@type": "Organization", "name": "Гаражник", "logo": {"@type": "ImageObject", "url": SITE + "/icon-512.png"}},
          "datePublished": DT(a).isoformat(), "dateModified": DT(a).isoformat(), "mainEntityOfPage": canon, "image": SITE + "/og.png", "inLanguage": "ru"}
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Гаражник", "item": SITE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Статьи", "item": SITE + "/stati/"},
        {"@type": "ListItem", "position": 3, "name": a["title"], "item": canon}]}
    extra = f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script><script type="application/ld+json">{json.dumps(crumbs, ensure_ascii=False)}</script>'
    toc = "".join(f'<li><a href="#{sid}">{E(h)}</a></li>' for sid, h, _ in a["sections"])
    body = "".join(f'<section id="{sid}"><h2>{E(h)}</h2>{content}</section>' for sid, h, content in a["sections"])
    rel = "".join(card(by[r]) for r in a["related"])
    page = head(f'{a["title"]} — Гаражник', a["desc"], canon, extra) + f'''
<main class="wrap amain">
  <nav class="crumbs" aria-label="Навигация"><a href="../">Гаражник</a><span>/</span><a href="index.html">Статьи</a><span>/</span><span>{E(a["cat"])}</span></nav>
  <article class="art">
    <h1>{E(a["title"])}</h1>
    <p class="byline"><span class="by-ico" aria-hidden="true">{LOGO}</span>Редакция Гаражника · {a["mins"]} мин чтения · {DT(a).strftime("%d.%m.%Y")}</p>
    <p class="lead">{E(a["lead"])}</p>
    <nav class="toc" aria-label="Содержание"><b>Содержание</b><ol>{toc}</ol></nav>
    {body}
    <a class="cta" href="../#{a["app"]}"><span class="cta-ico" aria-hidden="true">{LOGO}</span><span><b>{E(a["app_label"])}</b><small>Открыть в Гаражнике: цифры под твою модель и мотор, схемы и пошаговый режим</small></span><span class="cta-go" aria-hidden="true">→</span></a>
  </article>
  <section class="related"><h2>Похожие статьи</h2><div class="cards">{rel}</div></section>
</main>
''' + FOOT
    open(os.path.join(OUT, "stati", a["slug"] + ".html"), "w").write(page)

# список статей
GROUP = {"ТО и регламент": "С чего начать", "Цифры и таблицы": "С чего начать", "Инструмент": "С чего начать", "Сезон": "С чего начать",
         "Масло и жидкости": "Масло и жидкости", "Двигатель": "Двигатель",
         "Тормоза": "Тормоза и подвеска", "Подвеска": "Тормоза и подвеска", "Электрика": "Электрика и неисправности", "Неисправности": "Электрика и неисправности"}
cats = []
for a in A:
    if GROUP[a["cat"]] not in cats: cats.append(GROUP[a["cat"]])
groups = "".join(f'<section class="cgroup"><h2>{E(c)}</h2><div class="cards">{"".join(card(a) for a in A if GROUP[a["cat"]] == c)}</div></section>' for c in cats)
idx = head("Статьи о ТО Лады своими руками — Гаражник", "Статьи о самостоятельном обслуживании Лады: регламент ТО, объёмы масла и антифриза, моменты затяжки, замена свечей и масла, ремень ГРМ, колодки, подготовка к зиме.", SITE + "/stati/") + f'''
<main class="wrap amain">
  <nav class="crumbs" aria-label="Навигация"><a href="../">Гаражник</a><span>/</span><span>Статьи</span></nav>
  <div class="ihero"><h1>Статьи Гаражника</h1><p class="lead">Коротко и по делу про обслуживание Лады своими руками: что, когда и как менять, точные цифры по моделям и моторам. Для пошаговой работы в гараже — <a href="../">приложение Гаражник</a>.</p></div>
  {groups}
</main>
''' + FOOT
open(os.path.join(OUT, "stati", "index.html"), "w").write(idx)

# стиль: стили приложения (токены, схемы, таблицы) + стили статей
css = D["css"]
css += open(os.path.join(os.path.dirname(__file__), "article.css")).read()
css += open(os.path.join(os.path.dirname(__file__), "..", "audit", "strict.css")).read()
css += open(os.path.join(os.path.dirname(__file__), "article-strict.css")).read()
open(os.path.join(OUT, "stati", "style.css"), "w").write(css)

# sitemap
urls = [(SITE + "/", NOW), (SITE + "/stati/", NOW)] + [(f'{SITE}/stati/{a["slug"]}.html', DT(a)) for a in A]
sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f'  <url><loc>{u}</loc><lastmod>{d.isoformat()}</lastmod></url>\n' for u, d in urls) + '</urlset>\n'
open(os.path.join(OUT, "sitemap.xml"), "w").write(sm)
print("ok", len(A))
