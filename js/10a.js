
w = (m = IN.split('\n')).length

g = (a,b) => b ? g(b, a%b) : a*a < 2

X = [[1,0],[-1,0],[0,-1],[0,1]]
for(i = -w; ++i < w;) for(j = -w; ++j < w;)
  i * j * g(i,j) && (Xõ = [i,j])

G = _ => (õ, k = 0)
F = _ => { for(t = 0, O = X, k = 1; o && ([i,j] = o); k++)
             k < w ? h(x+k*i, y+k*j) && G ^ t++
                   : G }

h = (a,b) => m[b] && m[b][a] < '.'

for(x = -1; ++x < w;) for(y = -1; ++y < w;)
  OUT = max(OUT, h(x,y) && F ^ t)
