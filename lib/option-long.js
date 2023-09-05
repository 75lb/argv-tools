import Option from './option.js'

class LongOption extends Option {
  static create (arg) {
    const matches = arg.match(/^--(\S+)/)
    if (matches) {
      return new this({ name: matches[1] })
    }
  }
}

export default LongOption
