


req = {}._([])

v = new Set()

IN.split`
`.map(s => {
  [,a,b] = s.match(/Step (.) must be finished before step (.)/)
  req[a].push(b)
  v.add(b)
})

S = Ξk(req).filter(a => !v.has(a))

OUT = ''

while(S.length) {

  let a = S.sort().shift()

  OUT += a

  req[a].map( b => 
              Ξkv(req)
                .filter(r => r.x != a)
                .map(r => r.y)
                .flat()
                .includes(b)
                ? _ : S.push(b) )
  delete req[a]

}















