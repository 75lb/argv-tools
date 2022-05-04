import Arg from './arg.js'

class Option extends Arg {
  name

  constructor (option) {
    super(option)
    this.name = option.name
  }
}

export default Option
