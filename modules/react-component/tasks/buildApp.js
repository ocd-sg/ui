const path = require('path')
const paths = require('../../../utils/paths')
const storybook = require('@storybook/react/standalone')

const buildApp = () => {
  storybook({
    mode: 'static',
    configDir: path.resolve(__dirname, '../app'),
    outputDir: paths.projectBuildAppPath
  })
}

module.exports = buildApp
