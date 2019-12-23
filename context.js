
let IntCodeProgram = require("./intcode.js")

let code = process.argv[2],
    input = process.argv[3]

let context = {

  IN: input, 
  /* new Proxy(_=>{}, {
    apply(_, __, ...args) {
      if(args[0] instanceof Array) {
        return input.split(args[0][0])
      }
      return input.slice(...args)
    },
  }), */

  OUT: 0,

  get EXIT(){_EXIT()},

  set PRINT(v) {
    console.log(v)
  },

  IntCodeProgram,
  intcode: program => new IntCodeProgram(program, true),

  _: null,
  ထ: Infinity,

  ...Object.getOwnPropertyNames(Math)
       .reduce((o,k) => ({ [k]: Math[k], ...o }), {}),

  Ξk  : o => Object.keys(o),       
  Ξv  : o => Object.values(o),       
  Ξkv : o => Object.entries(o),       

  fold: (...args) => {
    if(typeof args[0] === 'function') {
      return a => Array.prototype.reduce.apply(a, args)
    }
    return Array.prototype.reduce.call(...args)
  },
  filter: (...args) => {
    if(typeof args[0] === 'function') {
      return a => Array.prototype.filter.apply(a, args)
    }
    return Array.prototype.filter.call(...args)
  },
  scan: (a, f, ...rest) => { 
    let result, values = []
    let rf = (x,y,i) => ( values.push(result = f(x,y,i,a)), result )
    if(rest.length === 0)
      Array.prototype.reduce.call(a, rf)
    else {
      let init = rest[0]
      values.push(init)
      Array.prototype.reduce.call(a, rf, init)
    }
    return values
  },
  zip: (...as) => Array(Math.min(...as.map(a=>a.length))).fill().map((_,i)=>as.map(a=>a[i])),

  zip(...args) {
    let n = Math.min(...args.filter(isIterable).map(a=>a.length))
    let iterables = []
    let withFn = null
    for(let a of args) {
      if(typeof a === 'function') withFn = a
      else if(isIterable(a)) iterables.push(a)
      else iterables.push( Array(n).fill(a) )
    }

    let result = Array(n)
    for(let i=0; i < n; i++) {
      let values = iterables.map(x => x[i])
      result[i] = withFn ? withFn(...values) : values
    }

    return result
  },

  repeat(arg, n=1) {
    if(typeof arg === 'string') return arg.repeat(n)
    if(arg instanceof Array) {
      let r = []
      for(let i=0; i < n; i++) {
        r = r.concat(arg)
      }
      return r
    }
    let r = []
    for(let i=0; i < n; i++) {
      r.push(arg)
    }
    return r
  },

  rotate(arg, n=0) {
    if(!arg.slice) throw 'no good'
    let concat = typeof arg === 'string' ? (a,b) => a+b : (a,b) => a.concat(b)
    if(n == 0) return arg
    else return concat( arg.slice(n), arg.slice(0, n) )
  },
  
/*   map: (...args) => Array.prototype.map.call(...args),

  map(...args) {
    if(args.length === 1) {
      return iterable => Array.prototype.map.call(iterable, args[0])
    }
    return Array.prototype.map.call(...args)
  }, */

  map(...as) {
    if(typeof as[0] === 'function') {
      console.log('map: as[0] is function', as[0])
      return (...bs) => bs.length === 1
        ? context.map(bs[0], ...as)
        : context.map(bs, ...as)
    }
    else {
      let [value, ...functions] = as
      for(let fn of functions) {
        if(isIterable(value)) {
          let r = []
          for(let x of value) r.push(fn(x))
          value = r
        }
        else {
          value = fn(value)
        }
      }
      return value
    }
  },

  flat(a) {
    return Array.prototype.flat.call(a)
  },
  flatMap(...as) {
    return context.map(...as).flat()
  },

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

{
  function make(fn) {
    let rec = (...args) => {
      if(args.length === 0) return 0
      let includesIterables = args.filter(isIterable).length > 0
      if(args.length === 1) {
        return includesIterables
          ? rec(...args[0])
          : fn(...args)
      }
      return includesIterables
        ? context.zip(...args, rec)
        : fn(...args)
    }
    return rec
  }
  context.Σ = make((...args) => args.reduce((a,b) => a+b))
  context.Π = make((...args) => args.reduce((a,b) => a*b))
  context.ζ = make
}

// ஃ ೱ ၜ ᐃᐂ ᕀ ᕁ ᛜ 
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

for(let [k,i] of [['x',0],['y',1],['z',2],['w',3]]) {
  Object.defineProperty(Array.prototype, k, {
    get() { return this[i] },
    set(v) { return this[i] = v },
  })
}

Array.prototype.valueOf = function() { return this.length }

Object.prototype._ = function(def) {
  let initFn = 
    def instanceof Array ? () => def.slice()
                         : () => def

  return new Proxy(this, {
    get(target, k) {
      let current = target[k]
      return current != null ? current : (target[k] = initFn())
    }
  })
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