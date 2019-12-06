[a,b] = IN.split('-')
while(o = d = 1, a < b--)
  fold( '' + b, 
        (x,y) => ( o &= x != y, 
                   d &= x <= y, 
                   y ) ), 
  d &! o && OUT ++