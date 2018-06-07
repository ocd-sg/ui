const paths = require('../../../utils/paths')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const { HOST = 'localhost', PORT = 9000, TITLE = 'Module' } = process.env

const config = {
  ...baseConfig,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    require.resolve('../app')
  ],
  output: {
    publicPath: `http://${HOST}:${PORT}/`,
    filename: 'bundle.js'
  },
  devServer: {
    host: HOST,
    port: PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        secure: false
      }
    }
  },
  plugins: [
    ...baseConfig.plugins,
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: TITLE
    })
  ]
}

module.exports = config
