# -*- coding: utf-8 -*-
"""Публикует новые статьи Гаражника в Telegram-канал.

Запускается GitHub Actions (.github/workflows/telegram.yml) после пуша в main:
  python3 _src/tg_post.py stati/novaya-statya.html [stati/eshe.html ...]
Нужны переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (например, @garage4to).
Бот должен быть администратором канала с правом публиковать сообщения.
Перед отправкой ждёт, пока страница откроется на сайте (GitHub Pages обновляется 1–3 минуты).
"""
import html, json, os, re, sys, time, urllib.parse, urllib.request

SITE = "https://garazhnik-lada.ru"
MAX_POSTS = 5


def meta(path):
    s = open(path, encoding="utf-8").read()
    t = re.search(r"<title>(.*?)</title>", s, re.S)
    d = re.search(r'<meta name="description" content="(.*?)">', s, re.S)
    title = html.unescape(t.group(1)).replace(" — Гаражник", "").strip() if t else os.path.basename(path)
    desc = html.unescape(d.group(1)).strip() if d else ""
    return title, desc


def wait_live(url, minutes=10):
    for _ in range(minutes * 4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=15) as r:
                if r.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(15)
    return False


def send(token, chat, text):
    data = urllib.parse.urlencode({"chat_id": chat, "text": text, "parse_mode": "HTML",
                                   "link_preview_options": json.dumps({"prefer_large_media": True})}).encode()
    with urllib.request.urlopen(f"https://api.telegram.org/bot{token}/sendMessage", data, timeout=30) as r:
        res = json.load(r)
    if not res.get("ok"):
        raise RuntimeError(res)


def main(paths):
    token, chat = os.environ.get("TELEGRAM_BOT_TOKEN"), os.environ.get("TELEGRAM_CHAT_ID")
    paths = [p for p in paths if p.startswith("stati/") and p.endswith(".html") and not p.endswith("/index.html") and os.path.exists(p)]
    if not paths:
        print("Новых статей нет — публиковать нечего."); return
    if not token or not chat:
        print("::warning::Секреты TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы — пропускаю публикацию."); return
    for p in paths[:MAX_POSTS]:
        title, desc = meta(p)
        url = f"{SITE}/{p}"
        if not wait_live(url):
            print(f"::warning::{url} так и не открылась — пропускаю"); continue
        text = f"🔧 <b>Новое в Гаражнике</b>\n\n<b>{html.escape(title)}</b>\n{html.escape(desc)}\n\n{url}"
        send(token, chat, text)
        print("Опубликовано:", title)
        time.sleep(3)
    if len(paths) > MAX_POSTS:
        print(f"Остальные {len(paths) - MAX_POSTS} не публикую за один раз, чтобы не заспамить канал.")


if __name__ == "__main__":
    main(sys.argv[1:])
