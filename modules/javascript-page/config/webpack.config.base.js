const paths = require('../../../utils/paths')
const webpack = require('webpack')

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      app: paths.projectSourcePath
    }
  },
  externals: [],
  plugins: [],
  stats: 'minimal'
}

module.exports = config
