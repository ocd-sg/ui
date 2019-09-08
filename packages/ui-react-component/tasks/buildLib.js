const cp = require('child_process')
const path = require('path')
const paths = require('@ocd-ui/utils')

const buildLib = () => {
  const tsc = require.resolve('typescript/bin/tsc')
  const child = cp.spawn(tsc, [
    '--project',
    paths.project,
    '--outDir',
    paths.lib
  ])

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

module.exports = buildLib
