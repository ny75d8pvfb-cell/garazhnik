/* ---------- картинки к шагам в чертёжном стиле ---------- */
const L = (x1, y1, x2, y2, s, anc = "start") => `<path d="M${x1} ${y1} L${x2} ${y2}" class="tl-lead"/><circle cx="${x1}" cy="${y1}" r="1.8" class="tl-dot"/><text x="${x2 + (anc === "start" ? 3 : anc === "end" ? -3 : 0)}" y="${y2 + 3.5}" class="tl-xs" text-anchor="${anc}">${s}</text>`;
const HX = (x, y, r = 7, cls = "tl-part") => hexBolt(x, y, r, cls);
const BOLTS = (x0, x1, y, n) => Array.from({length:n}, (_,i) => `<circle cx="${(x0 + (x1-x0)*i/(n-1)).toFixed(1)}" cy="${y}" r="2.6" class="tl-part"/>`).join("");
const RIBS = (x, y, w, h, n, vert = true) => Array.from({length:n}, (_,i) => vert ? `<path d="M${(x + w*(i+1)/(n+1)).toFixed(1)} ${y} v${h}" class="tl-thin"/>` : `<path d="M${x} ${(y + h*(i+1)/(n+1)).toFixed(1)} h${w}" class="tl-thin"/>`).join("");
const BKT = (x, y, w, h, lvl) => `<path d="M${x} ${y} L${x+5} ${y+h} H${x+w-5} L${x+w} ${y}" class="tl-body"/>${lvl ? `<path d="M${x+3+5*(h-lvl)/h} ${y+h-lvl} L${x+5} ${y+h} H${x+w-5} L${x+w-3-5*(h-lvl)/h} ${y+h-lvl}Z" class="tl-oilf"/>` : ""}`;
const WHEEL = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" class="tl-tyre"/><circle cx="${cx}" cy="${cy}" r="${r*0.66}" class="tl-part"/><circle cx="${cx}" cy="${cy}" r="${r*0.2}" class="tl-fill2"/><circle cx="${cx}" cy="${cy}" r="${r*0.2}" class="tl-body"/>`;
const GROUND = (y) => `<path d="M10 ${y} H250" class="tl-body"/>${Array.from({length:12}, (_,i) => `<path d="M${18+i*20} ${y} l-8 7" class="tl-thin"/>`).join("")}`;

const STEP_T = {
 drain: () => sv(`<path d="M30 12 H230 V20 H30Z" class="tl-fill2"/><path d="M30 12 H230 V20 H30Z" class="tl-body"/>${BOLTS(40,220,16,8)}
   <path d="M40 20 H220 L198 66 H62 Z" class="tl-fill"/><path d="M47 38 H213 L198 66 H62 Z" class="tl-oilf"/><path d="M40 20 H220 L198 66 H62 Z" class="tl-body"/>
   <rect x="121" y="66" width="18" height="3" class="tl-accf"/>${HX(130,74,7)}${arc(130,74,19,200,330)}
   <path d="M130 82 q2 9 0 22" class="tl-oilline"/>${BKT(100,104,60,22,10)}
   ${L(214,44,236,44,"поддон")}${L(139,68,176,90,"шайба")}${L(124,78,70,98,"пробка","end")}`, "Слив масла"),
 filterOff: () => sv(`<path d="M10 10 H70 V120 H10" class="tl-fill"/><path d="M70 10 V120" class="tl-body"/>
   <rect x="70" y="22" width="14" height="86" class="tl-fill2"/><rect x="70" y="22" width="14" height="86" class="tl-body"/>
   <rect x="84" y="18" width="78" height="94" rx="10" class="tl-part"/>${RIBS(90,18,66,94,6)}
   <rect x="78" y="56" width="92" height="12" rx="3" class="tl-accf"/><path d="M170 62 H244" class="tl-handle"/>${arc(123,62,64,-28,22)}
   ${L(40,30,40,30,"блок")}${L(160,30,190,20,"фильтр")}${L(166,60,200,90,"съёмник")}`, "Съёмник фильтра"),
 filterOn: () => sv(`<rect x="86" y="38" width="88" height="82" rx="12" class="tl-part"/>${RIBS(92,46,76,70,6)}
   <ellipse cx="130" cy="38" rx="36" ry="7" class="tl-oring"/><circle cx="130" cy="38" r="9" class="tl-fill2"/><circle cx="130" cy="38" r="9" class="tl-body"/>
   <path d="M196 20 q-10 6 -24 14" class="tl-oilline"/><circle cx="200" cy="18" r="4" class="tl-oilf"/>
   ${arc(130,64,64,-152,-28)}${L(98,38,40,22,"кольцо — смазать маслом","end")}${L(130,38,130,6,"резьба","middle")}`, "Новый фильтр"),
 pour: () => sv(`<path d="M20 84 H240 V122 H20Z" class="tl-fill"/><path d="M20 84 H240 V122 H20Z" class="tl-body"/>${RIBS(20,92,220,24,3,false)}
   <rect x="112" y="72" width="36" height="14" rx="3" class="tl-fill2"/><rect x="112" y="72" width="36" height="14" rx="3" class="tl-body"/>
   <path d="M98 18 H162 L138 60 H122 Z" class="tl-part"/><rect x="123" y="60" width="14" height="16" class="tl-part"/>
   <path d="M196 6 q-30 6 -60 34" class="tl-oilline"/><path d="M188 2 l28 -2 l8 26 l-24 10z" class="tl-part"/>
   ${L(148,78,184,70,"горловина")}${L(100,22,56,22,"воронка","end")}${L(36,100,36,100,"крышка ГБЦ")}`, "Залить масло"),
 clips: () => sv(`<rect x="34" y="56" width="192" height="62" rx="8" class="tl-fill"/><rect x="34" y="56" width="192" height="62" rx="8" class="tl-body"/>
   <rect x="34" y="34" width="192" height="22" rx="6" class="tl-fill2"/><rect x="34" y="34" width="192" height="22" rx="6" class="tl-body"/>
   ${[64,130,196].map(x => `<path d="M${x-7} 30 h14 v6 l-3 22 h-8 l-3 -22z" class="tl-accf"/>`).join("")}
   ${arr(130,26,130,4)}${L(203,44,236,22,"защёлка")}${L(60,90,60,90,"корпус фильтра")}`, "Защёлки корпуса"),
 seal: () => sv(`<rect x="36" y="18" width="188" height="96" rx="8" class="tl-fill"/><rect x="36" y="18" width="188" height="96" rx="8" class="tl-seal"/>
   <rect x="48" y="30" width="164" height="72" rx="3" class="tl-padf2"/>${RIBS(48,30,164,72,18)}<rect x="48" y="30" width="164" height="72" rx="3" class="tl-body"/>
   ${L(224,26,240,10,"уплотнитель","end")}`, "Уплотнитель"),
 wiper: () => sv(`<path d="M0 118 H260" class="tl-thin"/><path d="M30 112 L250 36" class="tl-wiperarm"/><path d="M60 102 L250 36" class="tl-thin"/>
   <circle cx="44" cy="106" r="16" class="tl-fill2"/><circle cx="44" cy="106" r="16" class="tl-body"/>${HX(44,106,7,"tl-accf")}${arc(44,106,26,205,330)}
   <path d="M64 88 l14 -10 l10 6 l-14 10z" class="tl-part"/>${L(80,82,110,60,"колпачок — снять")}${L(50,110,96,122,"гайка поводка")}`, "Поводок дворника"),
 cabinArrow: () => sv(`<rect x="52" y="14" width="156" height="66" rx="4" class="tl-padf2"/>${RIBS(52,14,156,66,16)}<rect x="52" y="14" width="156" height="66" rx="4" class="tl-body"/>
   <rect x="82" y="38" width="96" height="18" rx="2" class="tl-part"/><text x="130" y="51" class="tl-xs" text-anchor="middle">AIR FLOW ↓</text>
   ${arr(130,86,130,122)}${L(178,47,226,100,"стрелка по ходу воздуха — в салон","end")}`, "Стрелка фильтра"),
 wirePull: () => sv(`<rect x="60" y="78" width="140" height="48" class="tl-fill"/><path d="M60 78 H200" class="tl-body"/><rect x="112" y="78" width="36" height="48" class="tl-fill2"/><path d="M112 78 V126 M148 78 V126" class="tl-body"/>
   <rect x="118" y="44" width="24" height="44" rx="8" class="tl-accf"/><path d="M130 44 Q130 10 220 14" class="tl-wire"/>
   ${arr(160,62,160,30)}${NO(214,34,9)}${L(142,60,190,70,"наконечник — тянуть за него")}${L(200,16,240,30,"за провод нельзя","end")}${L(64,100,64,100,"головка")}`, "Снять провод"),
 coilPull: () => sv(`<rect x="60" y="86" width="140" height="40" class="tl-fill"/><path d="M60 86 H200" class="tl-body"/>
   <rect x="112" y="22" width="36" height="80" rx="6" class="tl-part"/>${RIBS(112,30,36,30,3,false)}<rect x="148" y="30" width="26" height="16" rx="3" class="tl-accf"/>
   ${HX(100,30,5)}<path d="M100 30 H112" class="tl-body"/>${arr(182,38,220,38)}${arr(130,16,130,2)}
   ${L(174,40,232,62,"фишка — отключить","end")}${L(98,30,40,22,"болт крепления","end")}${L(114,70,60,64,"катушка","end")}`, "Снять катушку"),
 blow: () => sv(`<rect x="60" y="50" width="140" height="76" class="tl-fill"/><path d="M60 50 H200" class="tl-body"/><rect x="114" y="50" width="32" height="76" class="tl-fill2"/><path d="M114 50 V126 M146 50 V126" class="tl-body"/>
   <rect x="122" y="96" width="16" height="22" class="tl-part"/><path d="M226 6 L156 40" class="tl-handle"/>${arr(150,44,134,60,"fx-arM")}
   ${[0,1,2,3].map(i => `<circle cx="${172+i*12}" cy="${56-i*9}" r="1.8" class="tl-dot"/>`).join("")}${L(226,8,240,26,"пистолет","end")}${L(130,100,70,110,"свеча","end")}${L(140,62,196,80,"колодец")}`, "Продуть колодец"),
 socket: () => sv(`<rect x="60" y="76" width="140" height="50" class="tl-fill"/><path d="M60 76 H200" class="tl-body"/><rect x="114" y="76" width="32" height="50" class="tl-fill2"/><path d="M114 76 V126 M146 76 V126" class="tl-body"/>
   <rect x="120" y="58" width="20" height="40" rx="3" class="tl-part"/>${RIBS(120,64,20,28,3,false)}<rect x="125" y="20" width="10" height="40" rx="2" class="tl-part"/>
   <circle cx="130" cy="18" r="9" class="tl-part"/><path d="M130 18 H236" class="tl-handle"/>${arc(130,18,66,-22,22)}
   ${L(140,78,186,64,"свечная головка")}${L(134,40,186,40,"удлинитель")}${L(230,18,240,4,"трещотка","end")}`, "Выкрутить свечу"),
 byHand: () => sv(`<rect x="60" y="86" width="140" height="40" class="tl-fill"/><path d="M60 86 H200" class="tl-body"/>${RIBS(116,90,28,30,4,false)}
   <rect x="118" y="38" width="24" height="54" rx="4" class="tl-part"/><rect x="122" y="22" width="16" height="18" rx="3" class="tl-fill2"/><rect x="122" y="22" width="16" height="18" rx="3" class="tl-body"/>
   ${arc(130,52,44,-205,22)}${L(142,60,190,52,"2–3 оборота рукой")}${L(130,100,70,112,"резьба головки","end")}`, "Наживить рукой"),
 torque: () => sv(`<path d="M28 70 H232" class="tl-handle"/><rect x="150" y="58" width="82" height="24" rx="6" class="tl-part"/>${RIBS(156,58,40,24,6)}
   <rect x="200" y="62" width="26" height="16" rx="2" class="tl-fill2"/><rect x="200" y="62" width="26" height="16" rx="2" class="tl-body"/>
   <circle cx="36" cy="70" r="13" class="tl-part"/>${HX(36,70,6,"tl-accf")}${arc(36,70,26,-60,30)}
   <text x="190" y="104" class="tl-v">щёлк</text>${L(213,64,236,40,"шкала момента","end")}${L(40,60,80,30,"головка")}`, "Динамометрический ключ"),
 radDrain: () => sv(`<rect x="30" y="8" width="190" height="90" rx="4" class="tl-fill"/>${RIBS(30,12,190,82,16)}<rect x="30" y="8" width="190" height="90" rx="4" class="tl-body"/>
   <rect x="22" y="8" width="8" height="90" class="tl-fill2"/><rect x="220" y="8" width="8" height="90" class="tl-fill2"/>
   <rect x="196" y="98" width="16" height="8" class="tl-part"/><path d="M198 106 h12 l-2 6 h-8z" class="tl-accf"/>${arc(204,108,15,200,330)}
   <path d="M204 114 q1 6 0 10" class="tl-coolline"/>${BKT(178,118,52,10)}${L(212,102,244,80,"сливная пробка (барашек)","end")}${L(40,50,40,50,"радиатор")}`, "Слив антифриза"),
 squeeze: () => sv(`<rect x="10" y="40" width="40" height="70" class="tl-fill"/><rect x="10" y="40" width="40" height="70" class="tl-body"/><rect x="214" y="30" width="40" height="90" class="tl-fill"/>${RIBS(214,30,40,90,4)}<rect x="214" y="30" width="40" height="90" class="tl-body"/>
   <path d="M50 70 C100 52 160 96 214 62" class="tl-hosethick"/>${arr(132,16,132,56)}${arr(132,124,132,86)}
   ${L(24,60,24,60,"мотор")}${L(234,50,234,50,"радиатор")}${L(160,82,190,110,"верхний патрубок")}`, "Сжать патрубок"),
 peek: () => sv(`${WHEEL(110,66,58)}${[0,72,144,216,288].map(a => { const r = a*Math.PI/180; return `<path d="M${(110+14*Math.cos(r)).toFixed(1)} ${(66+14*Math.sin(r)).toFixed(1)} L${(110+36*Math.cos(r)).toFixed(1)} ${(66+36*Math.sin(r)).toFixed(1)}" class="tl-spoke"/>`; }).join("")}
   <rect x="134" y="40" width="18" height="32" rx="3" class="tl-fill2"/><rect x="134" y="40" width="18" height="32" rx="3" class="tl-body"/><rect x="138" y="44" width="5" height="24" class="tl-padf"/>
   <path d="M250 18 L156 50 M250 34 L156 60" class="tl-beam"/><rect x="236" y="8" width="20" height="30" rx="4" class="tl-part"/>${L(141,56,170,108,"торец колодки")}`, "Колодки через диск"),
 discLip: () => sv(`<rect x="70" y="14" width="34" height="104" class="tl-fill2"/><rect x="104" y="14" width="40" height="104" class="tl-fill"/><path d="M104 22 h32 v88 h-32" class="tl-warnl"/>
   ${[34,48,62,76,90].map(y => `<path d="M104 ${y} h32" class="tl-thin"/>`).join("")}<rect x="136" y="14" width="8" height="104" class="tl-body"/>
   <path d="M70 14 h74 v104 h-74z" class="tl-body"/>${L(120,40,190,30,"борозды")}${L(140,16,190,10,"бортик по краю")}${L(86,70,30,90,"ступица","end")}`, "Износ диска"),
 brakeRes: () => sv(`<rect x="88" y="10" width="40" height="12" rx="3" class="tl-fill2"/><rect x="88" y="10" width="40" height="12" rx="3" class="tl-body"/>
   <rect x="70" y="22" width="76" height="96" rx="8" class="tl-part"/><path d="M71 62 H145 V110 a7 7 0 0 1 -7 7 h-60 a7 7 0 0 1 -7 -7z" class="tl-brakef"/>
   <path d="M146 44 h14 M146 86 h14" class="tl-body"/><text x="164" y="48" class="tl-v">MAX</text><text x="164" y="90" class="tl-v">MIN</text>${L(108,14,40,14,"крышка","end")}${L(80,90,40,100,"DOT-4","end")}`, "Тормозной бачок"),
 chock: () => sv(`${GROUND(112)}${WHEEL(100,66,46)}<path d="M150 112 L190 112 L150 80 Z" class="tl-accf"/>${L(170,100,206,80,"упор")}`, "Упор"),
 loosen: () => sv(`${GROUND(118)}${WHEEL(96,70,48)}${HX(96,40,6,"tl-accf")}<path d="M96 40 L214 10" class="tl-handle"/>${arc(96,40,46,-64,-12)}${L(206,12,240,30,"баллонный ключ","end")}`, "Сорвать болты"),
 jack: () => sv(`<path d="M6 36 H254 V48 H6Z" class="tl-fill2"/><path d="M6 36 H254 V48 H6Z" class="tl-body"/><path d="M118 48 v-6 h24 v6" class="tl-accf"/>
   <path d="M104 124 L130 86 L156 124 M104 52 L130 86 L156 52" class="tl-jack"/><path d="M96 124 H164 M112 52 H148" class="tl-body"/><path d="M156 86 H230" class="tl-handle"/>${GROUND(124)}
   ${L(130,42,190,18,"место под домкрат на пороге")}`, "Домкрат"),
 syringe: () => sv(`<rect x="30" y="22" width="70" height="92" rx="8" class="tl-part"/><path d="M31 54 H99 V106 a7 7 0 0 1 -7 7 h-54 a7 7 0 0 1 -7 -7z" class="tl-brakef"/>
   <rect x="150" y="38" width="78" height="22" rx="6" class="tl-part"/>${RIBS(150,38,60,22,6)}<path d="M150 49 L70 70" class="tl-needle"/><path d="M228 49 H252" class="tl-handle"/>${arr(244,72,214,72)}
   ${L(64,40,64,40,"бачок")}${L(190,40,220,22,"шприц или груша")}`, "Шприц"),
 piston: () => sv(`<rect x="30" y="26" width="92" height="88" rx="10" class="tl-fill"/><rect x="30" y="26" width="92" height="88" rx="10" class="tl-body"/>
   <rect x="58" y="44" width="54" height="52" class="tl-part"/><rect x="112" y="40" width="10" height="60" class="tl-part"/><rect x="122" y="44" width="10" height="52" class="tl-padf"/>
   <path d="M224 16 V124 M224 16 H190 M224 124 H190 M136 70 H214" class="tl-clamp"/><rect x="132" y="62" width="6" height="16" class="tl-accf"/>${arr(190,56,144,56)}
   ${L(84,70,40,122,"поршень","middle")}${L(127,50,160,22,"старая колодка")}${L(224,40,250,40,"струбцина","end")}`, "Вдавить поршень"),
 pedal: () => sv(`<path d="M150 6 L120 80" class="tl-pedalarm"/><circle cx="150" cy="6" r="5" class="tl-part"/><rect x="92" y="78" width="60" height="16" rx="4" class="tl-fill2"/><rect x="92" y="78" width="60" height="16" rx="4" class="tl-body"/>
   ${RIBS(92,78,60,16,6)}${arr(204,40,160,78)}<text x="206" y="34" class="tl-v">× 4–5</text>${L(110,94,60,116,"педаль тормоза","end")}`, "Педаль"),
 tensioner: () => sv(`<rect x="20" y="16" width="170" height="100" rx="8" class="tl-fill"/><rect x="20" y="16" width="170" height="100" rx="8" class="tl-body"/>${RIBS(20,16,170,100,4,false)}
   <rect x="190" y="52" width="16" height="28" class="tl-part"/>${HX(214,66,12,"tl-accf")}${arc(214,66,26,-70,40)}
   ${L(222,58,246,26,"колпачковая гайка","end")}${L(60,40,60,40,"головка блока")}`, "Натяжитель цепи"),
 rollerKey: () => sv(`<circle cx="104" cy="66" r="46" class="tl-part"/><circle cx="104" cy="66" r="34" class="tl-hid"/><circle cx="104" cy="66" r="9" class="tl-fill2"/>${HX(104,66,6)}
   <circle cx="86" cy="50" r="5" class="tl-accf"/><circle cx="122" cy="82" r="5" class="tl-accf"/><path d="M86 50 L122 82" class="tl-handle"/><path d="M104 66 L236 66" class="tl-handle"/>${arc(104,66,58,-28,28)}
   ${L(86,50,40,16,"отверстия под ключ","end")}${L(110,66,150,104,"гайка ролика")}`, "Натяжной ролик"),
 rollerMark: () => sv(`<circle cx="130" cy="66" r="52" class="tl-part"/><circle cx="130" cy="66" r="40" class="tl-fill"/><circle cx="130" cy="66" r="11" class="tl-fill2"/>${HX(130,66,6)}
   <path d="M130 66 L130 22" class="tl-mark"/><path d="M122 8 h16 l-8 10z" class="tl-accf"/>${L(138,12,200,14,"вырез на основании")}${L(130,32,200,44,"указатель")}`, "Метка ролика"),
 fuse: () => sv(`<rect x="24" y="16" width="212" height="100" rx="8" class="tl-fill"/><rect x="24" y="16" width="212" height="100" rx="8" class="tl-body"/>
   ${Array.from({length:12}, (_,i) => `<rect x="${38+(i%6)*30}" y="${30+Math.floor(i/6)*30}" width="16" height="22" rx="2" class="${i===3?"tl-accf":"tl-part"}"/>`).join("")}
   <rect x="38" y="90" width="40" height="20" rx="2" class="tl-part"/><rect x="88" y="90" width="40" height="20" rx="2" class="tl-part"/>${arr(136,10,136,28)}
   ${L(58,100,58,100,"реле")}${L(144,40,222,8,"схема — на крышке блока","end")}`, "Предохранитель"),
 quick: () => sv(`<path d="M6 70 H108" class="tl-pipeT"/><rect x="108" y="52" width="56" height="36" rx="6" class="tl-part"/><path d="M164 70 H254" class="tl-pipeT"/>
   <rect x="120" y="42" width="32" height="10" rx="3" class="tl-accf"/>${arr(136,12,136,40)}${arr(170,96,214,96)}
   ${L(152,46,200,24,"защёлка — нажать")}${L(214,96,240,116,"тянуть","end")}`, "Разъём"),
 primer: () => sv(`<rect x="50" y="40" width="110" height="70" rx="12" class="tl-fill"/><rect x="50" y="40" width="110" height="70" rx="12" class="tl-body"/>
   <circle cx="105" cy="75" r="22" class="tl-part"/><path d="M50 60 H20 M50 90 H20" class="tl-pipeT"/><path d="M160 60 L222 34" class="tl-handle"/>${arc(160,60,54,-40,-6)}
   ${L(216,36,246,58,"рычаг подкачки","end")}${L(60,50,60,50,"бензонасос")}`, "Подкачка"),
 bleedHold: () => sv(`<rect x="18" y="80" width="56" height="14" rx="4" class="tl-fill2"/><rect x="18" y="80" width="56" height="14" rx="4" class="tl-body"/>${arr(46,30,46,74)}<text x="46" y="114" class="tl-xs" text-anchor="middle">держит</text>
   <rect x="142" y="56" width="92" height="60" rx="10" class="tl-part"/>${HX(188,46,8,"tl-accf")}${arc(188,46,20,190,320)}<path d="M188 38 C 200 4, 248 10, 250 40" class="tl-hosec"/>
   ${L(194,44,236,70,"штуцер ½ оборота","end")}<text x="110" y="70" class="tl-v" text-anchor="middle">→</text>`, "Прокачка вдвоём"),
 meter: () => sv(`<rect x="22" y="58" width="128" height="62" rx="8" class="tl-part"/>${RIBS(22,72,128,48,4)}<rect x="40" y="46" width="20" height="12" class="tl-redf"/><rect x="110" y="46" width="20" height="12" class="tl-fill2"/>
   <rect x="166" y="8" width="84" height="112" rx="10" class="tl-part"/><rect x="176" y="18" width="64" height="30" rx="3" class="tl-lcdT"/><text x="208" y="40" class="tl-lcdt" text-anchor="middle">12,6</text>
   <circle cx="208" cy="78" r="16" class="tl-fill2"/><path d="M208 78 l8 -10" class="tl-body"/><text x="208" y="108" class="tl-xs" text-anchor="middle">V⎓</text>
   <path d="M50 46 Q86 4 190 96" class="tl-probeR"/><path d="M120 46 Q150 26 226 96" class="tl-probeB"/>`, "Мультиметр"),
 terminals: () => sv(`<rect x="40" y="56" width="180" height="64" rx="8" class="tl-part"/>${RIBS(40,70,180,50,6)}<rect x="60" y="40" width="30" height="18" class="tl-redf"/><rect x="170" y="40" width="30" height="18" class="tl-fill2"/><rect x="170" y="40" width="30" height="18" class="tl-body"/>
   <text x="75" y="53" class="tl-term">+</text><text x="185" y="53" class="tl-term2">−</text>
   <circle cx="185" cy="18" r="12" class="tl-accf"/><text x="185" y="23" class="tl-numt2" text-anchor="middle">1</text><circle cx="75" cy="18" r="12" class="tl-accf"/><text x="75" y="23" class="tl-numt2" text-anchor="middle">2</text>
   ${L(200,50,240,40,"ключ на 10","end")}`, "Порядок клемм"),
 boot: () => sv(`<path d="M20 20 H240 V112 H20Z" class="tl-fill"/><path d="M20 20 H240 V112 H20Z" class="tl-body"/><circle cx="120" cy="66" r="42" class="tl-fill2"/><circle cx="120" cy="66" r="42" class="tl-body"/>
   ${RIBS(84,40,72,52,5,false)}<circle cx="120" cy="66" r="12" class="tl-part"/>${arc(120,66,56,200,250)}${L(156,46,200,30,"резиновый пыльник")}${L(120,72,200,96,"разъём лампы")}`, "Пыльник"),
 spring: () => sv(`<circle cx="120" cy="66" r="46" class="tl-fill"/><circle cx="120" cy="66" r="46" class="tl-body"/><rect x="104" y="50" width="32" height="32" rx="3" class="tl-part"/>
   <path d="M80 30 Q120 112 160 30" class="tl-spring"/>${arr(160,30,200,14)}${L(96,58,40,30,"цоколь лампы","end")}${L(150,52,206,60,"проволочный фиксатор")}`, "Фиксатор"),
 noTouch: () => sv(`<ellipse cx="100" cy="46" rx="30" ry="36" class="tl-glass"/><ellipse cx="100" cy="46" rx="30" ry="36" class="tl-body"/><path d="M90 46 q10 -16 20 0" class="tl-acc"/>
   <rect x="82" y="80" width="36" height="16" class="tl-part"/><rect x="86" y="96" width="28" height="22" rx="2" class="tl-fill2"/><rect x="86" y="96" width="28" height="22" rx="2" class="tl-body"/>
   ${NO(100,40,18)}${arr(176,104,122,104)}${L(128,30,190,20,"колба — не трогать")}${L(176,104,236,104,"брать здесь","end")}`, "Лампа"),
 altNut: () => sv(`<circle cx="96" cy="70" r="44" class="tl-part"/>${RIBS(60,40,72,60,5)}<circle cx="96" cy="70" r="14" class="tl-fill2"/><circle cx="96" cy="70" r="14" class="tl-body"/>
   <path d="M130 30 Q190 14 220 40" class="tl-bar"/><path d="M146 26 Q186 16 206 32" class="tl-slot"/>${HX(176,22,8,"tl-accf")}${arc(176,22,20,200,330)}${arr(52,70,16,70)}
   ${L(184,24,236,52,"гайка на планке","end")}${L(60,86,40,118,"генератор","middle")}`, "Генератор"),
 hydro: () => sv(`<rect x="106" y="6" width="48" height="118" rx="20" class="tl-glass"/><rect x="106" y="6" width="48" height="118" rx="20" class="tl-body"/>
   <path d="M108 62 H152 V104 a20 20 0 0 1 -20 18 h-4 a20 20 0 0 1 -20 -18z" class="tl-coolf"/>
   <rect x="124" y="30" width="12" height="62" rx="5" class="tl-part"/>${[0,1,2,3,4].map(i => `<path d="M124 ${40+i*9} h6" class="tl-thin"/>`).join("")}<path d="M116 62 h28" class="tl-acc"/>
   ${L(136,58,196,40,"−40 °C — отсчёт по уровню")}${L(108,96,56,110,"антифриз","end")}`, "Ареометр"),
 temp: () => sv(`<rect x="64" y="8" width="18" height="92" rx="9" class="tl-glass"/><rect x="64" y="8" width="18" height="92" rx="9" class="tl-body"/><circle cx="73" cy="106" r="14" class="tl-redf"/><rect x="69" y="58" width="8" height="48" class="tl-redf"/>
   ${[0,1,2,3,4,5].map(i => `<path d="M82 ${20+i*14} h6" class="tl-thin"/>`).join("")}<text x="94" y="62" class="tl-v">+5 °C</text>${WHEEL(196,66,46)}${RIBS(158,30,76,72,6)}`, "Переобувка")
};
for(const k in STEP_T) if(STEP_SVG[k]) STEP_SVG[k][0] = STEP_T[k];
