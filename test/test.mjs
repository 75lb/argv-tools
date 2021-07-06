import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import { ArgvArray, isOption, isLongOption, getOptionName } from 'argv-tools'

const tom = new TestRunner.Tom()

tom.test('argvArray.expandOptionEqualsNotation()', function () {
  const argv = new ArgvArray()
  argv.load(['--one=1', '--two', '2', '--three=3', '4'])
  argv.expandOptionEqualsNotation()
  a.deepEqual(Array.from(argv), [
    '--one', '1', '--two', '2', '--three', '3', '4'
  ])
})

tom.test('argvArray.expandOptionEqualsNotation() 2', function () {
  const argv = new ArgvArray()
  argv.load(['--one=tree'])
  argv.expandOptionEqualsNotation()
  a.deepEqual(Array.from(argv), ['--one', 'tree'])
})

tom.test('argvArray.expandGetoptNotation()', function () {
  const argv = new ArgvArray()
  argv.load(['-abc'])
  argv.expandGetoptNotation()
  a.deepEqual(Array.from(argv).slice(), [
    '-a', '-b', '-c'
  ])
})

tom.test('argvArray.expandGetoptNotation() with values', function () {
  const argv = new ArgvArray()
  argv.load(['-abc', '1', '-a', '2', '-bc'])
  argv.expandGetoptNotation()
  a.deepEqual(Array.from(argv), [
    '-a', '-b', '-c', '1', '-a', '2', '-b', '-c'
  ])
})

tom.test('argvArray.hasCombinedShortOptions()', function () {
  const argv = new ArgvArray()
  argv.load(['-abc', '1', '-a', '2'])
  a.equal(argv.hasCombinedShortOptions(), true)
  argv.load(['1', '-a', '2'])
  a.equal(argv.hasCombinedShortOptions(), false)
  argv.load(['1', '-ab', '2'])
  a.equal(argv.hasCombinedShortOptions(), true)
})

tom.test('isOption()', function () {
  a.equal(isOption('--yeah'), true)
  a.equal(isOption('--one-two'), true)
  a.equal(isOption('в--yeah'), false)
  a.equal(isOption('-y'), true)
  a.equal(isOption('--option=value'), false)
  a.equal(isOption('-asd'), false)
})

tom.test('isLongOption()', function () {
  a.equal(isLongOption('--yeah'), true)
  a.equal(isLongOption('--one-two'), true)
  a.equal(isLongOption('в--yeah'), false)
  a.equal(isLongOption('-y'), false)
  a.equal(isLongOption('--option=value'), false)
  a.equal(isLongOption('-asd'), false)
})

tom.test('getOptionName()', function () {
  a.equal(getOptionName('--yeah'), 'yeah')
  a.equal(getOptionName('--one-two'), 'one-two')
  a.equal(getOptionName('в--yeah'), null)
  a.equal(getOptionName('-y'), 'y')
  a.equal(getOptionName('--option=value'), 'option')
  a.equal(getOptionName('-asd'), null)
})

export default tom
