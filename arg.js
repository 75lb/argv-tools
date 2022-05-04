class Arg {
  regExp () {}

  static async getByRegex (arg) {
    let argObj

    if (argObj = LongOption.create(arg)) {
    } else {
      argObj = Value.create(arg)
    }
    return argObj
  }
}

export default Arg
