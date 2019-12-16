/* 
f = a => {
  m = a.match(/^\[([^\]])+\]/)
  m = m[0].slice(1,-1)
  d = new Date(m)
  d.setYear(2018)
  return d.getTime()
}

entries =  IN.split`
`.sort((a,b) => f(a)-f(b))


 PRINT = entries

entries = entries
.map(s => {
  min = s.match(/:(\d\d)/)[1]
  s = s.slice(19)
  id = null
  if(s[0] == 'G') id = s.match(/\d+/)[0]
  return [id, min]
})

 PRINT = entries



 maxSleepMin = 0
 maxSleepId = null

m1 = {}._(0)
m2 = {}

while( entries.length ) {
  let [id,min] = entries.shift()
  if(!m2[id]) m2[id] = {}._(0)
  while(entries[0] && entries[0][0] === null) {
    let [aa,t1] = entries.shift()
    let [aaa,t2] = entries.shift()
    m1[id] += t2 - t1
    PRINT = 'Sleep: '+(t2 - t1)
    if(m1[id] > maxSleepMin) {
      maxSleepMin = m1[id]
      maxSleepId = id
    }
    for(let t = t1; t < t2; t++)
      m2[id][t]++
  }
}

PRINT = m1

u = Object.entries(m2[maxSleepId])
  .sort((a,b) => a[1]-b[1])

PRINT = maxSleepId
PRINT = u

OUT = (+u.pop()[0]) * maxSleepId









 */




 
f = a => {
  m = a.match(/^\[([^\]])+\]/)
  m = m[0].slice(1,-1)
  d = new Date(m)
  d.setYear(2018)
  return d.getTime()
}

entries =  IN.split`
`.sort((a,b) => f(a)-f(b))


 PRINT = entries

entries = entries
.map(s => {
  min = s.match(/:(\d\d)/)[1]
  s = s.slice(19)
  id = null
  if(s[0] == 'G') id = s.match(/\d+/)[0]
  return [id, min]
})





m1 = {}._(0)
m2 = {}

while( entries.length ) {
  let [id,min] = entries.shift()
  if(!m2[id]) m2[id] = {}._(0)
  while(entries[0] && entries[0][0] === null) {
    let [aa,t1] = entries.shift()
    let [aaa,t2] = entries.shift()
    m1[id] += t2 - t1
    for(let t = t1; t < t2; t++)
      m2[id][t]++
  }
}


maxSleepMin = 0
maxSleepMinTimes = 0
maxSleepId = null

for(let [id,data] of Object.entries(m2)) {
  for(let [min,times] of Ξkv(data)) {
    if(times > maxSleepMinTimes) {
      maxSleepMinTimes = times
      maxSleepMin = min
      maxSleepId = id
    }
  }
}
PRINT = maxSleepId
PRINT = maxSleepMin
OUT = maxSleepMin * maxSleepId








