const paths = require('../../../utils/paths')
const path = require('path')
const baseConfig = require('./webpack.config.base')

module.exports = {
  ...baseConfig,
  mode: 'production',
  devtool: false,
  context: paths.projectSourcePath,
  entry: [path.resolve(paths.projectSourcePath, 'index.tsx')],
  output: {
    path: paths.projectBuildLibPath,
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  externals: {
    ...baseConfig.externals,
    react: true,
    'react-dom': true
  },
  plugins: [...baseConfig.plugins]
}
