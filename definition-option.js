import Definition from './definition.js'

class OptionDefinition extends Definition {
  type

  constructor (optionDefinition) {
    super(optionDefinition)
    this.type = optionDefinition.type
  }
}

export default OptionDefinition
