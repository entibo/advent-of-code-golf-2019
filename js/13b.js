
/* for( μ = intcode(2 + IN.slice(1))
   ; ( X = μ.output() ).length
   ; μ.input( sign(Zo-oZ) ) )
  for( μ.outputBuffer = []
     ; X.length
     ; õX, õX, õX)
    X.x < 0 ? OUT = X.z
            : Z[X.z-3] = X.x */

for( μ = intcode(2 + IN.slice(1))
   ; ( X = μ.output() ).length
   ; μ.input( sign(Zo-oZ) ) )
  for( μ.outputBuffer = []
     ; X+'' ? [x,y,t] = [õX,õX,õX] : _
     ; x < 0 ? OUT = t
             : Z[t-3] = x )
     ;
    
