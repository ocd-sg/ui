const { paths } = require('@ocd-ui/utils')
const webpack = require('webpack')

const config = {
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      app: paths.source
    }
  },
  externals: [],
  plugins: [],
  stats: 'minimal'
}

module.exports = config
