const { paths } = require('@ocd-ui/utils')
const webpack = require('webpack')

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      app: paths.source
    }
  },
  externals: [],
  plugins: [],
  stats: 'minimal'
}

module.exports = config
