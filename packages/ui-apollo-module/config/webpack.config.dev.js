const fs = require('fs')
const path = require('path')
const { paths } = require('@ocd-ui/utils')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { HOST = 'localhost', PORT = 9000, TITLE = 'Module' } = process.env

const overrides = fs.existsSync(path.resolve(paths.project, 'webpack.config.dev.js'))
  ? require(path.resolve(paths.project, 'webpack.config.dev.js'))
  : {}

const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  // FIXME: wait for React hooks to work with `react-hot-loader`
  // entry: [
  //   'react-hot-loader/patch',
  //   `webpack-dev-server/client?http://${HOST}:${PORT}`,
  //   'webpack/hot/only-dev-server',
  //   require.resolve('../app')
  // ],
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/dev-server',
    require.resolve('../app')
  ],
  output: {
    publicPath: `http://${HOST}:${PORT}/`,
    filename: 'bundle.js',
    globalObject: 'this'  // for `worker-loader`
  },
  devServer: {
    host: HOST,
    port: PORT,
    hot: true,
    quiet: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        secure: false
      },
      '/data': {
        target: 'http://localhost:5000',
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.source,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: { transpileOnly: true }
          }
        ]
      },
      {
        test: /(\.css)$/,
        use: [
          { loader: require.resolve('style-loader') },
          { loader: require.resolve('css-loader') }
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: TITLE
    })
  ]
}

module.exports = {
  ...baseConfig,
  ...config,
  ...overrides
}
