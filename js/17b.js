
α = intcode(2+IN.slice(1))

X = α.output().map(x => String.fromCharCode(x))
α.outputBuffer = []

/* X = `#######...#####
#.....#...#...#
#.....#...#...#
......#...#...#
......#...###.#
......#.....#.#
^########...#.#
......#.#...#.#
......#########
........#...#..
....#########..
....#...#......
....#...#......
....#...#......
....#####......` */

for(w = 0; X[w++] != `\n`;);
h = (X-1) / w

v = ({x,y}) => 
    x >= 0 && x < w && y >= 0 && y < h
    && '#^v<>'.includes(X[x+w*y])

p = map( X.indexOf('^'), k => [k%w,k/w^0] )

Δ = [[0,-1],[1,0],[0,1],[-1,0]]
i = 0

for( path = '' ;;) {

  η = 1
  map( [-1,1]
     , r => ( iໍ = (i+4+r)%4
            , v( Σ( p, Δ[iໍ] ) )
              && ( i = iໍ
                 , path += 'L R'[r+1]+','
                 , η = 0 ) ) )
  if(η) break

  for( d = 0
     ; q = Σ( p, Δ[i] ), v(q) 
     ; p = q ) d++

  path += d+','

}

PRINT = path


f = (s,n=3) => {
  if(n < 0) return
  if(!s.trim().length) return []
  s = s.replace(/^ */, '')
  let best
  for(let k = Math.min(s.length-1,21); k >= 2 ; k--) {
    let [s1,s2] = [s.slice(0,k),s.slice(k)]
    if(!s1.match(/[0-9],$/)) continue
    //if(!s2.includes(s1)) continue
    let ps2 = f( s2.replace(new RegExp(s1, 'g'), ' '), n-1 )
    if(ps2) {
      if( !best ||
          [s1, ...ps2].reduce((a,b) => a+b, 0)
          > best.reduce((a,b) => a+b, 0) ) {
        best = [s1, ...ps2]
      }
    }
  }
  return best
}

PRINT = f(path)

; [A,B,C] = f(path)

MAIN = path
for(n=100;n--;)
  MAIN = MAIN.replace(A,'A'),
  MAIN = MAIN.replace(B,'B'),
  MAIN = MAIN.replace(C,'C')

; MAIN = MAIN.split``.join(',') + '\n'
; [A,B,C] = [A,B,C].map(s => s.replace(/,$/, '\n'))

PRINT = 'MAIN: '+MAIN
PRINT = 'A: '+A
PRINT = 'B: '+B
PRINT = 'C: '+C


α.input(...MAIN) // main
α.input(...A) // A
α.input(...B) // B
α.input(...C) // C
α.input(...'n\n')

OUT = α.output().pop()