
let code = process.argv[2],
    input = process.argv[3]

let context = {

  IN: input,
  OUT: 0,
  get EXIT(){_EXIT()},

  _: null,
  ထ: Infinity,
  ...Math,

  fold: (...args) => Array.prototype.reduce.call(...args),
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