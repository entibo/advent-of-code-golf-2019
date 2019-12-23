[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/entibo/advent-of-code-golf-2019) 

# advent-of-code-golf-2019

* A program can read the input from variable `IN` and should write the output in `OUT` (initially 0)
* Early exit can be achieved by accessing the variable `EXIT`
* `./run 3` will run `./js/3.js` against the input currently in `./input.txt`

#### Example: *Day 1, Part Two*
```javascript
IN.split('\n').map(m => { while(m = m / 3 - 2 ^ 0, m > 0) OUT += m })
```