const paths = require('../../../utils/paths')
const webpack = require('webpack')

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      app: paths.projectSourcePath
    }
  },
  externals: [],
  plugins: [],
  stats: 'minimal'
}

module.exports = config
