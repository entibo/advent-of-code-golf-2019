

f = s => {
  let d = [...s]
  for(let i=0; i < d.length-2; i++) {
    if( abs(d[i].charCodeAt(0)-d[i+1].charCodeAt(0)) == 32 ) {
      d.splice(i, 2)
      i = max(0, i-2)
    }
  }
  return d.join('')
}
g = s => f(f(s))

let s = IN

let Min = 1e7

for(let c of 'abcdefghijklmnopqrstuvwxyz') {
  let len = g(
    s.replace(new RegExp(c, 'gi'), '')
    )
    .length
  if(len < Min) Min = len
}

OUT = Min