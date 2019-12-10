
w = (IN = IN.split('\n')).length

let [a,p] =
frange(0, w)(x => frange(0, w)(y => [x,y]))
  .flat()
  .filter(a => IN[a.y][a.x] === '#')
  .map((a,_,bs) => {
    let p = {}
    for(let b of bs.filter(b => b != a)) {
      let t = atan2(b.x-a.x, a.y-b.y).toString().slice(0,8)
      p[t] || (p[t] = [])
      p[t].push(b)
    }
    return [a, p, Object.keys(p).length]
  })
  .sort((u,v) => u.z - v.z)
  .pop()

let gs =
Object.entries(p)
  .map(([t,bs]) => (t=parseFloat(t), [t<0?t+PI*2:t, bs]))
  .sort((u,v) => u.x - v.x)
  .map(tbs => tbs.y)
  .map(bs => bs.map(b => [b, (b.x-a.x)**2 + (b.y-a.y)**2])
               .sort((u,v) => v.y - u.y)
               .map(bd => bd.x))

for(let i=0; i < 200; i++) {
  OUT = gs[i%gs.length].pop()
  if(!gs[i%gs.length]) {
    gs = gs.filter(u => u.length)
    i--
  }
}

OUT = OUT.x*100 + OUT.y