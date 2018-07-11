const fs = require('fs')
const path = require('path')
const paths = require('../../../utils/paths')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const { HOST = 'localhost', PORT = 9000, TITLE = 'Module' } = process.env

const overrides = fs.existsSync(path.resolve(paths.projectPath, 'webpack.config.dev.js'))
  ? require(path.resolve(paths.projectPath, 'webpack.config.dev.js'))
  : {}

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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.projectSourcePath,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /(\.css)$/,
        use: [
          {
            loader: require.resolve('style-loader')
          },
          {
            loader: require.resolve('css-loader')
          }
        ]
      }
    ]
  },
  devServer: {
    host: HOST,
    port: PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
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
  ],
  ...overrides
}

module.exports = config
