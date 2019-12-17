
for(   n = 100
     , X = map( IN, x => x^0 )
     , P = map( scan( range( X.length - 1 )
                    , v => map( v, ([x,...xs]) => [x,x,...xs] )
                    , map( [0,1,0,-1], repeat ) )
              , flat
              , v => rotate( v, 1 )
              , xs => repeat( xs
                            , ceil( X.length / xs.length ) ) )
   ; n-- 
   ; OUT = X.slice(0, 8).join`` )
  X = map( P
         , p => map( Σ( zip( p, X, Π ) )
                   , x => abs(x) % 10 ) )
