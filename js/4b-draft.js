[a,b] = IN.split('-')
while(o = d = 0, a < b--)
  fold( map( '/'+b, 
             (x,i,a) => ( y = a[i+1],
                          d |= x > y,
                          x == y ) ),
        (x,y) => ( r = x << 1 | y, 
                   o |= r & 0b010, 
                   r ) )
  d &! o || OUT ++