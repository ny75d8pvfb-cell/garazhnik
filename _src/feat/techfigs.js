/* ---------- технические схемы: линии, номера деталей, расшифровка ---------- */
const TC = (x, y, n, tx, ty) => `<path d="M${x} ${y} L${tx} ${ty}" class="tl-lead"/><circle cx="${x}" cy="${y}" r="2.4" class="tl-dot"/><circle cx="${tx}" cy="${ty}" r="10.5" class="tl-num"/><text x="${tx}" y="${ty+4.2}" class="tl-numt" text-anchor="middle">${n}</text>`;
const TLEG = (items, note) => `<ol class="legend">${items.map(x => `<li>${x}</li>`).join("")}</ol>${note ? `<p class="figcap2">${note}</p>` : ""}`;
const TDIM = (x1, y1, x2, y2, label, lx, ly) => `<path d="M${x1} ${y1} L${x2} ${y2}" class="tl-dim"/><path d="M${x1-5} ${y1} h10 M${x2-5} ${y2} h10" class="tl-dim"/><text x="${lx}" y="${ly}" class="tl-v">${label}</text>`;

function figCaliperT(){
  const holes = [0,90,180,270].map(a => { const r = a*Math.PI/180; return `<circle cx="${(200+42*Math.cos(r)).toFixed(1)}" cy="${(160+42*Math.sin(r)).toFixed(1)}" r="7" class="tl-part"/>`; }).join("");
  return fig("0 0 600 330", `
    <circle cx="200" cy="160" r="122" class="tl-fill"/><circle cx="200" cy="160" r="122" class="tl-body"/>
    <circle cx="200" cy="160" r="104" class="tl-hid"/>
    <circle cx="200" cy="160" r="62" class="tl-part"/><circle cx="200" cy="160" r="20" class="tl-part"/>${holes}
    <path d="M300 64 h70 a14 14 0 0 1 14 14 v164 a14 14 0 0 1 -14 14 h-70 z" class="tl-fill2"/><path d="M300 64 h70 a14 14 0 0 1 14 14 v164 a14 14 0 0 1 -14 14 h-70 z" class="tl-body"/>
    <rect x="312" y="86" width="12" height="148" rx="2" class="tl-accf"/>
    <rect x="290" y="92" width="10" height="136" rx="2" class="tl-part"/>
    <circle cx="392" cy="88" r="11" class="tl-part"/><path d="M386 82 l12 12 M398 82 l-12 12" class="tl-thin"/>
    <circle cx="392" cy="232" r="11" class="tl-accf"/><path d="M385.5 228 h13 l-6.5 11z" class="tl-thin"/>
    <path d="M384 120 C430 110 450 80 470 60" class="tl-hose"/>
    <rect x="370" y="140" width="16" height="12" rx="2" class="tl-part"/><path d="M386 146 h14" class="tl-body"/>
    <path d="M430 210 A70 70 0 0 0 430 120" class="tl-acc" marker-end="url(#tlArr)"/>
    <defs><marker id="tlArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="tl-arrf"/></marker></defs>
    <text x="446" y="170" class="tl-s">откинь вверх</text>
    ${TC(110,110,1,40,40)}${TC(350,110,2,520,100)}${TC(318,200,3,520,200)}${TC(392,232,4,520,250)}${TC(392,88,5,520,40)}${TC(460,70,6,560,70)}${TC(386,146,7,520,150)}${TC(295,250,8,250,305)}`,
    TLEG(["Тормозной диск","Корпус суппорта (цилиндр)","Колодки","Нижний болт — ключ 13, палец держать ключом 17","Верхний болт — ось поворота, не трогать","Тормозной шланг — не перекручивать","Штуцер прокачки","Скоба (направляющая колодок)"],
      "Открути нижний болт — корпус поворачивается вверх на верхнем, колодки вынимаются."),
    "Передний тормоз: суппорт и колодки");
}
function figMarksT(){
  if(CHAIN.has(fam)) return "";
  const teeth = Array.from({length:40}, (_,i) => { const a = i*9*Math.PI/180; return `<path d="M${(150+86*Math.sin(a)).toFixed(1)} ${(150-86*Math.cos(a)).toFixed(1)} L${(150+96*Math.sin(a)).toFixed(1)} ${(150-96*Math.cos(a)).toFixed(1)}" class="tl-thin"/>`; }).join("");
  const ticks = [-4,-3,-2,-1,0,1,2,3,4].map(i => `<path d="M${450+i*20} 120 V${i===0?146:134}" class="${i===0?"tl-body":"tl-thin"}"/>`).join("");
  return fig("0 0 600 320", `
    <text x="150" y="22" class="tl-h" text-anchor="middle">Распредвал</text>
    <path d="M118 46 q32 -14 64 0 v18 h-64z" class="tl-fill2"/><path d="M118 46 q32 -14 64 0" class="tl-body"/>
    <path d="M150 40 l-7 14 h14z" class="tl-accf"/>
    <circle cx="150" cy="150" r="96" class="tl-part"/>${teeth}<circle cx="150" cy="150" r="86" class="tl-body"/>
    <circle cx="150" cy="150" r="48" class="tl-fill"/><circle cx="150" cy="150" r="14" class="tl-part"/>
    <path d="M150 66 v-8" class="tl-mark"/>
    <path d="M60 230 q-20 -80 10 -140" class="tl-belt"/><path d="M240 230 q20 -80 -10 -140" class="tl-belt"/>
    <text x="450" y="22" class="tl-h" text-anchor="middle">Окно картера сцепления</text>
    <rect x="356" y="70" width="188" height="140" rx="10" class="tl-fill"/><rect x="356" y="70" width="188" height="140" rx="10" class="tl-body"/>
    <path d="M366 170 Q450 196 534 170 V200 H366 Z" class="tl-fill2"/>
    ${ticks}<path d="M450 160 v34" class="tl-mark"/>
    <text x="450" y="112" class="tl-v" text-anchor="middle">0</text>
    <text x="368" y="112" class="tl-s">шкала</text>
    ${TC(150,52,1,60,40)}${TC(150,64,2,250,52)}${TC(240,150,3,286,150)}${TC(450,176,4,450,250)}${TC(500,128,5,560,250)}
    <text x="150" y="282" class="tl-s" text-anchor="middle">1 и 2 должны стоять напротив друг друга</text>
    <text x="450" y="282" class="tl-s" text-anchor="middle">4 — напротив среднего деления «0»</text>`,
    TLEG(["Метка на задней крышке ремня («усик»)","Метка на шкиве распредвала","Зубчатый шкив распредвала","Риска на маховике","Шкала в смотровом окне картера сцепления"],
      "Обе пары меток совпали одновременно — поршень 1-го цилиндра в верхней мёртвой точке. Коленвал проворачивай только по часовой. На 16-клапанных моторах метки есть на обоих шкивах распредвалов."),
    "Метки ГРМ: распредвал и маховик");
}
function figBeltT(){
  return fig("0 0 600 300", `
    <path d="M118 74 L452 96 M118 246 L452 214" class="tl-belt"/>
    <path d="M118 74 A86 86 0 0 0 118 246" class="tl-belt"/><path d="M452 96 A59 59 0 0 1 452 214" class="tl-belt"/>
    <circle cx="118" cy="160" r="80" class="tl-part"/><circle cx="118" cy="160" r="66" class="tl-hid"/><circle cx="118" cy="160" r="16" class="tl-fill2"/>
    <circle cx="452" cy="155" r="53" class="tl-part"/><circle cx="452" cy="155" r="40" class="tl-hid"/><circle cx="452" cy="155" r="12" class="tl-fill2"/>
    <circle cx="300" cy="240" r="22" class="tl-part"/><circle cx="300" cy="240" r="6" class="tl-fill2"/>
    <path d="M300 34 V74" class="tl-acc" marker-end="url(#tlArr2)"/>
    <defs><marker id="tlArr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="tl-arrf"/></marker></defs>
    <path d="M300 86 L300 100" class="tl-dim"/><path d="M286 86 h28 M286 100 h28" class="tl-dim"/>
    <path d="M118 74 L452 96" class="tl-ghost" transform="translate(0 0)"/>
    <path d="M118 74 Q300 100 452 96" class="tl-accline"/>
    <text x="318" y="98" class="tl-v">10–15 мм</text><text x="310" y="30" class="tl-s">нажми пальцем ≈ 10 кг</text>
    ${TC(70,110,1,30,40)}${TC(480,120,2,560,60)}${TC(300,240,3,300,290)}${TC(220,82,4,200,40)}`,
    TLEG(["Шкив коленвала","Шкив генератора","Натяжной ролик или планка натяжения (зависит от модели)","Поликлиновой ремень"],
      "Прогиб больше — ремень свистит и проскальзывает. Меньше — перетянут, быстрее изнашиваются подшипники генератора и ролика."),
    "Ремень генератора: как проверить натяжение");
}
function figGapT(){
  const f = F();
  const ribs = [0,1,2,3,4].map(i => `<path d="M230 ${40+i*14} h80" class="tl-thin"/>`).join("");
  const thr = Array.from({length:9}, (_,i) => `<path d="M236 ${206+i*7} l68 4" class="tl-thin"/>`).join("");
  return fig("0 0 600 360", `
    <rect x="258" y="6" width="24" height="26" rx="3" class="tl-part"/>
    <rect x="230" y="32" width="80" height="78" rx="12" class="tl-part"/>${ribs}
    <path d="M222 110 h96 l-6 40 h-84z" class="tl-fill2"/><path d="M222 110 h96 l-6 40 h-84z" class="tl-body"/>
    <path d="M228 150 h84 v14 h-84z" class="tl-accf"/>
    <rect x="236" y="164" width="68" height="40" class="tl-part"/>
    <rect x="236" y="204" width="68" height="66" class="tl-fill"/>${thr}<rect x="236" y="204" width="68" height="66" class="tl-body"/>
    <path d="M254 270 l12 30 h8 l12 -30" class="tl-part"/>
    <rect x="265" y="296" width="10" height="16" class="tl-part"/>
    <path d="M300 270 v58 h-36 v-8 h28 v-50" class="tl-part"/>
    <rect x="200" y="312" width="140" height="6" class="tl-accf"/>
    <path d="M350 312 v8" class="tl-dim"/><path d="M342 312 h16 M342 320 h16" class="tl-dim"/>
    <text x="362" y="322" class="tl-v">${esc(f.plugGap || "по руководству")}</text>
    ${TC(270,18,1,140,18)}${TC(240,70,2,140,70)}${TC(230,130,3,140,130)}${TC(262,157,4,140,160)}${TC(240,240,5,140,240)}${TC(270,304,6,140,300)}${TC(298,300,7,440,280)}${TC(210,315,8,140,340)}`,
    TLEG(["Контактная гайка","Изолятор с рёбрами","Шестигранник под свечной ключ","Уплотнительное кольцо","Резьба","Центральный электрод","Боковой электрод — подгибается для регулировки","Щуп в зазоре"],
      "Щуп должен проходить между электродами с лёгким трением. Зазор регулируют только подгибая боковой электрод — центральный трогать нельзя."),
    "Свеча зажигания: устройство и зазор");
}
function figPadsT(){
  const pad = (x, mat, worn) => `<rect x="${x}" y="70" width="18" height="150" class="tl-part"/>
    <rect x="${x+18}" y="76" width="${mat}" height="138" class="${worn ? "tl-warnf" : "tl-padf"}"/><rect x="${x+18}" y="76" width="${mat}" height="138" class="tl-body"/>
    <rect x="${x+18+mat+4}" y="56" width="16" height="178" class="tl-fill2"/><rect x="${x+18+mat+4}" y="56" width="16" height="178" class="tl-body"/>`;
  return fig("0 0 600 300", `
    <text x="150" y="30" class="tl-h" text-anchor="middle">Новая колодка</text>
    ${pad(90, 48)}
    <path d="M108 248 h48" class="tl-dim"/><path d="M108 242 v12 M156 242 v12" class="tl-dim"/><text x="112" y="268" class="tl-v">≈ 10–12 мм</text>
    <text x="450" y="30" class="tl-h" text-anchor="middle">Пора менять</text>
    ${pad(400, 6, 1)}
    <path d="M418 248 h6" class="tl-dim"/><path d="M418 242 v12 M424 242 v12" class="tl-dim"/><text x="432" y="268" class="tl-v tl-warnt">меньше 1,5 мм</text>
    ${TC(99,150,1,40,110)}${TC(130,150,2,40,170)}${TC(170,150,3,236,110)}${TC(421,150,4,520,150)}`,
    TLEG(["Металлическое основание колодки","Фрикционная накладка","Тормозной диск","Накладка стёрта — скоро металл пойдёт по диску"],
      "Смотри на накладку с торца суппорта. Меньше 1,5 мм — меняй колодки на обеих сторонах оси. Скрежет металла — износ уже до основания, проверь и диски."),
    "Тормозная колодка: новая и изношенная");
}
function figTankT(){
  return fig("0 0 600 330", `
    <rect x="236" y="22" width="68" height="24" rx="4" class="tl-fill2"/><rect x="236" y="22" width="68" height="24" rx="4" class="tl-body"/>
    <path d="M244 22 v-6 h52 v6" class="tl-thin"/>
    <rect x="190" y="46" width="160" height="230" rx="18" class="tl-part"/>
    <path d="M192 176 h156 v82 a16 16 0 0 1 -16 16 h-124 a16 16 0 0 1 -16 -16z" class="tl-coolf"/>
    <path d="M190 120 h-26 M190 200 h-26" class="tl-body"/>
    <text x="156" y="124" class="tl-v" text-anchor="end">MAX</text><text x="156" y="204" class="tl-v" text-anchor="end">MIN</text>
    <path d="M192 176 h156" class="tl-acc"/>
    <path d="M350 250 h50 q16 0 16 16 v40" class="tl-hose"/><path d="M350 90 h60" class="tl-hose"/>
    ${TC(270,30,1,420,30)}${TC(340,176,2,450,150)}${TC(260,230,3,450,230)}${TC(400,250,4,520,300)}${TC(400,90,5,520,90)}`,
    TLEG(["Пробка — на горячем моторе не открывать","Уровень на холодном моторе: чуть выше MIN","Антифриз","Шланг к системе охлаждения","Пароотводящий шланг"],
      "Проверяй на холодном моторе на ровной площадке. Уровень ушёл ниже MIN — долей того же типа антифриза и ищи утечку."),
    "Расширительный бачок: уровень антифриза");
}
function figDipT(){
  return fig("0 0 600 220", `
    <circle cx="40" cy="70" r="16" class="tl-accf"/><circle cx="40" cy="70" r="7" class="tl-part"/>
    <rect x="56" y="64" width="40" height="12" rx="3" class="tl-fill2"/>
    <path d="M96 70 H540" class="tl-stick"/>
    <rect x="400" y="62" width="140" height="16" rx="3" class="tl-oilf"/>
    <path d="M400 54 v32 M470 54 v32" class="tl-body"/>
    <text x="400" y="104" class="tl-v" text-anchor="middle">MIN</text><text x="470" y="104" class="tl-v" text-anchor="middle">MAX</text>
    <path d="M400 130 h70" class="tl-dim"/><path d="M400 124 v12 M470 124 v12" class="tl-dim"/><text x="410" y="152" class="tl-s">≈ 1 л масла между метками</text>
    ${TC(40,70,1,40,150)}${TC(300,70,2,300,150)}${TC(435,62,3,520,30)}${TC(540,70,4,575,150)}`,
    TLEG(["Ручка щупа","Стержень щупа","Масляная плёнка — верхний край должен быть между MIN и MAX","Конец щупа"],
      "Проверяй на ровном месте через 5–10 минут после остановки мотора: вынь, протри, вставь до упора и снова вынь. Между метками — около литра."),
    "Щуп: как читать уровень масла");
}
function figAirT(){
  const pleats = Array.from({length:22}, (_,i) => `<path d="M${120+i*14} 120 v100" class="tl-thin"/>`).join("");
  const dirty = Array.from({length:22}, (_,i) => `<path d="M${120+i*14} 120 v100" class="tl-thin"/>`).join("");
  return fig("0 0 600 300", `
    <rect x="96" y="40" width="360" height="40" rx="8" class="tl-fill2"/><rect x="96" y="40" width="360" height="40" rx="8" class="tl-body"/>
    <path d="M90 60 h-20 M462 60 h20" class="tl-body"/><rect x="62" y="52" width="12" height="18" class="tl-accf"/><rect x="478" y="52" width="12" height="18" class="tl-accf"/>
    <rect x="104" y="110" width="344" height="120" rx="4" class="tl-padf2"/>${pleats}<rect x="104" y="110" width="344" height="120" rx="4" class="tl-body"/>
    <rect x="100" y="106" width="352" height="128" rx="6" class="tl-seal"/>
    <path d="M96 240 h360 v40 h-360z" class="tl-fill"/><path d="M96 240 h360 v40 h-360z" class="tl-body"/>
    <path d="M276 30 v-14" class="tl-acc" marker-end="url(#tlArr3)"/>
    <defs><marker id="tlArr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="tl-arrf"/></marker></defs>
    ${TC(300,60,1,540,40)}${TC(68,60,2,30,110)}${TC(300,170,3,540,140)}${TC(450,232,4,540,210)}${TC(300,260,5,540,270)}`,
    TLEG(["Крышка корпуса","Защёлки или винты крышки","Фильтрующий элемент (гофрированная бумага)","Уплотнитель по периметру — должен лечь ровно","Нижняя часть корпуса"],
      "Посмотри фильтр на просвет: если свет почти не проходит или бумага серая, забита пылью и листьями — меняй, даже если пробег не подошёл."),
    "Воздушный фильтр: корпус и элемент");
}
function figCabinT(){
  return fig("0 0 600 300", `
    <path d="M60 30 L540 30 L500 150 L100 150 Z" class="tl-glass"/><path d="M60 30 L540 30 L500 150 L100 150 Z" class="tl-body"/>
    <path d="M190 140 L300 60 M330 140 L440 60" class="tl-wiper"/>
    <path d="M90 150 h420 l14 34 h-448z" class="tl-fill2"/><path d="M90 150 h420 l14 34 h-448z" class="tl-body"/>
    <path d="M110 162 h380" class="tl-thin"/><path d="M110 172 h380" class="tl-thin"/>
    <rect x="300" y="186" width="150" height="40" rx="3" class="tl-padf2"/><rect x="300" y="186" width="150" height="40" rx="3" class="tl-hid"/>
    <path d="M60 230 h480 l-30 50 h-420z" class="tl-fill"/><path d="M60 230 h480 l-30 50 h-420z" class="tl-body"/>
    <path d="M375 260 v-24" class="tl-acc" marker-end="url(#tlArr4)"/>
    <defs><marker id="tlArr4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="tl-arrf"/></marker></defs>
    ${TC(250,90,1,40,60)}${TC(300,60,2,560,60)}${TC(200,168,3,40,170)}${TC(375,206,4,560,200)}${TC(200,260,5,40,265)}`,
    TLEG(["Лобовое стекло","Поводки и щётки дворников — снять первыми","Жабо — пластиковая решётка под стеклом","Салонный фильтр под жабо (стрелка — по ходу воздуха)","Капот"],
      "На большинстве переднеприводных Лад фильтр стоит под жабо, на части моделей — за перчаточным ящиком. На твоей машине: " + esc(F().cabin || "смотри руководство")),
    "Где стоит салонный фильтр");
}
function figFuelT(){
  return fig("0 0 600 220", `
    <rect x="20" y="70" width="100" height="70" rx="8" class="tl-fill"/><rect x="20" y="70" width="100" height="70" rx="8" class="tl-body"/><text x="70" y="110" class="tl-s" text-anchor="middle">бак</text>
    <rect x="480" y="70" width="100" height="70" rx="8" class="tl-fill"/><rect x="480" y="70" width="100" height="70" rx="8" class="tl-body"/><text x="530" y="110" class="tl-s" text-anchor="middle">двигатель</text>
    <path d="M120 105 H220 M380 105 H480" class="tl-pipe"/>
    <rect x="216" y="94" width="18" height="22" rx="3" class="tl-accf"/><rect x="366" y="94" width="18" height="22" rx="3" class="tl-accf"/>
    <rect x="234" y="78" width="132" height="54" rx="10" class="tl-part"/>
    <path d="M262 105 H332" class="tl-acc" marker-end="url(#tlArr5)"/>
    <defs><marker id="tlArr5" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" class="tl-arrf"/></marker></defs>
    <rect x="280" y="132" width="40" height="14" rx="2" class="tl-fill2"/><path d="M270 146 h60" class="tl-body"/>
    ${TC(300,90,1,300,30)}${TC(225,105,2,190,175)}${TC(300,146,3,300,190)}${TC(375,105,4,410,175)}`,
    TLEG(["Корпус фильтра со стрелкой — стрелка по ходу топлива, к двигателю","Входная трубка (от бака), быстросъёмный разъём","Хомут или кронштейн крепления","Выходная трубка (к двигателю)"],
      "На инжекторе перед снятием сбрось давление в системе. Бензин и его пары легко вспыхивают — никакого огня рядом."),
    "Топливный фильтр: как ставить");
}
function figHoseT(){
  return fig("0 0 600 300", `
    <circle cx="140" cy="170" r="110" class="tl-fill"/><circle cx="140" cy="170" r="110" class="tl-body"/><circle cx="140" cy="170" r="34" class="tl-part"/>
    <rect x="200" y="96" width="90" height="140" rx="12" class="tl-part"/>
    <rect x="252" y="76" width="16" height="22" rx="2" class="tl-accf"/><path d="M256 76 v-8 h8 v8" class="tl-body"/>
    <path d="M260 68 C 270 20, 420 20, 450 140" class="tl-hosec"/>
    <path d="M400 130 l12 140 h96 l12 -140" class="tl-body"/>
    <path d="M408 214 l4 56 h96 l4 -56 z" class="tl-brakef"/>
    <circle cx="452" cy="196" r="4" class="tl-thin"/><circle cx="460" cy="182" r="3" class="tl-thin"/><circle cx="447" cy="170" r="2.5" class="tl-thin"/>
    ${TC(260,86,1,320,40)}${TC(360,30,2,420,20)}${TC(452,196,3,560,180)}${TC(460,240,4,560,250)}${TC(245,180,5,320,280)}`,
    TLEG(["Штуцер прокачки — ключ на 8","Прозрачный шланг","Пузырьки воздуха — качай, пока не исчезнут","Банка с небольшим количеством жидкости — конец шланга в жидкости","Суппорт"],
      "Конец шланга всегда в жидкости — иначе при отпускании педали воздух засосёт обратно."),
    "Прокачка тормозов: штуцер и шланг");
}
