import TestRunner from 'test-runner'
import { strict as a } from 'assert'
import { ArgvArray, isOption, isLongOption, getOptionName } from 'argv-tools'

const tom = new TestRunner.Tom()

tom.test('extractFlags', async function () {
  const argv = new ArgvArray()
  argv.load(['-bc', '--one', '--two'])
  argv.expandGetoptNotation()
  const result = argv.extractFlags([
    { name: 'one', alias: 'a' }
  ])
  a.deepEqual(result, { one: true })
  a.deepEqual(Array.from(argv), ['-b', '-c', '--two'])
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

export default tom
