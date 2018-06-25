const paths = require('../../../utils/paths')
const webpack = require('webpack')

const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = (baseConfig) => ({
  ...baseConfig,
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
  plugins: [...baseConfig.plugins, new DashboardPlugin()],
  resolve: {
    ...baseConfig.resolve,
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      project: paths.projectSourcePath,
      react: require.resolve('react')
    },
    symlinks: false
  }
})
