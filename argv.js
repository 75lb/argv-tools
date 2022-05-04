import Arg from './arg.js'

class ArgV extends Array {
  expand () {

  }

  async parse (optionDefinitions) {
    for (const arg of this) {
      const argObj = await Arg.getByRegex(arg)
      console.log(argObj)
    }
  }
}

export default ArgV

import OptionDefinition from './definition-option.js'
import FlagDefinition from './definition-flag.js'

const argv = ArgV.from(['--verbose', '--timeout', '100'])
await argv.parse([
  new OptionDefinition({ name: 'timeout', type: Number }),
  new FlagDefinition({ name: 'verbose' }),
])
console.log(argv)
