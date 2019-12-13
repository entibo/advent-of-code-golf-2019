
P = IN.split('\n').map(s => (eval(s.slice(1,-1)),[x,y,z]))
V = Π(P, 0)

ZERO_VELOCITY = V.toString()
TARGET = P.toString()

for(n=1;n<1000000;n++) {

  for(i = 4; i--;) for(j = i; j--;)
    for(w = 3; w--;)
      δ = sign(P[j][w]-P[i][w]),
      V[i][w] += δ,
      V[j][w] -= δ

  for(i = 4; i--;) {
    P[i][0] += V[i][0]
    P[i][1] += V[i][1]
    P[i][2] += V[i][2]
  }
  
  OUT = n, P.toString() == TARGET && V.toString() == ZERO_VELOCITY && EXIT }

console.log("didn't work")

