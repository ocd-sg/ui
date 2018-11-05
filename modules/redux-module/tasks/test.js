const cp = require('child_process')
const path = require('path')
const paths = require('../../../utils/paths')

const test = () => {
  const tape = path.resolve(require.resolve('tape'), 'bin/tape')
  const child = cp.spawn(tape, '-r ts-node/register **/*.test.ts'.split(' '))

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

module.exports = test
