import sys
D = "/tmp/claude-0/-home-claude/9d1a6a5e-378a-5b4d-97e7-14d4ea8a5fe0/scratchpad/feat/"
p = sys.argv[1]; s = open(p).read()
def R(o, n, cnt=1):
    global s
    assert s.count(o) == cnt, (s.count(o), o[:90]); s = s.replace(o, n)
R('const stepFig = (jobId, i) =>', open(D + "stepsT.js").read() + '\nconst stepFig = (jobId, i) =>')
R('  altbelt:{3:"altNut"},', '  altbelt:{4:"altNut"},')
# детальнее: система смазки
o_start = s.index('function figOilTech(){'); o_end = s.index('const ZOOM_HINT = ')
OIL = r'''function figOilTech(){
  return fig("0 0 600 340", `
    <path d="M150 58 h250 v14 h-250z" class="tl-fill2"/><path d="M150 58 h250 v14 h-250z" class="tl-body"/>${BOLTS(160,390,65,7)}
    <rect x="140" y="72" width="270" height="40" class="tl-fill"/><rect x="140" y="72" width="270" height="40" class="tl-body"/>
    <rect x="130" y="112" width="290" height="104" class="tl-fill"/><rect x="130" y="112" width="290" height="104" class="tl-body"/>
    ${[0,1,2,3].map(i => `<rect x="${160+i*62}" y="124" width="44" height="70" rx="4" class="tl-hid"/>`).join("")}
    <path d="M130 216 h290 l-30 66 h-230 z" class="tl-fill"/><path d="M138 248 h274 l-22 34 h-230z" class="tl-oilf"/><path d="M130 216 h290 l-30 66 h-230 z" class="tl-body"/>
    <path d="M300 270 v-50 h30" class="tl-hid"/><rect x="292" y="262" width="22" height="10" rx="2" class="tl-part"/>
    <rect x="320" y="34" width="40" height="24" rx="3" class="tl-part"/><path d="M326 34 v-6 h28 v6" class="tl-body"/>
    <path d="M190 58 V18" class="tl-stickT"/><circle cx="190" cy="14" r="6" class="tl-accf"/><path d="M190 216 V250" class="tl-hid"/>
    <rect x="420" y="140" width="16" height="22" class="tl-fill2"/><rect x="436" y="128" width="46" height="62" rx="7" class="tl-part"/>${RIBS(440,128,38,62,4)}
    <rect x="262" y="282" width="20" height="8" class="tl-accf"/>${HX(272,296,6)}
    <path d="M412 250 h50" class="tl-hid"/><text x="466" y="254" class="tl-s">уровень масла</text>
    ${TC(340,40,1,520,36)}${TC(190,14,2,70,26)}${TC(470,160,3,560,150)}${TC(272,296,4,160,320)}${TC(380,250,5,560,280)}${TC(300,266,6,420,320)}${TC(200,140,7,70,140)}${TC(270,65,8,70,80)}`,
    TLEG(["Маслозаливная горловина с крышкой","Щуп уровня масла","Масляный фильтр на блоке цилиндров","Сливная пробка с шайбой","Поддон картера","Маслоприёмник насоса","Цилиндры (блок двигателя)","Крышка головки блока"]),
    "Схема системы смазки: где заливать, где сливать");
}
function figJumpT(){
  const bat = (x, label, sub) => `<rect x="${x}" y="110" width="170" height="96" rx="8" class="tl-part"/>${RIBS(x,124,170,82,8)}
    <rect x="${x+24}" y="94" width="24" height="16" class="tl-redf"/><rect x="${x+122}" y="94" width="24" height="16" class="tl-fill2"/><rect x="${x+122}" y="94" width="24" height="16" class="tl-body"/>
    <text x="${x+36}" y="106" class="tl-term">+</text><text x="${x+134}" y="106" class="tl-term2">−</text>
    <text x="${x+85}" y="226" class="tl-h" text-anchor="middle">${label}</text><text x="${x+85}" y="244" class="tl-s" text-anchor="middle">${sub}</text>`;
  const n = (x, y, k) => `<circle cx="${x}" cy="${y}" r="12" class="tl-accf"/><text x="${x}" y="${y+5}" class="tl-numt2" text-anchor="middle">${k}</text>`;
  return fig("0 0 620 280", `${bat(20,"Донор","заведённая машина")}${bat(290,"Твой аккумулятор","разряженный")}
    <rect x="500" y="110" width="100" height="96" rx="6" class="tl-fill"/><rect x="500" y="110" width="100" height="96" rx="6" class="tl-hid"/><text x="550" y="150" class="tl-s" text-anchor="middle">голый металл</text><text x="550" y="166" class="tl-s" text-anchor="middle">мотора</text>
    <path d="M326 94 C326 30 56 30 56 94" class="tl-cableR"/><path d="M154 94 C154 46 560 46 560 120" class="tl-cableB"/>
    ${n(326,74,1)}${n(56,74,2)}${n(154,74,3)}${n(560,120,4)}`,
    TLEG(["Красный — на плюс разряженного аккумулятора","Красный — на плюс донора","Чёрный — на минус донора","Чёрный — на голый металл мотора, подальше от аккумулятора"], "Снимай в обратном порядке: 4 → 3 → 2 → 1."),
    "Как подключать провода для прикуривания");
}
'''
s = s[:o_start] + OIL + s[o_end:]
R('const FIGS = {oiltech:figOilTech, ', 'const FIGS = {oiltech:figOilTech, jumpT:figJumpT, ')
R('battery:["volt","jump"]', 'battery:["volt","jumpT"]')
CSS = r'''
.tl-xs{fill:var(--muted);font:500 10px var(--f-body)}
.stepsvg .tl-v{font-size:12px}
.tl-handle{stroke:var(--ink);stroke-width:7;stroke-linecap:round;fill:none;opacity:.85}
.tl-oring{fill:none;stroke:var(--amber);stroke-width:4}
.tl-oilline{stroke:var(--tl-oil);stroke-width:4;fill:none;stroke-linecap:round}
.tl-coolline{stroke:var(--tl-cool);stroke-width:4;fill:none;stroke-linecap:round}
.tl-wiperarm{stroke:var(--ink);stroke-width:6;stroke-linecap:round}
.tl-wire{stroke:var(--ink);stroke-width:5;fill:none;stroke-linecap:round}
.tl-tyre{fill:var(--tl-fill2);stroke:var(--ink);stroke-width:1.6}
.tl-spoke{stroke:var(--ink);stroke-width:5;stroke-linecap:round;opacity:.8}
.tl-beam{stroke:var(--amber);stroke-width:1.4;stroke-dasharray:4 3}
.tl-warnl{fill:none;stroke:var(--warn);stroke-width:2}
.tl-jack{stroke:var(--ink);stroke-width:4;fill:none;stroke-linejoin:round}
.tl-needle{stroke:var(--ink);stroke-width:2.5}
.tl-clamp{stroke:var(--ink);stroke-width:5;fill:none;stroke-linecap:round}
.tl-pedalarm{stroke:var(--ink);stroke-width:7;stroke-linecap:round}
.tl-pipeT{stroke:var(--muted);stroke-width:7;stroke-linecap:round}
.tl-lcdT{fill:#cfd8c0;stroke:var(--ink);stroke-width:1.2}
.tl-lcdt{fill:#1a2a10;font:600 17px var(--f-mono)}
.tl-probeR{stroke:#C0392B;stroke-width:3;fill:none}
.tl-probeB{stroke:var(--ink);stroke-width:3;fill:none}
.tl-redf{fill:#C0392B}
.tl-term{fill:#fff;font:700 13px var(--f-body);text-anchor:middle}
.tl-term2{fill:var(--ink);font:700 13px var(--f-body);text-anchor:middle}
.tl-spring{stroke:var(--ink);stroke-width:3;fill:none}
.tl-bar{stroke:var(--ink);stroke-width:14;fill:none;stroke-linecap:round;opacity:.25}
.tl-slot{stroke:var(--ink);stroke-width:3;fill:none;stroke-linecap:round}
.tl-hosethick{stroke:var(--ink);stroke-width:14;fill:none;stroke-linecap:round;opacity:.35}
.tl-stickT{stroke:var(--ink);stroke-width:3}
.tl-cableR{stroke:#C0392B;stroke-width:5;fill:none;stroke-linecap:round}
.tl-cableB{stroke:var(--ink);stroke-width:5;fill:none;stroke-linecap:round}
.stepfig svg .fx-arA{stroke:var(--amber)}
'''
R('.tl-fill{fill:var(--tl-fill)} .tl-fill2{fill:var(--tl-fill2)}', '.tl-fill{fill:var(--tl-fill)} .tl-fill2{fill:var(--tl-fill2)}' + CSS)
open(p, "w").write(s)
print("ok")
