import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import { ArgvArray, isOption, isLongOption, getOptionName } from 'argv-tools'

const tom = new TestRunner.Tom()

tom.test('extractFlags', async function () {
  const argv = new ArgvArray()
  argv.load(['-bc', '--one', '--two'])
  argv.expandGetoptNotation()
  const result = argv.extractFlags([
    { name: 'one' }
  ])
  a.deepEqual(result, { one: true })
  a.deepEqual(Array.from(argv), ['-b', '-c', '--two'])
})

tom.test('extractFlags: multiple', async function () {
  const argv = new ArgvArray()
  argv.load(['-bc', '--one', '--two'])
  argv.expandGetoptNotation()
  const result = argv.extractFlags([
    { name: 'one' },
    { name: 'two' },
  ])
  a.deepEqual(result, { one: true, two: true })
  a.deepEqual(Array.from(argv), ['-b', '-c'])
})

tom.test('extractFlags: alias', async function () {
  const argv = new ArgvArray()
  argv.load(['-abc', '--two'])
  argv.expandGetoptNotation()
  const result = argv.extractFlags([
    { name: 'one', alias: 'a' }
  ])
  a.deepEqual(result, { one: true })
  a.deepEqual(Array.from(argv), ['-b', '-c', '--two'])
})

tom.test('extractOptionValues: alias', async function () {
  const argv = new ArgvArray()
  argv.load(['-a', '1'])
  const result = argv.extractOptionValues([
    { name: 'one', alias: 'a' }
  ])
  a.deepEqual(result, { one: '1' })
  a.deepEqual(Array.from(argv), [])
})

tom.test('extractOptionValues: long option', async function () {
  const argv = new ArgvArray()
  argv.load(['--one', '1'])
  const result = argv.extractOptionValues([
    { name: 'one', alias: 'a' }
  ])
  a.deepEqual(result, { one: '1' })
  a.deepEqual(Array.from(argv), [])
})

tom.test('extractOptionValues: long option, no value', async function () {
  const argv = new ArgvArray()
  argv.load(['--one'])
  const result = argv.extractOptionValues([
    { name: 'one', alias: 'a' }
  ])
  a.deepEqual(result, { one: null })
  a.deepEqual(Array.from(argv), [])
})

tom.test('extractOptionValues: long option, no value, extra option', async function () {
  const argv = new ArgvArray()
  argv.load(['--one', '--two'])
  const result = argv.extractOptionValues([
    { name: 'one', alias: 'a' }
  ])
  a.deepEqual(result, { one: null })
  a.deepEqual(Array.from(argv), ['--two'])
})

export default tom
