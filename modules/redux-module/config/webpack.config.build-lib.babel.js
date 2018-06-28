const paths = require('../../../utils/paths')
const baseConfig = require('./webpack.config.base')

const config = {
  ...baseConfig,
  context: paths.projectSourcePath,
  entry: [paths.projectSourcePath],
  output: {
    path: paths.projectBuildLibPath,
    filename: 'lib.min.js'
  }
}

module.exports = config
