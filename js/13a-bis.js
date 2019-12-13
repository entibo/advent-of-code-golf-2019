
OUT = intcode(IN).output().filter((x,i) => i%3 == 2 && x == 2).length

