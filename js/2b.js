c=String.fromCharCode
$$ = IN.split(/\D/).map(x => x^0)
for(u=0; u < 100; u++)
  for(v=0; v < 100; v++)
    $ = [...$$],
    $[1]=u, $[2]=v,
    f = i => ( g = o => eval(`$[$[${i}+3]]=$[$[${i}+1]]${o}$[$[${i}+2]]`), 
               ( j = 44-$[i], 
                 j < 0 ? $ : ( g(c(j)), 
                               f(i+4)   ) ) ),
    f(0)[0] == 19690720 && (OUT = 100*u+v, EXIT)
