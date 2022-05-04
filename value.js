import Arg from './arg.js'

class Value extends Arg {
  value

  constructor (value = {}) {
    super(value)
    this.value = value.value
  }

  static create (arg) {
    return new this({ value: arg })
  }
}

export default Value
