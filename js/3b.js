dir={R:[1,0],L:[-1,0],U:[0,-1],D:[0,1]},
[w1,w2]=
  IN
  .split('\n')
  .map(w => w.split(',')
            .map(s => dir[s[0]]
                      .map(x => x*s.slice(1)))),
r = (a,v) => v < 0 ? [a[1],a[0],a[2]] : a,
f = (w,p=[0,0,0],vh=[[],[]]) => 
    (w.map(q => (v=q[0]+q[1],vh[!!q[0]^0].push(r([p, p = [p[0]+q[0],p[1]+q[1],p[2]+abs(v)]],v)))),vh),
[v1,h1]=f(w1),
OUT=Infinity, t = (v,h) => v.map(
	([[x,c,i],[_,d,j]]) => h.map(
  ([[a,y,k],[b,_,l]]) => a<=x&&x<=b&&c<=y&&y<=d&&(x!=0||y!=0)&&
                     (OUT=min(OUT, ((i<j)?i+(y-c):j+(d-y)) + ((k<l)?k+(x-a):l+(b-x)) )))),
[v2,h2]=f(w2),t(v1,h2),t(v2,h1)