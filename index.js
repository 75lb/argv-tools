'use strict'

/**
 * Handles parsing different argv notations
 *
 * @module argv-tools
 */

 const re = {
   short: /^-([^\d-])$/,
   long: /^--(\S+)/,
   combinedShort: /^-[^\d-]{2,}$/,
   optEquals: /^(--\S+?)=(.*)/
 }

class ArgvArray extends Array {
  load (argv) {
    const arrayify = require('array-back')
    this.clear()
    if (argv && argv !== process.argv) {
      argv = arrayify(argv)
    } else {
      /* if no argv supplied, assume we are parsing process.argv */
      argv = process.argv.slice(0)
      argv.splice(0, 2)
    }
    argv.forEach(arg => this.push(String(arg)))
  }

  clear () {
    this.length = 0
  }

  /**
   * expand --option=value style args. The value is clearly marked to indicate it is definitely a value (which would otherwise be unclear if the value is `--value`, which would be parsed as an option). The special marker is removed in parsing phase.
   */
  expandOptionEqualsNotation () {
    if (this.some(arg => re.optEquals.test(arg))) {
      const expandedArgs = []
      this.forEach(arg => {
        const matches = arg.match(re.optEquals)
        if (matches) {
          expandedArgs.push(matches[1], matches[2])
        } else {
          expandedArgs.push(arg)
        }
      })
      this.clear()
      this.load(expandedArgs)
    }
  }

  /**
   * expand getopt-style combinedShort options
   */
  expandGetoptNotation () {
    if (this.hasCombinedShortOptions()) {
      const findReplace = require('find-replace')
      findReplace(this, re.combinedShort, expandCombinedShortArg)
    }
  }

  hasCombinedShortOptions () {
    return this.some(arg => re.combinedShort.test(arg))
  }

  static from (argv) {
    const result = new this()
    result.load(argv)
    return result
  }
}

function expandCombinedShortArg (arg) {
  /* remove initial hypen */
  arg = arg.slice(1)
  return arg.split('').map(letter => '-' + letter)
}

function isOptionEqualsNotation (arg) {
  return re.optEquals.test(arg)
}

function isOption (arg) {
  return (re.short.test(arg) || re.long.test(arg)) && !re.optEquals.test(arg)
}

function isLongOption (arg) {
  return re.long.test(arg) && !isOptionEqualsNotation(arg)
}

function getOptionName (arg) {
  if (re.short.test(arg)) {
    return arg.match(re.short)[1]
  } else if (isLongOption(arg)) {
    return arg.match(re.long)[1]
  } else if (isOptionEqualsNotation(arg)) {
    return arg.match(re.optEquals)[1].replace(/^--/, '')
  } else {
    return null
  }
}

exports.expandCombinedShortArg = expandCombinedShortArg
exports.re = re
exports.ArgvArray = ArgvArray
exports.getOptionName = getOptionName
exports.isOption = isOption
exports.isLongOption = isLongOption
exports.isOptionEqualsNotation = isOptionEqualsNotation
exports.isValue = arg => !(isOption(arg) || re.combinedShort.test(arg) || re.optEquals.test(arg))
