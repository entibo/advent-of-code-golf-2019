
m = {}._([])

map( IN.split`\n`
   , line => ( X = map( line.match(/\d+ \w+/g)
                      , s => s.split` ` )
             , [c,d] = Xõ
             , map( X
                  , ([a,b]) => m[b].push( [a,c,d] ) ) ) )

f = b => 
    b == 'FUEL' ? 1
                : Σ( map( m[b]
                        , ([a,c,d]) => 
                            a * ceil( f(d) / c ) ) )

OUT = f('ORE')

