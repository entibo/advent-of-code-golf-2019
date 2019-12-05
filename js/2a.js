c=String.fromCharCode
$ = IN.split(/\D/).map(x => x^0)
$[1]=12, $[2]=2,
f = i => ( g = o => eval(`$[$[${i}+3]]=$[$[${i}+1]]${o}$[$[${i}+2]]`), 
            ( j = 44-$[i], 
              j < 0 ? $ : ( g(c(j)), 
                            f(i+4)   ) ) ),
OUT=f(0)[0]
