
α = intcode(IN)

PRINT = X = α.output().map(x => String.fromCharCode(x)).join``

for(w = 0; X[w++] != `\n`;);
h = (X-1) / w

PRINT = [w,h]

for( k = 0; k < X; k++ )
  x = k % w,
  y = k / w ^ 0,
  '#^v<>'.includes(X[k]) 
  && 2 < filter( [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]
               , ({x,y}) => 
                 x >= 0 && x < w && y >= 0 && y < h 
                 && '#^v<>'.includes(X[x+w*y]) )
  && ( X[k] = 'O', OUT += x*y )

PRINT = X.join``