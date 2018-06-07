const cp = require('child_process')
const path = require('path')
const paths = require('../../../utils/paths')

const dashboard = require('webpack-dashboard/bin/webpack-dashboard')

const dev = () => {
  const storybook = require.resolve('@storybook/react/bin')
  const config = path.resolve(__dirname, '../app')
  const { name } = require(paths.projectPackagePath)
  dashboard({
    argv: `_ _ --color cyan --title dev:${name} -- ${storybook} --port 9000 --config-dir ${config} --quiet`.split(
      ' '
    )
  })
}

module.exports = dev
