/* ---------- новые схемы: клапаны, стойка стабилизатора, ступица, натяжитель Весты ---------- */
function figValves(){
  const order = [["ВМТ 4-го цилиндра","8 и 6"],["+ 180°","4 и 7"],["+ 180°","1 и 3"],["+ 180°","5 и 2"]];
  const rows = order.map(([a,b],i) => { const y = 64 + i*50;
    return `<rect x="352" y="${y}" width="230" height="40" rx="3" class="fx-window"/>
      <text x="366" y="${y+25}" class="fx-s">${a}</text><text x="566" y="${y+26}" class="fx-v" text-anchor="end">${b}</text>`; }).join("");
  const spring = Array.from({length:6}, (_,i) => `<path d="M${226} ${178+i*9} L${264} ${182+i*9}" class="fx-thread"/>`).join("");
  return fig("0 0 600 300", `
    <text x="160" y="22" class="fx-h" text-anchor="middle">Где мерить зазор</text>
    <circle cx="150" cy="92" r="34" class="fx-ring"/><path d="M150 58 q30 -6 34 30" class="fx-dim"/><circle cx="150" cy="92" r="9" class="fx-hub"/>
    <text x="198" y="70" class="fx-s">кулачок распредвала</text>
    <rect x="52" y="134" width="210" height="16" rx="6" class="fx-body"/>
    <text x="150" y="168" class="fx-s" text-anchor="middle">рычаг</text>
    <rect x="114" y="127" width="72" height="6" rx="1" class="fx-feeler"/>
    <path d="M186 130 L230 112" class="fx-lead"/><text x="234" y="112" class="fx-s fx-a">щуп 0,15 мм</text>
    <rect x="62" y="150" width="14" height="96" class="fx-metalf"/>
    <path d="M56 186 h26 l5 9 -5 9 h-26 l-5 -9z" class="fx-bolt"/>
    <path d="M51 196 L18 220" class="fx-lead"/><text x="16" y="236" class="fx-s">контргайка — ключ 17</text>
    <path d="M70 246 L70 262" class="fx-lead"/><text x="16" y="278" class="fx-s">регулировочный болт — ключ 13</text>
    <rect x="240" y="150" width="10" height="110" class="fx-metalf"/>${spring}
    <text x="276" y="232" class="fx-s">клапан</text>
    <text x="467" y="22" class="fx-h" text-anchor="middle">Порядок регулировки</text>
    <text x="467" y="46" class="fx-s" text-anchor="middle">положение коленвала → какие клапаны</text>
    ${rows}`,
    "Клапаны считают от передней части мотора, от цепи. Каждый следующий шаг — поворот коленвала на пол-оборота по часовой.",
    "Регулировка клапанов: где мерить зазор и порядок");
}
function figLink(){
  const kpg = fam === "kpg";
  return fig("0 0 560 250", `
    <path d="M30 60 H300 Q330 60 336 84" class="fx-ground"/>
    <text x="40" y="44" class="fx-s">стабилизатор</text>
    <circle cx="340" cy="92" r="13" class="fx-blackn"/><rect x="333" y="104" width="14" height="96" rx="4" class="fx-metalf"/><circle cx="340" cy="208" r="13" class="fx-blackn"/>
    <path d="M330 92 h-26" class="fx-pin"/><path d="M350 208 h26" class="fx-pin"/>
    <path d="M296 84 h-12 v16 h12z" class="fx-bolt"/><path d="M384 200 h12 v16 h-12z" class="fx-bolt"/>
    <path d="M284 92 L230 130" class="fx-lead"/><text x="100" y="146" class="fx-s fx-a">гайка — ключом</text>
    <path d="M362 150 L420 150" class="fx-lead"/><text x="426" y="146" class="fx-s">стойка стабилизатора</text>
    <text x="426" y="166" class="fx-s">(два шарнира)</text>
    <path d="M410 208 L470 236" class="fx-lead"/><text x="300" y="244" class="fx-s fx-a">палец держи шестигранником в торце</text>
    <rect x="420" y="190" width="120" height="40" rx="6" class="fx-body2"/><text x="480" y="215" class="fx-s" text-anchor="middle">${kpg ? "нижний рычаг" : "аморт. стойка"}</text>`,
    "Гайку откручивают ключом, а палец держат шестигранником или ключом за лыски, чтобы он не крутился вместе с гайкой.",
    "Стойка стабилизатора: что откручивать");
}
function figHub(){
  const balls = (x, y) => [0,1].map(i => `<circle cx="${x + i*34}" cy="${y}" r="9" class="fx-blackn"/>`).join("");
  return fig("0 0 600 300", `
    <rect x="150" y="40" width="200" height="56" class="fx-body"/><rect x="150" y="204" width="200" height="56" class="fx-body"/>
    <text x="250" y="74" class="fx-s" text-anchor="middle">поворотный кулак</text>
    <rect x="186" y="96" width="128" height="14" class="fx-metalf"/><rect x="186" y="190" width="128" height="14" class="fx-metalf"/>
    ${balls(233, 120)}${balls(233, 180)}
    <rect x="186" y="130" width="128" height="40" class="fx-disc"/>
    <rect x="60" y="138" width="430" height="24" rx="4" class="fx-hub"/>
    <text x="520" y="155" class="fx-s">ступица</text>
    <rect x="178" y="92" width="6" height="20" class="fx-amberf"/><rect x="316" y="92" width="6" height="20" class="fx-amberf"/>
    <rect x="178" y="188" width="6" height="20" class="fx-amberf"/><rect x="316" y="188" width="6" height="20" class="fx-amberf"/>
    <path d="M322 100 L392 70" class="fx-lead"/><text x="396" y="66" class="fx-s fx-a">стопорные кольца</text>
    <path d="M314 104 L392 100" class="fx-lead"/><text x="396" y="104" class="fx-s">наружное кольцо</text>
    <path d="M314 150 L392 128" class="fx-lead"/><text x="396" y="128" class="fx-s">внутреннее кольцо</text>
    <rect x="96" y="92" width="22" height="20" class="fx-amberf"/><rect x="96" y="188" width="22" height="20" class="fx-amberf"/>
    <path d="M70 102 H92" class="fx-arA"/><path d="M70 198 H92" class="fx-arA"/>
    <text x="20" y="34" class="fx-s fx-a">оправка жмёт</text><text x="20" y="50" class="fx-s fx-a">на наружное кольцо</text>
    <path d="M40 270 L60 290 M60 270 L40 290" class="fx-dimw"/><text x="70" y="286" class="fx-s">через внутреннее кольцо и молотком — нельзя</text>`,
    "Подшипник запрессовывают в кулак только через наружное кольцо, ступицу в подшипник — подпирая внутреннее кольцо.",
    "Ступичный подшипник: разрез и как запрессовывать");
}
function figTens(){
  if(fam !== "vesta") return "";
  return fig("0 0 360 240", `
    <circle cx="180" cy="120" r="70" class="fx-pulley"/>
    <circle cx="198" cy="112" r="22" class="fx-hub"/>
    <path d="M198 98 l12 7 v14 l-12 7 l-12 -7 v-14z" class="fx-bolt"/><text x="198" y="116" class="fx-numd" text-anchor="middle" style="font-size:11px">13</text>
    <path d="M150 152 l5 -8 5 8 -5 8z M150 152" class="fx-amberf"/><circle cx="155" cy="152" r="10" class="fx-dim"/>
    <path d="M140 152 L60 200" class="fx-lead"/><text x="12" y="218" class="fx-s fx-a">Torx T55 — поворот ролика</text>
    <path d="M212 104 L290 50" class="fx-lead"/><text x="230" y="40" class="fx-s">гайка — ключ 13</text>
    <path d="M110 70 A80 80 0 0 1 250 70" class="fx-arA"/>`,
    "Ослабь гайку на 13, поверни ролик ключом T55 — ремень ослабнет или натянется. Затем затяни гайку: 30–36 Н·м.",
    "Натяжной ролик ремня генератора Весты", true);
}
