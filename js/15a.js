
for( Δ = { '0,0': 0 }._(1e9)
   ; [a,α] = õX || [ [0,0], intcode(IN) ]
   ; X = [...new Set(X)] )
  map( '1234'
     , d => 
       ( b = Σ( a, [_,[0,-1],[0,1],[-1,0],[1,0]][d] )
       , δ = Δ[a] + 1
       , β = α.clone().input(+d)
       , s = β.output().pop()
       , +s && ( s-1 ? ( OUT = δ, EXIT )
                     : δ < Δ[b] && ( Δ[b] = δ
                                   , Xõ = [b,β] ) ) ) )
