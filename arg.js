class Arg {
  regExp () {}

  static async getByRegex (arg) {
    let argObj
    const LongOption = (await import('./option-long.js')).default
    const Value = (await import('./value.js')).default

    if (argObj = LongOption.create(arg)) {
      return argObj
    } else if (argObj = Value.create(arg)) {
      return argObj
    }
  }
}

export default Arg
