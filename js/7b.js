
frange(5)(i => (Xõ = 0, õ = i+5)), Zõ = (O = O)
for(i = 0; i < 5;)
  X[i] < i ? ( Zõ = ( O = i % 2 ? O.swap(X[i], i)
                                : O.swap(0, i) )
             , X[i]++, i = 0 )
           : X[i++] = 0


OUT = max( ...map( Z
                 , ps => {
                    Y = map(ps, p => intcode(IN).input(p))
                    let $out = 0
                    while(oY.state !== 'HALTED')
                      $out = fold( Y
                                 , (v,cmp) => cmp.input(v).output().pop()
                                 , $out )
                    return $out
                   } ) )