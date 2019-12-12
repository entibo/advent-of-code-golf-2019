
cmp = intcode(IN)

O = [[0,-1],[1,0],[0,1],[-1,0]]

p = [0,0]
g = { [p]: 0 }

while(cmp.state !== 'HALTED')
  OUT = Object.keys(g).length,
  cmp.input(g[p]^0),
  [color,lr] = cmp.output().slice(-2),
  g[p] = color,
  O = (O + lr*2-1 + 4) % 4,
  p.x += o.x,
  p.y += o.y

