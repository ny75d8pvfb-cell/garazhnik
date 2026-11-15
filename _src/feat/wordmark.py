import math
S='/tmp/claude-0/-home-claude/aa193cbc-9b32-57a8-bc63-ef1d3b9d25e8/scratchpad'
ST=21   # толщина вертикали
DW=27   # горизонтальная толщина диагонали
GAP=11
def R(x,y,w,h): return f'M{x} {y}h{w}v{h}h{-w}z'
def D(x1,y1,x2,y2,w=DW): return f'M{x1-w/2:.1f} {y1}L{x1+w/2:.1f} {y1}L{x2+w/2:.1f} {y2}L{x2-w/2:.1f} {y2}z'
import re as _re
def F(d,cls='f'):
    parts=[p for p in _re.split(r'(?=M)',d) if p.strip()]
    return ''.join(f'<path class="{cls}" d="{p}"/>' for p in parts)
def FE(d,cls='f'): return f'<path class="{cls} eo" d="{d}"/>'
def arc_ring(cx,cy,r,w,a0,a1):
    # кольцевой сектор от a0 до a1 (градусы), толщина w
    ro,ri=r+w/2,r-w/2; p=lambda rr,a:(cx+rr*math.cos(math.radians(a)),cy+rr*math.sin(math.radians(a)))
    big=1 if (a1-a0)%360>180 else 0
    x0,y0=p(ro,a0);x1,y1=p(ro,a1);x2,y2=p(ri,a1);x3,y3=p(ri,a0)
    return f'M{x0:.1f} {y0:.1f}A{ro} {ro} 0 {big} 1 {x1:.1f} {y1:.1f}L{x2:.1f} {y2:.1f}A{ri} {ri} 0 {big} 0 {x3:.1f} {y3:.1f}z'
L=[]
# Г
L.append((58, F(R(0,0,ST,100)+R(0,0,58,ST))))
# А (bolt=True — перекладина-болт)
def A(bolt):
    w=78; s=F(D(39,0,DW/2,100)+D(39,0,w-DW/2,100))
    if bolt:
        y=70
        s+=F(f'M4 {y-9}h13l5 9-5 9H4l-5-9z','p')                       # головка болта (шестигранник сбоку)
        s+=F(R(22,y-5.5,48,11),'p')                                       # стержень
        s+=''.join(f'<path class="th" d="M{x} {y-5.5}l3 11"/>' for x in range(30,70,6))   # резьба
    else:
        s+=F(R(14,62,50,17))
    return w,s
L.append(A(True))
# Р
L.append((64, F(R(0,0,ST,100))+FE('M0 0H36A28 28 0 0 1 36 58H0zM'+str(ST)+' 19H35A10 10 0 0 1 35 39H'+str(ST)+'z')))
L.append(A(False))
# Ж со свечой в центре
cx=52
plug=(F(R(cx-4,0,8,9),'p')+                                      # контакт
      F(R(cx-9,9,18,29),'p')+                                     # изолятор
      ''.join(f'<path class="th" d="M{cx-9} {y}h18"/>' for y in (17,24,31))+    # рёбра
      F(f'M{cx-15} 40h30v14h-30z','p')+                           # шестигранник
      '<path class="th" d="M'+f'{cx-5} 40v14M{cx+5} 40v14"/>'+
      F(R(cx-7,56,14,28),'p')+                                    # резьба
      ''.join(f'<path class="th" d="M{cx-7} {y}l14 -3"/>' for y in range(62,84,5))+
      F(R(cx-2.5,84,5,6),'p')+                                    # центральный электрод
      F(f'M{cx+5} 84h5v15h-15v-5h10z','p'))                      # боковой электрод
L.append((104, F(D(8,0,cx-17,46)+D(cx-17,54,8,100)+D(104-8,0,cx+17,46)+D(cx+17,54,104-8,100)+R(cx-24,43,10,14)+R(cx+14,43,10,14))+plug))
# Н с рожковым ключом
w=88
wr=(F(arc_ring(ST/2,50,17,10,-135,135),'p')+          # зев слева, открыт влево
    F(arc_ring(w-ST/2,50,17,10,45,315),'p')+                      # зев справа, открыт вправо
    F(f'M{ST/2+15} 44H{w-ST/2-15}V56H{ST/2+15}z','p'))           # ручка
L.append((w, F(R(0,0,ST,100)+R(w-ST,0,ST,100))+wr))
# И
L.append((86, F(R(0,0,ST,100)+R(86-ST,0,ST,100)+f'M{ST} 72L{86-ST} 6V28L{ST} 94z')))
# К
L.append((78, F(R(0,0,ST,100)+f'M{ST} 50L54 0H80L{ST+16} 52z'+f'M{ST+10} 44L80 100H53L{ST} 60z')))
x=0;out=''
for wd,b in L: out+=f'<g transform="translate({x} 0)">{b}</g>'; x+=wd+GAP
W=x-GAP
svg=f'<svg class="wmsvg" viewBox="-4 -1 {W+8} 102" style="width:{(W+8)/102*0.74:.3f}em" role="img" aria-label="Гаражник">{out}</svg>'
open(S+'/wm.svg.txt','w').write(svg)
css='''.wmsvg{display:inline-block;height:.74em;vertical-align:0;overflow:visible}
.wmsvg .f{fill:currentColor}
.wmsvg .eo{fill-rule:evenodd}
.wmsvg .p{fill:var(--acc)}
.wmsvg .th{stroke:var(--bgc);stroke-width:2.2;fill:none}
'''
open(S+'/wm.css','w').write(css)
html=f'''<html><head><style>body{{margin:0;padding:20px;background:#1D2024;color:#fff;--acc:#E8590C;--bgc:#1D2024;font-family:Inter}}
.row{{margin:16px 0;font:800 var(--s) Inter}} .light{{background:#F3F1EC;color:#1D2024;--bgc:#F3F1EC;padding:10px}}{css}</style></head><body>
{''.join(f'<div class="row" style="--s:{s}px">{svg} &nbsp;<span style="opacity:.4;text-transform:uppercase;letter-spacing:.07em">Гаражник</span></div>' for s in [18,24,36,64,130])}
<div class="light">{''.join(f'<div class="row" style="--s:{s}px">{svg}</div>' for s in [18,36,64])}</div></body></html>'''
open(S+'/wm.html','w').write(html)
