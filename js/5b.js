m = IN.split(',').map(x => x^0)
k = 2, m[m[1]] = 5

while(m[k] - 99)
  s = m.slice(k).join(',')
      .replace(/^((?:|100).),([^,]*)/, '$1,m[$2]')
      .replace(/^((?:|10).),([^,]*),([^,]*)/, '$1,$2,m[$3]'),
  [ s => s.replace(/^.{0,3}1,([^,]*),([^,]*),([^,]*).*/, 'k+=4,m[$3]=$1+$2'),
    s => s.replace(/^.{0,3}2,([^,]*),([^,]*),([^,]*).*/, 'k+=4,m[$3]=$1*$2'),
    s => s.replace(/^.{0,3}4,([^,]*).*/, 'k+=2,OUT=$1'),
    s => s.replace(/^.{0,3}5,([^,]*),([^,]*).*/, 'k=$1?$2:k+3'),
    s => s.replace(/^.{0,3}6,([^,]*),([^,]*).*/, 'k=$1?k+3:$2'),
    s => s.replace(/^.{0,3}7,([^,]*),([^,]*),([^,]*).*/, 'k+=4,m[$3]=$1<$2^0'),
    s => s.replace(/^.{0,3}8,([^,]*),([^,]*),([^,]*).*/, 'k+=4,m[$3]=$1==$2^0'),
  ].map(f => eval(f(s)))