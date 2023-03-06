import Arg from './arg.js'
import LongOption from './option-long.js'
import LongFlag from './option-long-flag.js'
import LongVar from './option-long-var.js'
import Value from './value.js'
import VarOptionDefinition from './definition-option-var.js'
import FlagOptionDefinition from './definition-option-flag.js'

class ArgV extends Array {
  definitions

  expand () {

  }

  getByRegex (arg) {
    let argObj

    if (argObj = LongOption.create(arg)) {
    } else {
      argObj = Value.create(arg)
    }
    return argObj
  }

  parse (argv) {
    for (const arg of argv) {
      const argObj = this.getByRegex(arg)
      this.push(argObj)
    }
  }

  applyDefinitions (definitions) {
    this.definitions = definitions
    for (const definition of definitions) {
      const matchingArg = this.find(a => a.name === definition.name)
      if (matchingArg) {
        if (matchingArg instanceof LongOption) {
          if (definition instanceof FlagOptionDefinition) {
            const longFlag = new LongFlag(matchingArg)
            this.splice(this.indexOf(matchingArg), 1, longFlag)
          } else if (definition instanceof VarOptionDefinition) {
            const longVar = new LongVar(matchingArg)
            this.splice(this.indexOf(matchingArg), 1, longVar)
          } else {
            throw new Error('broken')
          }
        }
      }
    }
  }

  getResult () {
    const result = {}
    let activeDefinition = null
    for (const arg of this) {
      if (arg instanceof LongFlag) {
        activeDefinition = null
        result[arg.name] = true
      } else if (arg instanceof LongVar) {
        activeDefinition = this.definitions.find(d => d.name === arg.name)
        if (activeDefinition.multiplicity === 1) {
          result[arg.name] = null
        } else {
          result[arg.name] = []
        }
      } else if (arg instanceof Value) {
        if (activeDefinition instanceof VarOptionDefinition && activeDefinition.multiplicity > 0) {
          if (Array.isArray(result[activeDefinition.name])) {
            result[activeDefinition.name].push(arg.value)
          } else {
            result[activeDefinition.name] = arg.value
          }
          activeDefinition.multiplicity--
        } else {
          // throw new Error('broken')
        }
      }
    }
    return result
  }
}

export default ArgV

// const argv = new ArgV()
// argv.parse(
//   ['--verbose', '--timeout', '100']
// )
// argv.applyDefinitions([
//   new VarOptionDefinition({ name: 'timeout', type: Number, multiplicity: 1 }),
//   new FlagOptionDefinition({ name: 'verbose' }),
// ])
// const result = argv.getResult()

// console.log(argv)
// console.log(result)
