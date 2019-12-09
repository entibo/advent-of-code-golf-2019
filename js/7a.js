
frange(5)(i => (Xõ = 0, õ = i)), Zõ = (O = O)
for(i = 0; i < 5;)
  X[i] < i ? ( Zõ = ( O = i % 2 ? O.swap(X[i], i)
                                : O.swap(0, i) )
             , X[i]++, i = 0 )
           : X[i++] = 0

OUT = max( ...map( Z
                 , fold( (v,p) => intcode(IN)
                                  .input(p,v)
                                  .output()
                                  .pop()
                       , 0 ) ) )



