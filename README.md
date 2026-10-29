# Гаражник

Твой помощник в ТО Лады: пошаговые инструкции, схемы и точные цифры под модель и двигатель.

Сайт: https://ny75d8pvfb-cell.github.io/garazhnik/
Telegram-канал: https://t.me/garage4to

## Как добавить видео к работе

1. Открой файл `videos.json` и нажми карандаш («Edit this file»).
2. Добавь запись между квадратными скобками. Записи разделяются запятой:

```json
[
  {"instr": "oil", "url": "https://www.youtube.com/watch?v=...", "title": "Меняем масло на Гранте", "family": "all"},
  {"instr": "sym-whistle", "url": "https://rutube.ru/video/...", "title": "Так свистит ремень", "family": "all"}
]
```

3. Нажми «Commit changes». Через 1–2 минуты видео появится на сайте.

**instr** — какая работа:
`oil` масло, `air` воздушный фильтр, `cabin` салонный фильтр, `fuel` топливный фильтр,
`plugs` свечи, `altbelt` ремень генератора, `timing` ГРМ, `coolant` антифриз,
`brakes` проверка колодок, `padsreplace` замена колодок, `bleed` тормозная жидкость,
`valves` регулировка клапанов, `stablink` стойки стабилизатора, `hub` ступичный подшипник,
`battery` аккумулятор, `bulbs` лампы, `wheel` колёса, `levels` уровни, `season` зима/лето.

Для симптомов — `sym-` и код: `sym-oillamp`, `sym-overheat`, `sym-softpedal`, `sym-nostart`,
`sym-nocatch`, `sym-misfire`, `sym-whistle`, `sym-chargelamp`, `sym-brakenoise`, `sym-pull`,
`sym-chainnoise`, `sym-heater`, `sym-lights`.

**family** — для каких машин: `all` для всех, или только одна: `classic`, `niva`, `samara`, `ten`, `kpg`, `vesta`.

## Как добавить фото

1. Загрузи фото в папку `img` (кнопка «Add file → Upload files»).
2. В `photos.json` добавь запись:

```json
[
  {"target": "sym-brakenoise", "slot": "problem", "file": "img/kolodka-stertaya.jpg", "caption": "Колодка стёрлась до металла"}
]
```

`slot`: `problem` или `solution` для симптомов; для шага инструкции — `target` это код работы, а `slot` — номер шага, начиная с 0.

## Файлы

- `index.html` — весь сайт
- `videos.json`, `photos.json` — видео и фото
- `sw.js`, `manifest.webmanifest`, иконки — работа без интернета и установка на телефон
- `robots.txt`, `sitemap.xml` — для поисковиков
