
n = {}._([])

for( X = [ [ [0,0], intcode(IN) ] ]
   ; X.length && ( [a,α] = õX )
   ; )
  map( '1234'
     , d => 
       ( b = Σ( a, [_,[0,-1],[0,1],[-1,0],[1,0]][d] )
       , β = α.clone().input(+d)
       , s = β.output().pop()
       , +s && ( s-1 && ( Y = [b] )
               , n[a].push(b)
               , ''+n[b] || ( Xõ = [b,β] ) ) ) )

for( Θ = {}
   ; Y.length
   ; OUT++ )
  Y = map( Y
         , a => 
           ( Θ[a] = 1
           , n[a].filter(b => !Θ[b]) ) )
         .flat()

OUT--