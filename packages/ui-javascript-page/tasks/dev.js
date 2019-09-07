const WebPackDevServer = require('webpack-dev-server')
const path = require('path')
const webpack = require('webpack')
const config = require('../config/webpack.config.dev')

const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')

const dev = () => {
  const dashboard = new Dashboard({ color: 'cyan' })
  const webpackOptions = {
    ...config,
    plugins: [
      ...config.plugins,
      new DashboardPlugin({ handler: dashboard.setData })
    ]
  }
  const devServerOptions = {
    ...config.devServer,
    publicPath: config.output.publicPath
  }
  const server = new WebPackDevServer(
    webpack(webpackOptions),
    devServerOptions
  )
  server.listen(config.devServer.port, config.devServer.host)
}

module.exports = dev
