
gcd = (a,b) => b ? gcd(b, a%b) : a
lcm = (a,b) => a * b / gcd(a,b)


/* O = IN.split('\n')
      .map( s => ( eval( s.slice(1,-1) )
                 , [x,y,z] ) ) */

for( O = IN.split('\n')
   ; o
   ; X = o, õX, Xõ, eval(X.join``), õ = [x,y,z] )
   ;


/* O = map( zip(...O)
       , p => ( v = [0,0,0,0]
              , [ p, v, p+':'+v ] ) ) */

for( i = 3, X = []
   ; i--
   ; õX = ( Z = [Y]
          , Zõ = Π(Y,0)
          , Zõ = oZ+':'+Zo
          , Z ) )
  for( j = 4, Y = []
     ; j--
     ; õY = O[j][i] )
     ; O = X

     
OUT = 1

for( n = 0
   ; n++, o
   ; p+':'+v == s && ( OUT = lcm(OUT, n)
                     , n = 0, õ ) )
  for( [p,v,s] = o, i = 4
     ; i--
     ; p[i] += v[i] ) 
    for( j = i
       ; j--
       ; ( δ = sign(p[j] - p[i]) ) && ( v[i] += δ
                                      , v[j] -= δ ) )
       ;