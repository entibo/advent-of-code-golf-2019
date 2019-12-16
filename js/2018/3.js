


claims = IN.split`
`

/* 
X = Array(1000**2).fill(0)

for(let s of claims) {
  // #1266 @ 686,749: 17x11
  let [m,id,x,y,w,h] = 
    s.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
      .map(x => parseInt(x))

  for(let i=0; i < w; i++)
    for(let j=0; j < h; j++)
      X[(y+j)*1000+(i+x)]++

}

OUT = X.filter(x => x > 1).length
 */

boxes = claims.map(s => {
  let [m,id,x,y,w,h] = 
    s.match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
      .map(x => parseInt(x))

  return [id, x,y,x+w-1,y+h-1]

})


C = 0

L: for(let [id,a,b,c,d] of boxes) {

  for(let [id2  ,x,y,z,w] of boxes) {

    C ++

    if(id === id2) continue
    
    if( ((a <= x && x <= c) || (x <= a && a <= z))
      &&  ((b <= y && y <= d) || (y <= b && b <= w)) ) {

      continue L
    }

  }


  OUT = id
  EXIT
}

PRINT = C