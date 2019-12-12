
cmp = intcode(IN)

O = [[0,-1],[1,0],[0,1],[-1,0]]

p = [0,0]
g = { [p]: 1 }

while(cmp.state !== 'HALTED')
  cmp.input(g[p]^0),
  [c,lr] = cmp.output().slice(-2),
  g[p] = c,
  O = (O + lr*2-1 + 4) % 4,
  p.x += o.x,
  p.y += o.y


Z = Object.entries(g).map(([s,c]) => [s.split`,`.map(parseFloat), c])

let rows = []
for(let [[x,y], color] of Z) {
  if(!rows[y]) rows[y] = Array(50).fill('  ')
  rows[y][x] = color == 1 ? '██' : '  '
}
for(let row of rows) {
  console.log(row.join(''))
}