import Arg from './arg.js'

class Value extends Arg {
  static create (arg) {
    const matches = arg.match(/^--(\S+)/)
    if (matches) {
      return new this({ name: matches[1] })
    }
  }
}

export default Value
