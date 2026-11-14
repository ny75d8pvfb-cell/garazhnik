# Слой «скругления и акценты» (14.11): вставляет round.css в index.html сразу после блока TC.
# Запуск из корня репо: python3 _src/feat/round_patch.py  (повторный запуск заменяет блок)
import re, os, importlib.util
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = os.path.join(ROOT, "index.html")
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
        out.append(",".join(PFX + s.strip() for s in css[i:j].split(",")) + css[j:k + 1]); i = k + 1
    return "".join(out)
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "round.css"), encoding="utf-8").read()
head, body = src.split("/*P*/", 1)
block = "/*RD-BEGIN*/\n" + head + prefix(body) + "\n/*RD-END*/\n"
s = open(P, encoding="utf-8").read()
s = re.sub(r"/\*RD-BEGIN\*/.*?/\*RD-END\*/\n", "", s, flags=re.S)
i = s.index("/*TC-END*/\n") + len("/*TC-END*/\n")
s = s[:i] + block + s[i:]
open(P, "w", encoding="utf-8").write(s)
print("ok")
