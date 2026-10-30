/* ---------- схемы, волна 3: симптомы, шаги клапанов/стоек/ступицы/ремня, подкапотное, низ машины, цилиндры, расшифровки ---------- */
/* мини-схемы «проблема → решение» к симптомам: 200×120 */
const mu = (body, label) => mini(body, label);
const TX = (x, y, t, anc = "middle", cls = "tl-xs") => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anc}">${t}</text>`;
const OKT = (x, y, t, anc = "middle") => `<text x="${x}" y="${y}" class="tl-okt" text-anchor="${anc}">${t}</text>`;
const BADT = (x, y, t, anc = "middle") => `<text x="${x}" y="${y}" class="tl-badt" text-anchor="${anc}">${t}</text>`;
const drop = (x, y, s, cls) => `<path d="M${x} ${y-s} C${x+s*0.9} ${y-s*0.1} ${x+s*0.75} ${y+s*0.85} ${x} ${y+s*0.85} C${x-s*0.75} ${y+s*0.85} ${x-s*0.9} ${y-s*0.1} ${x} ${y-s}Z" class="${cls}"/>`;
const cloud = (x, y, r, cls) => `<g class="${cls}"><circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x+r*0.8}" cy="${y+r*0.2}" r="${r*0.75}"/><circle cx="${x-r*0.8}" cy="${y+r*0.25}" r="${r*0.7}"/><circle cx="${x+r*0.1}" cy="${y-r*0.6}" r="${r*0.7}"/></g>`;
const wavesR = (x, y) => [10, 18, 26].map(r => `<path d="M${x+r*0.7} ${y-r*0.7} A${r} ${r} 0 0 1 ${x+r*0.7} ${y+r*0.7}" class="tl-warnl"/>`).join("");

const SYM_MINI = {
  softpedal: ok => mu(`<path d="M10 112 H190" class="tl-body"/><circle cx="46" cy="14" r="5" class="tl-part"/>
    <path d="M46 14 L${ok ? 58 : 66} ${ok ? 62 : 98}" class="tl-pedalarm"/><rect x="${ok ? 44 : 52}" y="${ok ? 60 : 96}" width="30" height="9" rx="3" class="tl-accf"/>
    <rect x="104" y="24" width="84" height="12" rx="6" class="tl-brakef"/><rect x="104" y="24" width="84" height="12" rx="6" class="tl-body"/>
    ${ok ? "" : [118, 140, 164].map(x => `<circle cx="${x}" cy="30" r="3.4" class="tl-part"/>`).join("")}
    ${ok ? OKT(146, 62, "педаль высоко") + TX(146, 76, "и упругая") : BADT(146, 62, "педаль у пола") + TX(146, 76, "воздух в трубке")}`,
    ok ? "Педаль высоко" : "Педаль проваливается"),
  pull: ok => { const W = (x, y, a) => `<rect x="${x-5}" y="${y-11}" width="10" height="22" rx="2" class="tl-fill2" transform="rotate(${a} ${x} ${y})"/><rect x="${x-5}" y="${y-11}" width="10" height="22" rx="2" class="tl-body" transform="rotate(${a} ${x} ${y})"/>`;
    return mu(`<rect x="76" y="22" width="48" height="90" rx="14" class="tl-part"/><rect x="82" y="40" width="36" height="20" rx="4" class="tl-glass"/>
    ${W(72, 38, ok ? 0 : -16)}${W(128, 38, 0)}${W(72, 94, 0)}${W(128, 94, 0)}
    ${ok ? `<path d="M100 18 V4" class="fx-arA"/>${head(100, 4, -90)}` : `<path d="M100 18 Q98 6 82 4" class="fx-arA"/>${head(82, 4, 180)}`}
    ${ok ? OKT(162, 60, "колёса") + OKT(162, 74, "ровно") : BADT(162, 60, "колесо") + BADT(162, 74, "под углом")}${TX(34, 66, ok ? "давление" : "развал-")}${TX(34, 78, ok ? "одинаковое" : "схождение")}`,
    ok ? "Колёса стоят ровно" : "Колесо стоит под углом"); },
  chainnoise: ok => mu(`<circle cx="140" cy="30" r="20" class="tl-part"/><circle cx="140" cy="30" r="4" class="tl-fill2"/><circle cx="64" cy="92" r="14" class="tl-part"/><circle cx="64" cy="92" r="3" class="tl-fill2"/>
    <path d="M${78} ${92} L${160} ${30}" class="tl-chain"/>
    ${ok ? `<path d="M50 92 L120 30" class="tl-chain"/><rect x="74" y="50" width="34" height="9" rx="4" class="tl-accf" transform="rotate(-42 91 54)"/>` : `<path d="M50 92 Q70 40 120 30" class="tl-chain"/>`}
    ${ok ? OKT(46, 30, "натянута") : BADT(46, 30, "провисла")}${ok ? "" : wavesR(170, 92)}`,
    ok ? "Цепь натянута" : "Цепь провисла"),
  fuelsmell: ok => mu(`<path d="M10 54 H92" class="tl-pipe2"/><path d="M86 54 H190" class="tl-hosethick2"/><rect x="96" y="44" width="10" height="20" rx="2" class="tl-accf"/>
    ${ok ? OKT(100, 96, "сухо, хомут затянут") : drop(108, 76, 6, "tl-fuelf") + drop(114, 98, 5, "tl-fuelf") + `<ellipse cx="112" cy="112" rx="28" ry="4" class="tl-fuelf"/>` + BADT(160, 92, "подтекает")}`,
    ok ? "Соединение сухое" : "Подтекает бензин"),
  puddle: ok => ok ? mu(`<path d="M20 70 Q30 40 70 38 H140 Q172 40 180 70 V84 H20Z" class="tl-part"/><circle cx="52" cy="86" r="14" class="tl-tyre"/><circle cx="150" cy="86" r="14" class="tl-tyre"/>
      <path d="M8 102 H192" class="tl-body"/>${drop(96, 94, 4, "tl-water")}<ellipse cx="96" cy="103" rx="14" ry="2.5" class="tl-water"/>${OKT(100, 22, "прозрачная вода —")}${TX(100, 118, "конденсат кондиционера, норма")}`, "Конденсат — норма")
    : mu(`${TX(100, 14, "цвет подскажет, что течёт", "middle", "tl-s")}
      ${drop(24, 52, 15, "tl-oildark")}${drop(74, 52, 15, "tl-coolf")}${drop(126, 52, 15, "tl-brakef")}${drop(176, 52, 15, "tl-water")}
      ${[24, 74, 126, 176].map(x => drop(x, 52, 15, "tl-body2")).join("")}
      ${TX(24, 88, "тёмная")}${TX(24, 104, "масло", "middle", "tl-badxs")}${TX(74, 88, "цветная")}${TX(74, 104, "антифриз", "middle", "tl-badxs")}
      ${TX(126, 88, "жёлтая")}${TX(126, 104, "тормозная", "middle", "tl-badxs")}${TX(176, 88, "прозрачн.")}${TX(176, 104, "вода", "middle", "tl-okxs")}`, "Цвет лужи"),
  suspknock: ok => mu(`<path d="M40 30 V90" class="tl-rod"/><circle cx="40" cy="22" r="11" class="tl-part"/><circle cx="40" cy="98" r="11" class="tl-part"/>
    <path d="M51 22 H90 M51 98 H90" class="tl-thin"/>${TX(104, 26, "к стабилизатору", "start")}${TX(104, 102, "к рычагу", "start")}
    ${ok ? `<path d="M30 30 Q40 40 50 30 M30 90 Q40 80 50 90" class="tl-body"/>` + OKT(140, 62, "люфта нет") : `<circle cx="40" cy="22" r="6" class="tl-fill"/><circle cx="43" cy="20" r="6" class="tl-part"/><path d="M28 32 l6 -4 l4 6 l6 -5" class="tl-warnl"/>` + `<path d="M16 22 h-8 M64 22 h8" class="tl-warnl"/>` + BADT(140, 62, "люфт в шарнире") + TX(140, 76, "стук на кочках")}`,
    ok ? "Стойка без люфта" : "Люфт в стойке"),
  hum: ok => mu(`<circle cx="70" cy="60" r="46" class="tl-part"/><circle cx="70" cy="60" r="24" class="tl-part"/><circle cx="70" cy="60" r="12" class="tl-fill2"/>
    ${Array.from({length: 10}, (_, i) => { const a = i * 36 * Math.PI / 180, x = 70 + 35 * Math.cos(a), y = 60 + 35 * Math.sin(a); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" class="${!ok && i % 3 === 0 ? "tl-warnf" : "tl-fill2"}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" class="tl-body"/>`; }).join("")}
    ${ok ? OKT(164, 56, "крутится") + OKT(164, 70, "тихо") : wavesR(116, 60) + BADT(170, 50, "износ") + TX(170, 66, "гудит") + TX(170, 78, "на скорости")}`,
    ok ? "Исправный подшипник" : "Изношенный подшипник"),
  shimmy: ok => mu(`<g transform="${ok ? "" : "rotate(-6 70 60)"}">${WHEEL(70, 60, 46)}${ok ? `<rect x="64" y="20" width="12" height="7" rx="2" class="tl-accf"/><rect x="64" y="93" width="12" height="7" rx="2" class="tl-accf"/>` : ""}</g>
    ${ok ? "" : `<path d="M16 30 q-6 30 0 60 M124 30 q6 30 0 60" class="tl-warnl"/>`}
    ${ok ? OKT(162, 50, "грузики") + OKT(162, 64, "на месте") + TX(162, 80, "в балансе") : BADT(162, 50, "биение") + TX(162, 64, "нет баланса") + TX(162, 76, "кривой диск")}`,
    ok ? "Колесо отбалансировано" : "Колесо бьёт"),
  cvjoint: ok => mu(`<path d="M8 60 H54" class="tl-rod"/><path d="M146 60 H192" class="tl-rod"/>
    <path d="M54 48 L64 38 L72 50 L80 36 L88 50 L96 34 L104 50 L112 36 L120 50 L128 40 L146 50 V70 L128 80 L120 70 L112 84 L104 70 L96 86 L88 70 L80 84 L72 70 L64 82 L54 72Z" class="tl-boot"/>
    <rect x="50" y="46" width="6" height="28" class="tl-accf"/><rect x="144" y="44" width="6" height="32" class="tl-accf"/>
    ${ok ? OKT(100, 106, "пыльник цел, хомуты на месте") : `<path d="M90 36 l6 14 l-4 8 l6 12" class="tl-warnl"/>` + [[70, 24], [108, 22], [128, 98], [84, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" class="tl-oildark"/>`).join("") + BADT(100, 114, "порван — смазку выбило")}`,
    ok ? "Пыльник цел" : "Пыльник порван"),
  smoke: ok => ok ? mu(`<path d="M8 76 H50" class="tl-pipe2"/><path d="M56 72 q10 -8 20 -4 q10 4 22 -2" class="tl-thin"/><path d="M58 80 q12 -4 24 0" class="tl-thin"/>${OKT(130, 60, "лёгкий пар")}${TX(130, 74, "в мороз — норма")}`, "Лёгкий пар")
    : mu(`<path d="M6 62 H30" class="tl-pipe2"/>${cloud(56, 40, 12, "tl-smokeW")}${cloud(112, 40, 12, "tl-smokeB")}${cloud(168, 40, 12, "tl-smokeK")}
      ${TX(56, 76, "белый")}${BADT(56, 92, "антифриз")}${TX(112, 76, "сизый")}${BADT(112, 92, "масло")}${TX(168, 76, "чёрный")}${BADT(168, 92, "смесь")}${TX(100, 114, "смотри на прогретом моторе")}`, "Цвет дыма"),
  sweetsmell: ok => mu(`<rect x="14" y="14" width="80" height="40" rx="6" class="tl-part"/>${TX(54, 38, "печка")}<rect x="50" y="54" width="10" height="16" class="tl-fill2"/>
    <path d="M10 100 H190" class="tl-body"/><rect x="40" y="94" width="120" height="6" rx="2" class="${ok ? "tl-fill2" : "tl-coolf"}"/>
    ${ok ? OKT(148, 40, "сухо") + TX(148, 54, "под ковриком") : drop(55, 76, 5, "tl-coolf") + drop(55, 88, 4, "tl-coolf") + BADT(150, 30, "течёт") + TX(150, 44, "радиатор печки") + TX(150, 58, "мокрый коврик")}`,
    ok ? "Сухо" : "Течёт печка"),
  idle: ok => { const nd = a => { const r = a * Math.PI / 180; return `<path d="M100 96 L${(100 + 62 * Math.cos(r)).toFixed(1)} ${(96 + 62 * Math.sin(r)).toFixed(1)}" class="tl-needle2"/>`; };
    return mu(`<path d="M30 96 A70 70 0 0 1 170 96" class="tl-body"/>${[0,1,2,3,4].map(i => { const a = (180 + i * 45) * Math.PI / 180; return `<path d="M${(100 + 70 * Math.cos(a)).toFixed(1)} ${(96 + 70 * Math.sin(a)).toFixed(1)} L${(100 + 60 * Math.cos(a)).toFixed(1)} ${(96 + 60 * Math.sin(a)).toFixed(1)}" class="tl-body"/>${TX((100 + 50 * Math.cos(a)).toFixed(1), (100 + 50 * Math.sin(a)).toFixed(1), i)}`; }).join("")}
    ${ok ? nd(216) : nd(200) + `<path d="M100 96 L${(100 + 62 * Math.cos(250 * Math.PI / 180)).toFixed(1)} ${(96 + 62 * Math.sin(250 * Math.PI / 180)).toFixed(1)}" class="tl-hid"/>` + `<path d="M58 48 A50 50 0 0 1 82 36" class="fx-arA"/>`}
    <circle cx="100" cy="96" r="5" class="tl-accf"/>${TX(100, 116, "×1000 об/мин")}${ok ? OKT(196, 16, "≈ 800, ровно", "end") : BADT(196, 16, "скачут", "end")}`,
    ok ? "Ровные обороты" : "Плавают обороты"); },
  stalls: ok => mu(`<circle cx="70" cy="60" r="44" class="tl-part"/><circle cx="70" cy="60" r="34" class="${ok ? "tl-glass" : "tl-soot"}"/><circle cx="70" cy="60" r="34" class="tl-body"/>
    <ellipse cx="70" cy="60" rx="8" ry="33" class="tl-fill2" transform="rotate(30 70 60)"/><ellipse cx="70" cy="60" rx="8" ry="33" class="tl-body" transform="rotate(30 70 60)"/>
    ${ok ? OKT(156, 54, "чистая") + OKT(156, 68, "заслонка") : BADT(158, 46, "нагар") + TX(158, 60, "на дросселе") + TX(158, 76, "глохнет") + TX(158, 88, "при сбросе газа")}`,
    ok ? "Чистый дроссель" : "Грязный дроссель"),
  jerks: ok => mu(`<rect x="30" y="16" width="44" height="58" rx="6" class="tl-fill2"/><rect x="30" y="16" width="44" height="58" rx="6" class="tl-body"/><rect x="44" y="74" width="16" height="30" class="tl-part"/>
    <path d="M60 30 Q120 10 150 40 T182 96" class="tl-wire2"/>
    ${ok ? OKT(100, 112, "искра только на свече") : `<path d="M40 30 l8 10 l-6 8 l10 12" class="tl-warnl"/><path d="M118 22 l8 -8 l2 8 l8 -8 M124 30 l12 2" class="tl-acc"/>` + BADT(100, 112, "пробой: искра мимо свечи")}`,
    ok ? "Зажигание исправно" : "Пробой зажигания"),
  batdrain: ok => mu(`<rect x="44" y="16" width="112" height="72" rx="8" class="tl-fill2"/><rect x="44" y="16" width="112" height="72" rx="8" class="tl-body"/>
    <rect x="58" y="28" width="84" height="34" rx="3" class="tl-lcdT"/><text x="100" y="52" class="tl-lcdt" text-anchor="middle">${ok ? "14,2" : "13,1"} В</text>
    ${TX(100, 78, "мотор заведён")}${ok ? OKT(100, 108, "генератор заряжает") : BADT(100, 108, "заряда мало — генератор")}`,
    ok ? "Зарядка в норме" : "Плохо заряжает"),
  gears: ok => mu(`<rect x="20" y="20" width="22" height="80" rx="3" class="tl-fill2"/><rect x="20" y="20" width="22" height="80" rx="3" class="tl-body"/>${TX(31, 114, "маховик")}
    <rect x="${ok ? 54 : 46}" y="28" width="8" height="64" rx="2" class="tl-padf"/><rect x="${ok ? 54 : 46}" y="28" width="8" height="64" rx="2" class="tl-body"/>${TX(58, 18, "диск")}
    <rect x="${ok ? 74 : 56}" y="24" width="16" height="72" rx="3" class="tl-part"/>${TX(98, 114, "корзина")}
    <path d="M90 60 H186" class="tl-rod"/>
    ${ok ? `<path d="M43 60 h10 M63 60 h10" class="tl-dim"/>` + OKT(144, 40, "зазор —") + OKT(144, 52, "диск свободен") : BADT(144, 40, "диск не отходит") + TX(144, 52, "«ведёт» сцепление")}`,
    ok ? "Сцепление выключается" : "Сцепление ведёт"),
  oilburn: ok => mu(`<path d="M60 10 V96" class="tl-rod"/><path d="M36 96 H84 L76 106 H44Z" class="tl-part"/><rect x="50" y="40" width="20" height="14" rx="4" class="${ok ? "tl-accf" : "tl-warnf"}"/>
    <path d="M14 60 H48 M72 60 H120" class="tl-body"/>${TX(110, 22, "колпачок", "start")}<path d="M108 18 L72 44" class="tl-lead"/>
    ${ok ? OKT(148, 76, "держит масло") : drop(62, 66, 4, "tl-oildark") + drop(62, 80, 4, "tl-oildark") + BADT(148, 72, "масло уходит") + TX(148, 86, "в цилиндр")}`,
    ok ? "Колпачок цел" : "Колпачок пропускает")
};
const SYM_MINI_CAP = {
  softpedal:["Педаль проваливается: в системе воздух или утечка","Педаль высоко и упругая — система прокачана"],
  pull:["Колесо стоит под углом — машину уводит","Схождение выставлено, давление одинаковое"],
  chainnoise:["Растянутая цепь шелестит и стучит","Цепь натянута, успокоитель цел"],
  fuelsmell:["Мокрое соединение топливной трубки","Сухо — запаха бензина быть не должно"],
  puddle:["По цвету лужи понятно, что течёт","Прозрачная вода летом — конденсат, это норма"],
  suspknock:["Люфт в стойке стабилизатора — стук на кочках","Новая стойка без люфта"],
  hum:["Изношенный ступичный подшипник гудит","Исправный подшипник крутится тихо"],
  shimmy:["Колесо без балансировки или с погнутым диском бьёт в руль","Грузики на диске — колесо отбалансировано"],
  cvjoint:["Порванный пыльник ШРУСа — скоро появится хруст","Целый пыльник держит смазку внутри"],
  smoke:["Цвет дыма подскажет причину","Лёгкий пар в мороз — это нормально"],
  sweetsmell:["Сладкий запах и мокрый коврик — течёт радиатор печки","Сухо — антифриз никуда не уходит"],
  idle:["Стрелка тахометра гуляет на холостых","Ровные обороты около 800"],
  stalls:["Нагар на дроссельной заслонке — мотор глохнет","Чистый дроссельный узел"],
  jerks:["Пробой провода или катушки — рывки и провалы","Исправное зажигание"],
  batdrain:["Меньше 13,5 В на заведённом моторе — плохо заряжает","13,8–14,5 В — зарядка в норме"],
  gears:["Сцепление «ведёт» — диск не освобождается, передачи хрустят","При выжатой педали диск свободен"],
  oilburn:["Изношенный маслосъёмный колпачок пропускает масло в цилиндр","Целый колпачок — масло не уходит"]
};

/* ---------- пошаговые картинки: 260×130 ---------- */
const STEP3 = {
  vcover: [() => sv(`<rect x="30" y="20" width="200" height="90" rx="12" class="tl-fill"/><rect x="30" y="20" width="200" height="90" rx="12" class="tl-body"/>
    ${[[50,34],[130,30],[210,34],[50,96],[130,100],[210,96]].map(([x,y]) => HX(x, y, 7, "tl-accf")).join("")}<rect x="112" y="52" width="36" height="24" rx="6" class="tl-part"/>
    ${L(148, 64, 200, 64, "горловина")}${L(130, 30, 150, 10, "гайки — ключ 10")}`, "Крышка клапанов"), "Гайки крышки — ключ на 10, крышку снимай вместе с прокладкой"],
  vtdc: [() => sv(`<circle cx="90" cy="76" r="44" class="tl-part"/><circle cx="90" cy="76" r="10" class="tl-fill2"/><path d="M90 32 V44" class="tl-mark"/>
    <path d="M60 18 L66 32 M90 12 V30 M120 18 L114 32" class="tl-body"/><path d="M90 8 V30" class="tl-acc"/>
    ${L(94, 38, 150, 50, "метка на шкиве")}${L(92, 14, 150, 18, "длинная метка — ВМТ")}${arc(90, 76, 54, 120, 60)}`, "Метки ВМТ"), "Проворачивай коленвал по часовой, пока метка на шкиве не встанет против длинной метки"],
  vnum: [() => sv(`<rect x="10" y="40" width="240" height="50" rx="8" class="tl-fill"/><rect x="10" y="40" width="240" height="50" rx="8" class="tl-body"/>
    ${Array.from({length:8}, (_, i) => `<circle cx="${28 + i*29}" cy="65" r="10" class="${i === 7 || i === 5 ? "tl-accf" : "tl-part"}"/><text x="${28 + i*29}" y="69.5" class="tl-numt" text-anchor="middle">${i + 1}</text>`).join("")}
    <path d="M10 20 H40" class="tl-chain"/>${T(46, 24, "цепь — перед мотора", "tl-s")}${T(130, 116, "в ВМТ 4-го цилиндра регулируй 6 и 8", "tl-s", "middle")}`, "Номера клапанов"), "Клапаны считают от передней части мотора, со стороны цепи"],
  vfeeler: [() => sv(`<circle cx="130" cy="34" r="22" class="tl-part"/><path d="M130 34 m-22 0 a22 22 0 0 0 44 0" class="tl-body"/><ellipse cx="130" cy="20" rx="14" ry="20" class="tl-part"/>
    <path d="M30 70 Q130 54 230 70 L230 80 Q130 66 30 80Z" class="tl-fill2"/><path d="M30 70 Q130 54 230 70 L230 80 Q130 66 30 80Z" class="tl-body"/>
    <rect x="60" y="57" width="150" height="4" rx="1" class="tl-accf" transform="rotate(-2 130 59)"/>
    ${L(132, 14, 196, 14, "кулачок")}${L(60, 74, 40, 104, "рычаг")}${L(200, 58, 220, 104, "щуп 0,15 мм")}`, "Щуп в зазоре"), "Щуп проходит между кулачком и рычагом с лёгким прижатием"],
  vadj: [() => sv(`<path d="M120 120 V40" class="tl-rod"/>${HX(120, 40, 12, "tl-part")}${HX(120, 72, 14, "tl-fill2")}
    <path d="M120 40 L40 24" class="tl-handle"/><path d="M134 72 L236 96" class="tl-handle"/>
    ${L(126, 34, 150, 14, "болт — ключ 13")}${L(130, 78, 150, 116, "контргайка — ключ 17")}`, "Регулировка"), "Держи болт ключом на 13, контргайку ослабляй и затягивай ключом на 17"],
  vseq: [() => sv(`${[["0°","8 и 6"],["180°","4 и 7"],["360°","1 и 3"],["540°","5 и 2"]].map(([a, v], i) => `<rect x="${8 + i*63}" y="30" width="56" height="62" rx="6" class="${i === 0 ? "tl-accf2" : "tl-part"}"/><text x="${36 + i*63}" y="54" class="tl-h" text-anchor="middle">${a}</text><text x="${36 + i*63}" y="78" class="tl-s" text-anchor="middle">${v}</text>${i < 3 ? `<path d="M${64 + i*63} 61 h7" class="fx-arA"/>` : ""}`).join("")}
    ${T(130, 18, "поворот коленвала → какие клапаны", "tl-s", "middle")}${T(130, 114, "каждый раз на пол-оборота по часовой", "tl-s", "middle")}`, "Порядок регулировки"), "От ВМТ 4-го цилиндра: 8 и 6 → 4 и 7 → 1 и 3 → 5 и 2, поворачивая коленвал на 180°"],
  lcheck: [() => sv(`<path d="M120 30 V100" class="tl-rod"/><circle cx="120" cy="24" r="12" class="tl-part"/><circle cx="120" cy="106" r="12" class="tl-part"/>
    <path d="M148 64 h40 M152 56 l-8 8 l8 8 M184 56 l8 8 l-8 8" class="fx-arA"/>${L(132, 26, 180, 20, "шарнир")}${L(108, 64, 40, 64, "покачай рукой", "end")}`, "Проверка стойки"), "Покачай стойку рукой: стук, люфт или порванный пыльник — менять"],
  lhold: [() => sv(`<path d="M40 64 H200" class="tl-rod"/>${HX(150, 64, 14, "tl-accf")}<path d="M150 64 L150 120" class="tl-handle"/>
    <path d="M200 64 h30" class="tl-hexkey"/><path d="M230 64 v-40" class="tl-hexkey"/>
    ${L(142, 72, 110, 112, "гайка — ключом", "end")}${L(226, 26, 200, 12, "шестигранник в торце пальца", "end")}`, "Держать палец"), "Палец крутится вместе с гайкой — держи его шестигранником в торце"],
  lwood: [() => sv(`<path d="M120 120 V70" class="tl-rod"/><rect x="100" y="52" width="40" height="18" rx="3" class="tl-wood"/><rect x="100" y="52" width="40" height="18" rx="3" class="tl-body"/>
    <rect x="96" y="10" width="48" height="22" rx="4" class="tl-fill2"/><rect x="96" y="10" width="48" height="22" rx="4" class="tl-body"/><path d="M144 21 H220" class="tl-handle"/>
    ${arr(120, 34, 120, 48)}${L(140, 60, 190, 66, "деревянная проставка")}${NO(60, 90, 12)}${T(60, 118, "напрямую — нельзя", "tl-s", "middle")}`, "Через проставку"), "Прикипевший палец бей только через деревянную проставку"],
  hrock: [() => sv(`${WHEEL(110, 66, 52)}<path d="M110 6 v-2 M110 126 v2" class="tl-body"/>
    <path d="M150 14 l14 -6 M150 118 l14 6" class="fx-arA"/><path d="M70 14 l-14 -6 M70 118 l-14 6" class="fx-arA"/>
    ${L(166, 40, 210, 40, "качни за верх")}${L(166, 92, 210, 96, "и за низ")}`, "Проверка люфта"), "Вывеси колесо, качни за верх и низ: люфт или стук — подшипник изношен"],
  hnut: [() => sv(`${WHEEL(70, 70, 48)}${HX(70, 70, 10, "tl-accf")}<path d="M70 70 L246 40" class="tl-handle"/>${arc(70, 70, 70, -40, -10)}
    ${L(80, 70, 120, 110, "гайка ступицы")}${L(200, 48, 200, 100, "длинный вороток")}`, "Срыв гайки"), "Гайку ступицы срывают на колёсах, помощник держит педаль тормоза"],
  hhang: [() => sv(`<path d="M120 4 V30" class="tl-wire3"/><path d="M120 30 q-8 6 0 12" class="tl-wire3"/>
    <rect x="90" y="42" width="60" height="50" rx="8" class="tl-fill2"/><rect x="90" y="42" width="60" height="50" rx="8" class="tl-body"/>
    <path d="M150 70 Q200 70 210 120" class="tl-hosethick"/>${L(124, 14, 170, 14, "проволока")}${L(140, 86, 200, 98, "шланг не натянут")}${NO(40, 70, 12)}${T(40, 100, "не висеть на шланге", "tl-xs", "middle")}`, "Подвесить суппорт"), "Суппорт подвесь на проволоке — не на тормозном шланге"],
  hpressOut: [() => sv(`<rect x="40" y="70" width="180" height="50" class="tl-fill"/><rect x="40" y="70" width="180" height="50" class="tl-body"/><rect x="96" y="70" width="68" height="40" class="tl-glass"/>
    <rect x="100" y="40" width="60" height="30" class="tl-part"/>${RIBS(100, 40, 60, 30, 3)}<rect x="96" y="22" width="68" height="16" rx="2" class="tl-accf"/>
    ${arr(130, 4, 130, 18)}${L(98, 30, 60, 14, "оправка", "end")}${L(160, 54, 228, 54, "подшипник")}${L(70, 96, 20, 60, "кулак", "end")}`, "Запрессовка в кулак"), "Подшипник запрессовывай только через наружное кольцо, ровно и до упора"],
  hpressIn: [() => sv(`<rect x="100" y="56" width="60" height="30" class="tl-part"/>${RIBS(100, 56, 60, 30, 3)}<rect x="116" y="86" width="28" height="36" class="tl-accf"/>
    <rect x="110" y="10" width="40" height="46" class="tl-fill2"/><rect x="110" y="10" width="40" height="46" class="tl-body"/><rect x="70" y="6" width="120" height="8" class="tl-part"/>
    ${arr(130, -2, 130, 4)}${L(150, 30, 200, 26, "ступица")}${L(144, 104, 190, 110, "упор")}`, "Ступица в подшипник"), "Ступицу запрессовывай, подпирая подшипник за внутреннее кольцо"],
  bcrack: [() => sv(`<rect x="10" y="44" width="240" height="42" rx="6" class="tl-belt2"/>${Array.from({length:11}, (_, i) => `<path d="M${22 + i*21} 46 v38" class="tl-thin"/>`).join("")}
    ${[44, 108, 170].map(x => `<path d="M${x} 46 l4 10 l-4 8 l5 10 l-3 10" class="tl-warnl"/>`).join("")}${L(110, 60, 150, 20, "трещины поперёк — менять")}${L(220, 70, 230, 110, "ручьи")}`, "Трещины ремня"), "Трещины поперёк ручьёв, расслоение, блеск — ремень пора менять"],
  bdefl: [() => sv(`<circle cx="40" cy="70" r="28" class="tl-part"/><circle cx="220" cy="70" r="34" class="tl-part"/><path d="M40 42 L220 36" class="tl-belt3"/><path d="M40 98 Q130 110 220 104" class="tl-belt3"/>
    <path d="M130 38 V52" class="tl-hid"/><path d="M130 8 V30" class="fx-arA"/>${head(130, 32, 90)}${TDIM(146, 38, 146, 52, "", 150, 46)}${T(156, 50, "10–15 мм", "tl-v")}
    ${L(40, 70, 20, 120, "шкив")}${L(126, 18, 70, 14, "нажми пальцем", "end")}`, "Прогиб ремня"), "Нажми пальцем посередине длинной ветви: прогиб 10–15 мм — норма"],
  bribs: [() => sv(`<path d="M20 80 H240" class="tl-body"/>${Array.from({length:6}, (_, i) => `<path d="M${40 + i*32} 80 l10 -24 l12 0 l10 24" class="tl-body"/>`).join("")}
    <path d="M38 56 ${Array.from({length:6}, (_, i) => `L${50 + i*32} 56 l12 0 L${72 + i*32} 80 L${82 + i*32} 56`).join(" ")} H234 V40 H38Z" class="tl-belt2"/>
    ${L(56, 66, 40, 112, "ручьи — точно в канавках")}`, "Ремень в канавках"), "Проверь, что ручьи ремня точно легли в канавки шкивов"]
};
for(const k in STEP3) STEP_SVG[k] = STEP3[k];
Object.assign(STEP_MAP, {
  valves:{4:"vcover",5:"vtdc",6:"vnum",7:"vfeeler",8:"vadj",9:"vseq"},
  stablink:{0:"lcheck",5:"lhold",6:"lwood"},
  hub:{0:"hrock",1:"hnut",3:"hhang",7:"hpressOut",8:"hpressIn"}
});
STEP_MAP.altbelt = Object.assign({1:"bcrack",2:"bdefl",6:"bribs"}, STEP_MAP.altbelt);

/* ---------- крупные подробные схемы ---------- */
/* под капотом: поперечный мотор (переднеприводные) и продольный (классика, Нива) */
function figHood(){
  const longi = RWD.has(fam) || fam === "travel";
  const box = (x, y, w, h, cls, rx = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="${cls}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" class="tl-body"/>`;
  const frame = `<path d="M40 40 Q300 0 560 40 V330 H40Z" class="tl-fill"/><path d="M40 40 Q300 0 560 40 V330 H40Z" class="tl-body"/>
    <path d="M40 330 H560" class="tl-body"/>${T(300, 352, "лобовое стекло ↓   ·   перед машины ↑", "tl-s", "middle")}
    <rect x="80" y="36" width="440" height="34" rx="4" class="tl-part"/>${RIBS(80, 36, 440, 34, 20)}`;
  const body = longi ? `
    ${box(220, 96, 160, 190, "tl-fill2", 10)}${T(300, 114, "мотор", "tl-s", "middle")}
    <rect x="250" y="120" width="100" height="70" rx="8" class="tl-part"/>${T(300, 160, "клапанная крышка", "tl-xs", "middle")}
    <circle cx="300" cy="230" r="30" class="tl-part"/>${T(300, 234, "фильтр", "tl-xs", "middle")}
    <path d="M250 94 Q300 80 350 94" class="tl-belt3"/>
    ${box(440, 230, 70, 80, "tl-term3")}<text x="458" y="250" class="tl-term2">+</text><text x="492" y="250" class="tl-term2">−</text>
    ${box(90, 250, 50, 46, "tl-brakef")}${box(440, 120, 56, 70, "tl-coolf")}${box(90, 96, 60, 70, "tl-water")}
    <path d="M206 140 V200" class="tl-stickT"/><circle cx="206" cy="136" r="7" class="tl-accf"/><circle cx="336" cy="134" r="9" class="tl-accf"/>
    ${TC(206, 136, 1, 150, 200)}${TC(336, 134, 2, 410, 150)}${TC(468, 155, 3, 540, 160)}${TC(115, 273, 4, 70, 230)}${TC(120, 130, 5, 70, 130)}${TC(475, 270, 6, 540, 270)}${TC(318, 244, 7, 410, 240)}${TC(300, 90, 8, 410, 84)}${TC(300, 52, 9, 200, 52)}`
  : `
    ${box(180, 110, 230, 120, "tl-fill2", 10)}${T(295, 178, "мотор", "tl-s", "middle")}${box(110, 120, 70, 100, "tl-part", 8)}${T(145, 174, "КПП", "tl-xs", "middle")}
    <rect x="410" y="110" width="22" height="120" rx="4" class="tl-belt2"/><rect x="214" y="122" width="160" height="40" rx="6" class="tl-part"/>
    ${box(80, 250, 76, 64, "tl-term3")}<text x="98" y="270" class="tl-term2">+</text><text x="138" y="270" class="tl-term2">−</text>
    ${box(170, 262, 54, 46, "tl-part")}${T(197, 290, "блок", "tl-xs", "middle")}
    ${box(250, 260, 52, 44, "tl-brakef")}${box(450, 230, 62, 70, "tl-coolf")}${box(460, 90, 60, 80, "tl-water")}${box(66, 80, 90, 34, "tl-glass")}
    <path d="M280 104 V130" class="tl-stickT"/><circle cx="280" cy="100" r="7" class="tl-accf"/><circle cx="320" cy="142" r="10" class="tl-accf"/>
    ${TC(280, 100, 1, 230, 84)}${TC(320, 142, 2, 380, 84)}${TC(481, 265, 3, 540, 300)}${TC(276, 282, 4, 300, 320)}${TC(490, 130, 5, 540, 130)}${TC(118, 282, 6, 60, 320)}${TC(197, 285, 7, 197, 320)}${TC(111, 97, 8, 60, 60)}${TC(421, 170, 9, 540, 200)}`;
  const items = longi
    ? ["Щуп уровня масла — слева от мотора","Горловина масла — на клапанной крышке","Бачок антифриза — справа","Бачок тормозной жидкости — слева у перегородки","Бачок омывателя","Аккумулятор","Воздушный фильтр (на карбюраторе — круглый корпус сверху)","Ремень генератора, спереди под крышкой — цепь ГРМ (на Ниве 1,8 — ремень)","Радиатор"]
    : ["Щуп уровня масла — спереди мотора","Горловина масла — на клапанной крышке","Бачок антифриза","Бачок тормозной жидкости — у перегородки со стороны водителя","Бачок омывателя","Аккумулятор","Блок предохранителей под капотом — рядом с аккумулятором","Воздушный фильтр","Ремень ГРМ и генератора — справа, под пластиковой крышкой"];
  return fig("0 0 600 360", frame + body,
    TLEG(items, "Схема показывает типичное расположение. У разных моделей и годов бачки и аккумулятор могут стоять иначе — ориентируйся на цвет крышек: масло — жёлтая или чёрная с маслёнкой, антифриз — с термометром, тормозная жидкость — с кругом и скобками."),
    longi ? "Что где под капотом: классика и Нива" : "Что где под капотом: переднеприводные Лады");
}
/* низ машины: сливные пробки, фильтр и точки для домкрата */
function figUnder(){
  const longi = RWD.has(fam) || fam === "travel";
  const jp = (x, y) => `<path d="M${x-9} ${y} L${x} ${y-12} L${x+9} ${y}Z" class="tl-accf"/>`;
  return fig("0 0 600 380", `
    <rect x="160" y="20" width="280" height="340" rx="60" class="tl-fill"/><rect x="160" y="20" width="280" height="340" rx="60" class="tl-body"/>
    ${[[150, 82], [450, 82], [150, 290], [450, 290]].map(([x, y]) => `<rect x="${x-14}" y="${y-32}" width="28" height="64" rx="6" class="tl-tyre"/>`).join("")}
    ${longi ? `
      <rect x="250" y="60" width="100" height="110" rx="10" class="tl-fill2"/><rect x="250" y="60" width="100" height="110" rx="10" class="tl-body"/>${T(300, 104, "поддон", "tl-xs", "middle")}
      ${HX(300, 140, 9, "tl-accf")}<rect x="356" y="96" width="26" height="40" rx="6" class="tl-fill2"/><rect x="356" y="96" width="26" height="40" rx="6" class="tl-body"/>
      <rect x="272" y="176" width="56" height="70" rx="8" class="tl-part"/>${T(300, 214, "КПП", "tl-xs", "middle")}${HX(300, 236, 7, "tl-accf")}
      <path d="M300 246 V300" class="tl-rod"/><rect x="190" y="290" width="220" height="22" rx="10" class="tl-part"/>${T(250, 305, "задний мост", "tl-xs", "middle")}
      ${TC(300, 140, 1, 520, 140)}${TC(369, 116, 2, 520, 100)}${TC(300, 236, 3, 520, 236)}`
    : `
      <rect x="230" y="50" width="140" height="80" rx="10" class="tl-fill2"/><rect x="230" y="50" width="140" height="80" rx="10" class="tl-body"/>${T(300, 86, "поддон", "tl-xs", "middle")}
      ${HX(300, 116, 9, "tl-accf")}<rect x="314" y="54" width="28" height="22" rx="6" class="tl-part"/>
      <rect x="186" y="60" width="44" height="70" rx="8" class="tl-part"/>${T(208, 98, "КПП", "tl-xs", "middle")}${HX(208, 120, 7, "tl-accf")}
      <rect x="200" y="290" width="200" height="14" rx="6" class="tl-part"/>${T(250, 286, "задняя балка", "tl-xs", "middle")}
      ${TC(300, 116, 1, 520, 140)}${TC(328, 65, 2, 520, 50)}${TC(208, 120, 3, 80, 160)}`}
    <path d="M300 ${longi ? 250 : 136} V340" class="tl-pipeT"/>${T(300, 372, "выхлопная труба — горячая", "tl-s", "middle")}
    ${jp(160, 132)}${jp(440, 132)}${jp(160, 248)}${jp(440, 248)}${TC(160, 126, 4, 80, 100)}${TC(440, 126, 4, 540, 200)}${TC(160, 242, 4, 80, 250)}${TC(440, 242, 4, 540, 260)}
    ${NO(longi ? 270 : 262, longi ? 96 : 90, 9)}${T(300, 30, "перед машины", "tl-s", "middle")}`,
    TLEG([longi ? "Сливная пробка поддона" : "Сливная пробка поддона (ключ, головка или квадрат — зависит от модели)",
          longi ? "Масляный фильтр — справа на блоке" : "Масляный фильтр — спереди мотора, удобнее снизу",
          longi ? "Пробки коробки: сливная снизу, заливная сбоку — уровень по нижнюю кромку отверстия" : "Пробки коробки передач",
          "Точки для домкрата — усилители на порогах за передними и перед задними колёсами"],
      "Под поддон, рычаги и днище домкрат не ставь — погнёшь. Под машину залезай только когда она стоит на подставках, а не на одном домкрате."),
    longi ? "Под машиной: классика и Нива" : "Под машиной: переднеприводные Лады");
}
/* номера цилиндров и порядок работы */
function figCyl(){
  const longi = RWD.has(fam) || fam === "travel";
  const order = longi ? [1, 2, 3, 4] : [4, 3, 2, 1];
  return fig("0 0 600 260", `
    <rect x="110" y="70" width="380" height="120" rx="14" class="tl-fill"/><rect x="110" y="70" width="380" height="120" rx="14" class="tl-body"/>
    ${order.map((n, i) => `<circle cx="${170 + i*87}" cy="130" r="36" class="tl-part"/><circle cx="${170 + i*87}" cy="130" r="22" class="${n === 1 ? "tl-accf" : "tl-fill2"}"/><text x="${170 + i*87}" y="137" class="tl-cyln" text-anchor="middle">${n}</text>
      <text x="${170 + i*87}" y="218" class="tl-s" text-anchor="middle">P030${n}</text>`).join("")}
    ${longi ? `<rect x="36" y="80" width="64" height="100" rx="8" class="tl-part"/>${T(68, 136, "цепь", "tl-xs", "middle")}${T(68, 60, "перед ↑", "tl-s", "middle")}`
            : `<rect x="500" y="80" width="64" height="100" rx="8" class="tl-belt2"/>${T(532, 200, "ремень ГРМ", "tl-xs", "middle")}${T(36, 136, "КПП", "tl-s", "start")}`}
    ${T(300, 40, "порядок работы: 1 → 3 → 4 → 2", "tl-h", "middle")}${T(300, 248, "код ошибки → номер цилиндра", "tl-s", "middle")}`,
    TLEG(longi ? ["Первый цилиндр — спереди, со стороны цепи (на Ниве 1,8 — со стороны ремня)", "Цилиндры идут назад к коробке: 1, 2, 3, 4", "Ошибка P0301–P0304 — пропуски в этом цилиндре: начни со свечи и провода именно его"]
               : ["Первый цилиндр — со стороны ремня ГРМ, справа по ходу машины", "Дальше к коробке передач: 2, 3, 4", "Ошибка P0301–P0304 — пропуски в этом цилиндре: начни со свечи и катушки именно его"],
      "Порядок работы у всех четырёхцилиндровых моторов Лады — 1-3-4-2. Провода и катушки меняй местами между цилиндрами: если ошибка переехала за катушкой — виновата катушка."),
    "Номера цилиндров");
}
/* шина: что написано на боковине */
function figTyre(){
  /* боковина — дуга круга с центром (300, 560): надписи ставим по углу, выноски — точно в них */
  const C = [300, 560], R = 420, P = (a, r = R) => [C[0] + r * Math.sin(a * Math.PI / 180), C[1] - r * Math.cos(a * Math.PI / 180)];
  const tok = (t, a, cls = "tl-tyret") => { const [x, y] = P(a); return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" class="${cls}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${a} ${x.toFixed(1)} ${y.toFixed(1)})">${t}</text>`; };
  const badge = (t, a) => { const [x, y] = P(a); return `<g transform="rotate(${a} ${x.toFixed(1)} ${y.toFixed(1)})"><rect x="${(x - 46).toFixed(1)}" y="${(y - 13).toFixed(1)}" width="92" height="26" rx="5" class="tl-part"/><text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" class="tl-tyres" text-anchor="middle">${t}</text></g>`; };
  const at = a => P(a).map(v => +v.toFixed(1));
  const band = (r1, r2) => { const a0 = -42, a1 = 42, [x1, y1] = P(a0, r1), [x2, y2] = P(a1, r1), [x3, y3] = P(a1, r2), [x4, y4] = P(a0, r2);
    return `M${x1} ${y1} A${r1} ${r1} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r2} ${r2} 0 0 0 ${x4} ${y4}Z`; };
  const twi = P(33, 470), lab = (a, r = 522) => P(a, r).map(v => +v.toFixed(1));
  return fig("0 0 600 330", `
    <path d="${band(490, 350)}" class="tl-tyre"/><path d="${band(455, 455).replace(/L.*$/, "")}" class="tl-thin"/>
    ${tok("185", -16)}${tok("/65", -9.4)}${tok("R15", -0.6)}${tok("88", 6.6)}${tok("T", 11.4)}
    ${badge("M+S ❄", -28)}${badge("DOT 1225", 23)}
    <path d="M${twi[0]} ${twi[1] - 9} l-8 13 h16z" class="tl-accf"/>
    ${[[-16, 1], [-9.4, 2], [-0.6, 3], [6.6, 4], [11.4, 5], [23, 6], [-28, 7]].map(([a, n]) => TC(...at(a).map((v, k) => k ? v - 14 : v), n, ...lab(a))).join("")}
    ${TC(twi[0], twi[1] - 10, 8, ...lab(33, 500))}`,
    TLEG(["185 — ширина шины, мм","65 — высота боковины в процентах от ширины (≈ 120 мм)","R — радиальная, 15 — диаметр диска в дюймах","88 — индекс нагрузки: до 560 кг на колесо","T — индекс скорости: до 190 км/ч (H — 210, V — 240)","DOT …1225 — дата выпуска: 12-я неделя 2025 года","M+S и снежинка в горах — зимняя шина","TWI — метка индикатора износа: протектор стёрся до неё — меняй"],
      "Остаток протектора по ПДД: летом не меньше 1,6 мм, зимой — не меньше 4 мм. Размер и индексы бери как в документах машины или на наклейке в проёме двери."),
    "Что написано на шине");
}
/* канистра масла: что смотреть */
function figOilCan(){
  return fig("0 0 600 330", `
    <path d="M150 60 H400 Q420 60 420 80 V300 Q420 316 404 316 H166 Q150 316 150 300Z" class="tl-fill2"/><path d="M150 60 H400 Q420 60 420 80 V300 Q420 316 404 316 H166 Q150 316 150 300Z" class="tl-body"/>
    <rect x="330" y="24" width="56" height="36" rx="6" class="tl-accf"/><rect x="330" y="24" width="56" height="36" rx="6" class="tl-body"/><path d="M420 110 Q470 110 470 170 Q470 220 420 220" class="tl-handle"/>
    <rect x="176" y="88" width="218" height="200" rx="8" class="tl-part"/>
    <text x="285" y="122" class="tl-s" text-anchor="middle">МОТОРНОЕ МАСЛО</text><text x="285" y="166" class="tl-oilbig" text-anchor="middle">5W-40</text>
    <text x="285" y="192" class="tl-h" text-anchor="middle">полусинтетика</text>
    <rect x="196" y="204" width="80" height="24" rx="4" class="tl-fill2"/><text x="236" y="221" class="tl-tyres" text-anchor="middle">API SN</text>
    <rect x="292" y="204" width="84" height="24" rx="4" class="tl-fill2"/><text x="334" y="221" class="tl-tyres" text-anchor="middle">ACEA A3/B4</text>
    <rect x="196" y="238" width="180" height="22" rx="4" class="tl-accf"/><text x="286" y="254" class="tl-s2" text-anchor="middle">Одобрено ПАО «АвтоВАЗ»</text>
    <text x="370" y="280" class="tl-s" text-anchor="end">4 л</text>
    ${TC(212, 152, 1, 90, 150)}${TC(226, 187, 2, 90, 200)}${TC(196, 216, 3, 90, 250)}${TC(376, 216, 4, 510, 260)}${TC(376, 249, 5, 510, 300)}${TC(386, 42, 6, 510, 42)}`,
    TLEG(["Вязкость: 5W — зимний пуск, 40 — густота на горячую","Тип основы: минеральное, полусинтетика или синтетика","API: S — бензин, вторая буква — поколение (SL, SM, SN, SP — чем дальше, тем новее)","ACEA: A3/B4 — для нагруженных моторов, подходит почти всем Ладам","Допуск АвтоВАЗа (для моторов Renault — RN0700 или RN0710)","Защита на крышке и код проверки — от подделок"],
      "Сначала смотри на вязкость и класс — они должны совпадать с требованиями мотора. Марка и красивые обещания на этикетке вторичны."),
    "Что смотреть на канистре масла");
}
/* аккумулятор: ёмкость, ток, полярность */
function figBattery(){
  const bat = (x, plusLeft, title) => `<rect x="${x}" y="70" width="230" height="150" rx="10" class="tl-fill2"/><rect x="${x}" y="70" width="230" height="150" rx="10" class="tl-body"/>
    <rect x="${x + (plusLeft ? 22 : 170)}" y="50" width="38" height="22" rx="3" class="tl-redf"/><rect x="${x + (plusLeft ? 170 : 22)}" y="50" width="38" height="22" rx="3" class="tl-part"/>
    <text x="${x + (plusLeft ? 41 : 189)}" y="66" class="tl-term">+</text><text x="${x + (plusLeft ? 189 : 41)}" y="66" class="tl-term2">−</text>
    <rect x="${x + 30}" y="104" width="170" height="70" rx="6" class="tl-part"/><text x="${x + 115}" y="132" class="tl-h" text-anchor="middle">12 В  60 А·ч</text><text x="${x + 115}" y="156" class="tl-s" text-anchor="middle">пуск. ток 550 А (EN)</text>
    <text x="${x + 115}" y="246" class="tl-h" text-anchor="middle">${title}</text><text x="${x + 115}" y="264" class="tl-s" text-anchor="middle">клеммы — к тебе</text>`;
  return fig("0 0 600 280", `${bat(40, false, "обратная: «+» справа")}${bat(330, true, "прямая: «+» слева")}
    ${TC(72, 128, 1, 18, 128)}${TC(72, 152, 2, 18, 180)}${TC(248, 56, 3, 300, 26)}`,
    TLEG(["Ёмкость, А·ч — бери такую же, как стояла, или чуть больше","Пусковой ток (EN) — чем больше, тем увереннее пуск в мороз","Полярность — смотри, с какой стороны «+», если повернуть клеммами к себе"],
      "Полярность бери как у старого аккумулятора: иначе провода не дотянутся. Перед покупкой сфотографируй старый — с клеммами и наклейкой."),
    "Как выбрать аккумулятор");
}
Object.assign(FIGS, {hood:figHood, under:figUnder, cyl:figCyl, tyre:figTyre, oilcan:figOilCan, batt:figBattery});
Object.assign(FIG_TITLE, {hood:"Схема: что где под капотом", under:"Схема: под машиной и точки для домкрата", cyl:"Схема: номера цилиндров", tyre:"Схема: что написано на шине", oilcan:"Схема: канистра масла", batt:"Схема: как выбрать аккумулятор"});
FIG_JOBS.levels = ["hood"].concat(FIG_JOBS.levels || []);
FIG_JOBS.season = ["hood"];
FIG_JOBS.oil = (FIG_JOBS.oil || []).concat(["under"]);
FIG_JOBS.wheel = ["under", "tyre"].concat(FIG_JOBS.wheel || []);
FIG_JOBS.plugs = (FIG_JOBS.plugs || []).concat(["cyl"]);
FIG_JOBS.battery = (FIG_JOBS.battery || []).concat(["batt"]);
