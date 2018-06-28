const cp = require('child_process')
const path = require('path')
const paths = require('../../../utils/paths')

const buildLib = () => {
  const tsc = require.resolve('typescript/bin/tsc')
  const child = cp.spawn(tsc, [
    '--project',
    paths.projectPath,
    '--outDir',
    paths.projectBuildLibPath
  ])

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

module.exports = buildLib
