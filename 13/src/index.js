
const IntCodeProgram = require("../../intcode.js")
const program = require("raw-loader!../../input.txt").default

const computer = new IntCodeProgram(program, false)
computer[0] = 2
computer.compute()
window.computer = computer

const score = document.createElement('h2')
score.innerText = 'Loading...'
document.body.appendChild(score)

const canvas = document.createElement('canvas')
width = height = canvas.width = canvas.height = 800
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')


const tileSize = 14

ctx.fillStyle = "white"
ctx.fillRect(0, 0, width, height)

const tileColors = [
  'white', 'black', 'green', 'blue', 'red'
]

/* let dir = 0
addEventListener("keydown", e => {
  if(computer.state === 'READY') {
    computer.compute()
    return
  }
  console.log(e.key)
  if(e.key.match(/a|q/)) dir = -1
  if(e.key === 'd') dir = 1
})
addEventListener("keyup", e => {
  if(e.key.match(/a|q/)) dir == -1 && (dir = 0)
  if(e.key === 'd') dir == 1 && (dir = 0)
}) */

const refreshRate = { min: 1, max: 1000 }
refreshRate.current = refreshRate.min

let ball = { x: 0, y: 0 }
let paddle = { x: 0, y: 0 }
function update() {
  // input
  computer.inputBuffer = []
  let dir = ball.x == paddle.x ? 0  :
            ball.x <  paddle.x ? -1 : 1
  computer.input(dir)

  // draw
  let buffer = computer.outputBuffer
  computer.outputBuffer = []
  while(buffer.length) {
    [x,y,t,...rest] = buffer
    buffer = rest

    if(x == -1 && y == 0) {
      score.innerText = 'Score: '+t
    }
    else {
      ctx.fillStyle = tileColors[t]
      ctx.fillRect(tileSize*x/2, tileSize*y, tileSize/2, tileSize)

      if(t === 3) paddle = { x, y }
      if(t === 4) ball = { x, y }
    }
  }

  setTimeout(update, refreshRate.current)
}

update()