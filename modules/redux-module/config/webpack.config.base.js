const paths = require('../../../utils/paths')
const webpack = require('webpack')

const config = {
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
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      app: paths.projectSourcePath
    }
  },
  externals: [],
  plugins: [
    // new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  stats: 'minimal'
}

module.exports = config
