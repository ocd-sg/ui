const cp = require('child_process')
const path = require('path')
const paths = require('../../../utils/paths')

const buildApp = () => {
  const storybook = require.resolve('@storybook/react/bin/build')
  const config = path.resolve(__dirname, '../app')
  const out = paths.projectBuildAppPath
  const child = cp.spawn(
    storybook,
    `--config-dir ${config} -o ${out}`.split(' ')
  )

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

module.exports = buildApp
