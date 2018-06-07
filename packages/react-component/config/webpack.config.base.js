const paths = require('../../utils/paths')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        include: paths.projectSourcePath,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {}
  },
  externals: {},
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  stats: 'minimal'
}
