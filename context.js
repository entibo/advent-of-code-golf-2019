
let intcode = require("./intcode.js")

let code = process.argv[2],
    input = process.argv[3]

let context = {

  IN: input,
  OUT: 0,
  get EXIT(){_EXIT()},

  intcode,

  _: null,
  ထ: Infinity,

  ...Object.getOwnPropertyNames(Math)
       .reduce((o,k) => ({ [k]: Math[k], ...o }), {}),

  fold: (...args) => {
    if(typeof args[0] === 'function') {
      return a => Array.prototype.reduce.apply(a, args)
    }
    return Array.prototype.reduce.call(...args)
  },
  map: (...args) => Array.prototype.map.call(...args),
  scan: (a, f, ...init) => { 
    let result, values = []
    Array.prototype.reduce.call(
      a, 
      (x,y,i) => ( values.push(result = f(x,y,i,a)), result ), 
      ...init )
    return values
  },
  zip: (...as) => Array(Math.min(...as.map(a=>a.length))).fill().map((_,i)=>as.map(a=>a[i])),

  __f: () => {},
  get F()  { return context.__f() },
  set F(v) { return context.__f = v },
  __g: () => {},
  get G()  { return context.__g() },
  set G(v) { return context.__g = v },

  range(...args) {
    let a=0, b=0, c=1, m = 'push'
    if(args.length === 0) return []
    else if(args.length === 1) b = args[0]
    else {
      a = args[0], b = args[1]
      if(args.length >= 3) c = args[2]
    }
    if(a > b) {
      [a,b]=[b+1,a+1]
      m = 'unshift'
    }
    c = Math.abs(c)
    let r = []
    for(; a < b; a += c) r[m](a)
    return r
  },

  frange(...args) {
    return f => context.range(...args).map(f)
  },

}

const isIterable = o => (o != null) && (typeof o[Symbol.iterator] === 'function')

// ஃ ೱ ၜ ᐃᐂ
const registerAccessor1 = 'o'
const registerAccessor2 = 'õ'
for(let register of 'XYZ') {
  let k = '__'+register.toLowerCase()
  context[k] = []
  Object.defineProperties(context, {
    [register]: {
      get()   { return context[k] },
      set(v)  { return context[k] = isIterable(v) ? [...v] : v },
    },
    [registerAccessor1+register]: {
      get()   { return context[k][0] },
      set(v)  { return context[k][0] = v },
    },
    [registerAccessor2+register]: {
      get()   { return context[k].shift() },
      set(v)  { return context[k].unshift(v) },
    },
    [register+registerAccessor1]: {
      get()   { return context[k][context[k].length-1] },
      set(v)  { return context[k][context[k].length-1] = v },
    },
    [register+registerAccessor2]: {
      get()   { return context[k].pop() },
      set(v)  { return context[k].push(v) },
    },
  })
}
{
  let register = 'O'
  let k = '__'+register.toLowerCase()
  let kidx = k+'__index'
  context[k] = []
  context[kidx] = 0
  Object.defineProperties(context, {
    [register]: {
      get()   { return context[k] },
      set(v)  {
        if(typeof v === 'number') context[kidx] = v
        else {
          context[kidx] = 0
          context[k] = isIterable(v) ? [...v] : v
          context[k].valueOf = () => context[kidx]
        }
        return context[k]
      },
    },
    [registerAccessor1]: {
      get()   { return context[k][context[kidx]] },
      set(v)  { return context[k][context[kidx]] = v },
    },
    [registerAccessor2]: {
      get()   { return context[k][context[kidx]++] },
      set(v)  { return context[k][context[kidx]++] = v },
    },
  })
}

if(typeof Array.prototype.flatMap !== 'function') {
  Array.prototype.flat = function() {
    let r = []
    for(let x of this) {
      if(x instanceof Array) r.push(...x)
      else r.push(x)
    }
    return r
  }
  Array.prototype.flatMap = function(...args) {
    return this.map(...args).flat()
  }
}

Array.prototype.swap = function(i, j) {
  let tmp = this[i]
  this[i] = this[j]
  this[j] = tmp
  return this
}

function _EXIT() {
  console.log('Answer: ' + context.OUT)
  let time = process.hrtime(hrstart)
  console.log('Took (' + time[0] + ')' + time[1]/1000000 + 'ms')
  process.exit(0)
}

let hrstart = process.hrtime()
with(context) {
  try { eval(code) } catch(e) { console.log(e) }
}

_EXIT()