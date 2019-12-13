
const OPCODE = {
  ADD:    1,
  MUL:    2,
  IN:     3,
  OUT:    4,
  TJMP:   5,
  FJMP:   6,
  LT:     7,
  EQ:     8,
  RBO:    9,
  HALT:   99,
}

const PARAMETER_MODE = {
  POSITION:   0,
  IMMEDIATE:  1,
  RELATIVE:   2,
}

class IntCodeProgram extends Array {

  constructor(program, autoStart=false) {
    super()
    this.push(...program.split(',').map(x => parseInt(x)))

    this.inputBuffer = []
    this.outputBuffer = []

    this.pointer = 0
    this.relativeBase = 0
    this.state = 'READY'

    autoStart && this.compute()
  }

  input(...values) {
    this.inputBuffer.push(...values)
    if(this.state === 'WAITING_FOR_INPUT') {
      this.compute()
    }
    return this
  }

  output() {
    return this.outputBuffer.slice()
  }

  compute() {
    
    this.state = 'COMPUTING'
    while(this.state === 'COMPUTING') {

      if(this.pointer >= this.length) {
        this.state = 'ERROR'
        throw 'Unexpected end of input'
      }

      let header = this.getInstructionHeader(this.pointer)
      let a, b, c, result
      switch(header.opcode) {

        case OPCODE.HALT:
          this.state = 'HALTED'
          break

        case OPCODE.IN:
          if(this.inputBuffer.length) {
            result = this.inputBuffer.shift()
            this.write(result, this.pointer+1, header.parameterMode[0])
            this.pointer += 2
          }
          else {
            this.state = 'WAITING_FOR_INPUT'
          }
          break

        case OPCODE.OUT:
          a = this.read(this.pointer+1, header.parameterMode[0])
          if(!(typeof a === 'number') || isNaN(a) || !isFinite(a)) {
            this.state = 'ERROR'
            throw 'Invalid Int (output): '+a
          }
          this.outputBuffer.push(a)
          this.pointer += 2
          break

        case OPCODE.RBO:
          a = this.read(this.pointer+1, header.parameterMode[0])
          if(!(typeof a === 'number') || isNaN(a) || !isFinite(a)) {
            this.state = 'ERROR'
            throw 'Invalid Int (relative base offset): '+a
          }
          this.relativeBase += a
          this.pointer += 2
          break

        case OPCODE.ADD: case OPCODE.MUL:
          a = this.read(this.pointer+1, header.parameterMode[0])
          b = this.read(this.pointer+2, header.parameterMode[1])
          result = header.opcode === OPCODE.ADD ? a + b : a * b
          this.write(result, this.pointer+3, header.parameterMode[2])
          this.pointer += 4
          break

        case OPCODE.TJMP: case OPCODE.FJMP:
          a = this.read(this.pointer+1, header.parameterMode[0])
          let doJump = (a !== 0) === (header.opcode === OPCODE.TJMP)
          if(doJump) {
            b = this.read(this.pointer+2, header.parameterMode[1])
            this.pointer = b
          }
          else {
            this.pointer += 3
          }
          break

        case OPCODE.LT: case OPCODE.EQ:
          a = this.read(this.pointer+1, header.parameterMode[0])
          b = this.read(this.pointer+2, header.parameterMode[1])
          result = Number( header.opcode === OPCODE.LT ? a < b : a == b )
          this.write(result, this.pointer+3, header.parameterMode[2])
          this.pointer += 4
          break

        default:
          this.state = 'ERROR'
          throw 'Unknown opcode: '+header.opcode
      }

    }

  }

  getInstructionHeader(pointer) {
    let n = this.read(pointer, PARAMETER_MODE.IMMEDIATE)
    return {
      opcode: n%100,
      parameterMode: [n/100, n/1000, n/10000].map(x => (x%10)^0)
    }
  }

  read(pointer, parameterMode=PARAMETER_MODE.IMMEDIATE) {
    if(pointer < 0) {
      this.state = 'ERROR'
      throw 'Out-of-range pointer (read): '+pointer
    }
    if(parameterMode === PARAMETER_MODE.IMMEDIATE) {
      if(this[pointer] === undefined) { // Memory 
        return 0
      }
      return this[pointer]
    }
    else if(parameterMode === PARAMETER_MODE.POSITION){
      let a = this.read(pointer, PARAMETER_MODE.IMMEDIATE)
      return this.read(a, PARAMETER_MODE.IMMEDIATE)
    }
    else if(parameterMode === PARAMETER_MODE.RELATIVE){
      let a = this.read(pointer, PARAMETER_MODE.IMMEDIATE)
      let address = this.relativeBase + a
      return this.read(address, PARAMETER_MODE.IMMEDIATE)
    }
    else {
      this.state = 'ERROR'
      throw 'Invalid parameter mode (read): '+parameterMode
    }
  }

  write(value, pointer, parameterMode) {
    if(parameterMode === PARAMETER_MODE.POSITION){
      pointer = this.read(pointer, PARAMETER_MODE.IMMEDIATE)
    }
    else if(parameterMode === PARAMETER_MODE.RELATIVE){
      pointer = this.read(pointer, PARAMETER_MODE.IMMEDIATE) + this.relativeBase
    }
    else {
      this.state = 'ERROR'
      throw 'Invalid parameter mode (write): '+parameterMode
    }

    if(pointer < 0) {
      this.state = 'ERROR'
      throw 'Out-of-range pointer (write): '+pointer
    }
    if(!(typeof value === 'number') || isNaN(value) || !isFinite(value)) {
      this.state = 'ERROR'
      throw 'Invalid Int (write): '+value
    }
    this[pointer] = value
  }

}

module.exports = IntCodeProgram