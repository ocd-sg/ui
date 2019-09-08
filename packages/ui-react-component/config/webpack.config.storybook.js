const { paths } = require('@ocd-ui/utils')
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
        include: paths.source,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
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
      project: paths.source,
      app: paths.source,
      react: require.resolve('react')
    },
    symlinks: false
  }
})
