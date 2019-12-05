dir={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]},
[w1,w2]=
  IN
  .split('\n')
  .map(w => w.split(',')
            .map(s => dir[s[0]]
                      .map(x => x*s.slice(1)^0))),
r = (a,v) => v < 0 ? a.reverse() : a,
f = (w,p=[0,0],s=[]) => 
    (w.map(q => s.push(r([p, p = p.map((x,i)=>x+q[i])],q[0]+q[1]))),s);

OUT=Infinity
for(let   [[a,b],[c,d]] of f(w2)) {
  for(let [[x,y],[w,z]] of f(w1)) {
    x0 = max(a,x), x1 = min(c,w),
    y0 = _y0 = max(b,y), y1 = min(d,z)
    while(y0=_y0,x0++<=x1) while(y0++<=y1) (x0!=1||y0!=1)&&(OUT=min(OUT,abs(x0-1)+abs(y0-1)))
  }
}