import OptionDefinition from './definition-option.js'

class VarOptionDefinition extends OptionDefinition {
  type
  multiplicity

  constructor (definition) {
    super(definition)
    this.type = definition.type
    this.multiplicity = definition.multiplicity
  }
}

export default VarOptionDefinition
