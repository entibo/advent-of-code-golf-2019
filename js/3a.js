min=Math.min,max=Math.max,abs=Math.abs,
dir={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]},
[w1,w2]=
  IN
  .split('\n')
  .map(w => w.split(',')
            .map(s => dir[s[0]]
                      .map(x => x*s.slice(1)))),
r = (a,v) => v < 0 ? a.reverse() : a,
f = (w,p=[0,0],vh=[[],[]]) => 
    (w.map(q => vh[!!q[0]^0].push(r([p, p = p.map((x,i)=>x+q[i])],q[0]+q[1]))),vh),
[v1,h1]=f(w1),
OUT=Infinity, t = (v,h) => v.map(
	([[x,c],[_,d]]) => h.map(
  ([[a,y],[b,_]]) => a<=x&&x<=b&&c<=y&&y<=d&&(x!=0||y!=0)&&
                     (OUT=min(OUT,abs(x)+abs(y))))),
[v2,h2]=f(w2),t(v1,h2),t(v2,h1)