# -*- coding: utf-8 -*-
# Рисунок «Виды предохранителей и как отличить сгоревший» — SVG в стиле технических схем Гаражника.

def blade(x, y, w, h, color, amp, blown=False, legs=True, num_cls="tl-numt"):
    lw = max(8, w * 0.2); lh = min(h * 0.75, 42)
    s = []
    if legs:
        s.append(f'<rect x="{x + w*0.12:.1f}" y="{y + h - 2:.1f}" width="{lw:.1f}" height="{lh:.1f}" class="tl-fill2" stroke="var(--ink)" stroke-width="1.3"/>')
        s.append(f'<rect x="{x + w*0.88 - lw:.1f}" y="{y + h - 2:.1f}" width="{lw:.1f}" height="{lh:.1f}" class="tl-fill2" stroke="var(--ink)" stroke-width="1.3"/>')
    s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{color}" stroke="var(--ink)" stroke-width="1.6"/>')
    # окошко с перемычкой
    wx, wy, ww, wh = x + w*0.16, y + h*0.12, w*0.68, h*0.42
    s.append(f'<rect x="{wx:.1f}" y="{wy:.1f}" width="{ww:.1f}" height="{wh:.1f}" rx="2" fill="#fff" fill-opacity=".55" stroke="var(--ink)" stroke-width="1"/>')
    my = wy + wh/2
    if not blown:
        s.append(f'<path d="M{wx+3:.1f} {my:.1f} h{ww*0.25:.1f} q{ww*0.12:.1f} -{wh*0.35:.1f} {ww*0.25:.1f} 0 h{ww*0.5-6:.1f}" stroke="#2b2f33" stroke-width="2.4" fill="none"/>')
    else:
        s.append(f'<path d="M{wx+3:.1f} {my:.1f} h{ww*0.33:.1f}" stroke="#2b2f33" stroke-width="2.4" fill="none"/>')
        s.append(f'<path d="M{wx+ww*0.62:.1f} {my:.1f} H{wx+ww-3:.1f}" stroke="#2b2f33" stroke-width="2.4" fill="none"/>')
        s.append(f'<ellipse cx="{wx+ww*0.48:.1f}" cy="{my:.1f}" rx="{ww*0.16:.1f}" ry="{wh*0.32:.1f}" fill="#3a2a1e" fill-opacity=".55"/>')
    # контрольные точки сверху
    s.append(f'<rect x="{x + w*0.14:.1f}" y="{y-3:.1f}" width="{w*0.14:.1f}" height="5" fill="#c9ccd0" stroke="var(--ink)" stroke-width="1"/>')
    s.append(f'<rect x="{x + w*0.72:.1f}" y="{y-3:.1f}" width="{w*0.14:.1f}" height="5" fill="#c9ccd0" stroke="var(--ink)" stroke-width="1"/>')
    s.append(f'<text x="{x + w/2:.1f}" y="{y + h*0.86:.1f}" text-anchor="middle" fill="#14171a" style="font:700 {max(10, int(h*0.26))}px var(--f-mono)">{amp}</text>')
    return "".join(s)

def label(x, y, t, sub=""):
    out = f'<text x="{x}" y="{y}" text-anchor="middle" class="tl-h">{t}</text>'
    if sub: out += f'<text x="{x}" y="{y+17}" text-anchor="middle" class="tl-numt">{sub}</text>'
    return out

def figure():
    p = []
    p.append(blade(40, 70, 74, 60, "#d43b30", "10"))
    p.append(label(77, 205, "Целый", "перемычка видна"))
    p.append(blade(160, 70, 74, 60, "#d43b30", "10", blown=True))
    p.append(label(197, 205, "Сгоревший", "разрыв, нагар"))
    p.append(blade(290, 88, 50, 40, "#2f6fd0", "15"))
    p.append(label(315, 205, "Мини", "Веста, Ларгус"))
    p.append(blade(385, 60, 100, 76, "#3aa357", "30", legs=True))
    p.append(label(435, 205, "Макси", "под капотом"))
    # бочонок
    cx, cy = 560, 104
    p.append(f'<path d="M{cx-48} {cy} l10 -14 h76 l10 14 l-10 14 h-76 z" class="tl-part"/>')
    p.append(f'<rect x="{cx-46}" y="{cy-6}" width="10" height="12" fill="#c9ccd0" stroke="var(--ink)" stroke-width="1"/>')
    p.append(f'<rect x="{cx+36}" y="{cy-6}" width="10" height="12" fill="#c9ccd0" stroke="var(--ink)" stroke-width="1"/>')
    p.append(f'<path d="M{cx-36} {cy+12} H{cx+36}" stroke="#2b2f33" stroke-width="2.4"/>')
    p.append(f'<text x="{cx}" y="{cy+4}" text-anchor="middle" class="tl-numt">16 А</text>')
    p.append(label(cx, 205, "Бочонок", "классика, старая Нива"))
    # выноска на контрольные точки
    p.append('<path d="M60 64 L84 30" class="tl-lead"/><circle cx="60" cy="66" r="2.5" class="tl-dot"/>')
    p.append('<text x="88" y="28" class="tl-numt">контрольные точки — сюда щупы тестера</text>')
    p.append('<path d="M206 92 L236 44" class="tl-lead"/><text x="240" y="40" class="tl-numt" style="fill:var(--warn)">перемычка разорвана</text>')
    return '<svg viewBox="0 0 640 240" role="img" aria-label="Виды предохранителей: целый и сгоревший плоский, мини, макси, цилиндрический">' + "".join(p) + '</svg>'

if __name__ == "__main__":
    open("fusefig.svg", "w").write(figure())
