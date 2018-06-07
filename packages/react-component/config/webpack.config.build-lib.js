const path = require('path')
const baseConfig = require('./webpack.config.base')

module.exports = {
  ...baseConfig,
  devtool: false,
  context: path.resolve(__dirname, 'src/lib'),
  entry: [
    path.resolve(__dirname, 'src/lib/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.min.js',
    library: 'ui-react-core',
    libraryTarget: 'umd'
  },
  externals: {
    ...baseConfig.externals,
    react: true,
    'react-dom': true
  },
  plugins: [
    ...baseConfig.plugins
  ],
  target: 'web'
}
