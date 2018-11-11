const paths = require('../../../utils/paths')
const webpack = require('webpack')

module.exports = (baseConfig) => ({
  ...baseConfig,
  output: {
    ...baseConfig.output,
    globalObject: 'this'  // for `worker-loader`
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
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
  plugins: [...baseConfig.plugins],
  resolve: {
    ...baseConfig.resolve,
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      project: paths.projectSourcePath,
      app: paths.projectSourcePath,
      react: require.resolve('react')
    },
    symlinks: false
  }
})
