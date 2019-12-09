
OUT = ''
for(k = 0; k < 150; k++)
  k % 25 || (OUT += '\n'),
  OUT += frange(100)(i => IN[k+i*150]).find(s => s != 2)
