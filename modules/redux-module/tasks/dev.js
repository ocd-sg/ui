const path = require('path')
const paths = require('../../../utils/paths')

const dashboard = require('webpack-dashboard/bin/webpack-dashboard')

const dev = () => {
  const webpackDevServer = require.resolve(
    'webpack-dev-server/bin/webpack-dev-server'
  )
  const config = path.resolve(__dirname, '../config/webpack.config.dev.js')
  const { name } = require(paths.projectPackagePath)
  dashboard({
    argv: `_ _ --color cyan --title dev:${name} -- ${webpackDevServer} --port 9000 --config ${config}`.split(
      ' '
    )
  })
}

module.exports = dev
