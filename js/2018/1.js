
// OUT = eval(IN)

xs = IN.split(/\n| /g).map(x => parseInt(x))

d = {}._(0)
n = 0
for(i=0;;i++) {
  x = xs[i%xs.length]
  n += x
  d[n]++
  if(d[n] > 1) {
    OUT = n
    break
  }
}
