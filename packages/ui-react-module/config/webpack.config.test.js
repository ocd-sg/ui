const fs = require('fs')
const path = require('path')
const { paths } = require('@ocd-ui/utils')
const webpack = require('webpack')
const glob = require('glob')
const baseConfig = require('./webpack.config.base')

const overrides = fs.existsSync(path.resolve(paths.project, 'webpack.config.test.js'))
  ? require(path.resolve(paths.project, 'webpack.config.test.js'))
  : {}

const config = {
  mode: 'development',
  target: 'node',
  entry: glob.sync(path.resolve(paths.source, '**/*test.ts')),
  output: {
    path: '/',
    filename: 'bundle.js'
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
  plugins: []
}

module.exports = {
  ...baseConfig,
  ...config,
  ...overrides
}
