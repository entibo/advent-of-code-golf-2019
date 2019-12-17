
len = IN.length * 10000
offset = IN.slice(0,7) ^ 0
z = len - offset

reversedStartingInput = [...IN].reverse().map(parseFloat)

const arr = new Array(z)
for(let k = 0; k < z; k++) {
  arr[k] = reversedStartingInput[k%IN.length]
}

PRINT = [len, offset, z]

for(let n=100; n--;) {

  PRINT = 'Phase n°'+(100-n)

  for(let k = 0, sum = 0; k < z; k++) {
    sum += arr[k]
    arr[k] = sum % 10
  }

}

PRINT = arr.slice(z-8, z).reverse().join``