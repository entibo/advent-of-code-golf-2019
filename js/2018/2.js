/* 
A = 0
B = 0

IN.split`
`.map(xs => {
  for(let x of xs) {
    m = xs.match(new RegExp(x, 'g'))
    if(m.length === 2) {
      A++
      break
    }
  }
  for(let x of xs) {
    m = xs.match(new RegExp(x, 'g'))
    if(m.length === 3) {
      B++
      break
    }
  }
})




OUT = A*B */




f = (a,b) => {
  s = ''
  for(i= 0; i < a.length; i++)
    if(a[i] === b[i]) s += b[i]

  return s.length === a.length - 1 ? s : _
}


XS = IN.split`
`
for(let x of XS)
  for(let y of XS)
    if(m = f(x,y)) ( OUT = m, EXIT)