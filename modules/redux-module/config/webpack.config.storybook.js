const paths = require('../../../utils/paths')
const webpack = require('webpack')

module.exports = ({ config }) => ({
  ...config,
  output: {
    ...config.output,
    globalObject: 'this'  // for `worker-loader`
  },
  module: {
    rules: [
      ...config.module.rules,
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
        test: /\.css$/,
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
  plugins: [...config.plugins],
  resolve: {
    ...config.resolve,
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      project: paths.projectSourcePath,
      app: paths.projectSourcePath,
      react: require.resolve('react')
    },
    symlinks: false
  }
})
