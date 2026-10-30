/* ---------- расходы на машину ---------- */
const MON = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
const kRub = n => n >= 1000 ? (Math.round(n / 100) / 10).toLocaleString("ru-RU") + "к" : String(Math.round(n));
function renderCosts(car, entries){
  const paid = entries.filter(l => Number(l.cost) > 0 && l.date);
  if(!paid.length) return `<section class="blk"><h4>Расходы</h4><p class="nov">Указывай стоимость в записях журнала — здесь появятся расходы за месяц и год и на что уходят деньги.</p></section>`;
  const now = new Date(isoToday()), y = now.getFullYear(), m = now.getMonth();
  const sum = a => a.reduce((s,l) => s + Number(l.cost), 0);
  const ym = l => { const [Y, M] = l.date.split("-").map(Number); return [Y, M - 1]; };
  const month = sum(paid.filter(l => { const [Y,M] = ym(l); return Y === y && M === m; }));
  const year = sum(paid.filter(l => ym(l)[0] === y));
  const all = sum(paid);
  const kms = entries.map(l => Number(l.km)).filter(n => n > 0);
  const span = kms.length > 1 ? Math.max(...kms) - Math.min(...kms) : 0;
  const per1000 = span >= 1000 ? Math.round(all / span * 1000) : 0;
  const months = Array.from({length:12}, (_, i) => { const d = new Date(y, m - 11 + i, 1); return [d.getFullYear(), d.getMonth()]; });
  const vals = months.map(([Y,M]) => sum(paid.filter(l => { const [a,b] = ym(l); return a === Y && b === M; })));
  const max = Math.max(...vals, 1), W = 600, H = 190, bw = 34, gap = (W - 24 - 12*bw) / 11;
  const bars = vals.map((v,i) => { const x = 12 + i*(bw + gap), h = v ? Math.max(4, (v / max) * 120) : 2, yy = 150 - h;
    return `<g><title>${MON[months[i][1]]} ${months[i][0]}: ${rub(v)}</title><rect x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" class="${i === 11 ? "cb-now" : v ? "cb" : "cb-zero"}"/>
      ${v ? `<text x="${(x + bw/2).toFixed(1)}" y="${(yy - 6).toFixed(1)}" class="cb-v" text-anchor="middle">${kRub(v)}</text>` : ""}
      <text x="${(x + bw/2).toFixed(1)}" y="170" class="cb-l" text-anchor="middle">${MON[months[i][1]]}</text></g>`; }).join("");
  const byType = {};
  paid.forEach(l => { byType[l.type] = (byType[l.type] || 0) + Number(l.cost); });
  const cats = Object.entries(byType).sort((a,b) => b[1] - a[1]);
  const top = cats[0][1];
  return `<section class="blk"><h4>Расходы</h4>
    <div class="cstats">
      <div><span>${MON[m]} ${y}</span><b>${rub(month)}</b></div>
      <div><span>${y} год</span><b>${rub(year)}</b></div>
      <div><span>Всё время</span><b>${rub(all)}</b></div>
      ${per1000 ? `<div><span>На 1000 км</span><b>≈ ${rub(per1000)}</b></div>` : ""}
    </div>
    <div class="cchart"><div class="cchart-h">По месяцам, последние 12</div>
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Расходы по месяцам за последний год"><path d="M0 150.5 H${W}" class="cb-axis"/>${bars}</svg></div>
    <div class="ccats"><div class="cchart-h">На что уходят деньги</div>
      <ul>${cats.map(([t,v]) => `<li><div class="ccat-t"><span>${esc(logName(t, car.fam))}</span><b>${rub(v)}</b></div><div class="ccat-bar"><i style="width:${Math.max(3, v / top * 100).toFixed(1)}%"></i></div></li>`).join("")}</ul></div>
    <p class="approx-note">Считается по стоимости, которую ты указываешь в записях журнала.</p>
  </section>`;
}
