
P = IN.split('\n').map(s => (eval(s.slice(1,-1)),[x,y,z]))
V = Π(P, 0)

for(n=1000;n--;) {

  for(i = 4; i--;) for(j = 4; j--;)
    V[i] = Σ( V[i]
            , zip( P[i]
                 , P[j]
                 , (a,b) => sign(b-a) ) )

  for(i = 4; i--;)
    P[i] = Σ( P[i], V[i] ) }

OUT = Σ( map( zip ( P
                  , V )
            , map( map(abs), Σ )
            , Π ) ) 
