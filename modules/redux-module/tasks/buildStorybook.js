const path = require('path')
const paths = require('../../../utils/paths')
const storybook = require('@storybook/react/standalone')

const buildStorybook = () => {
  storybook({
    mode: 'static',
    configDir: path.resolve(__dirname, '../storybook'),
    outputDir: paths.projectBuildStorybookPath
  })
}

module.exports = buildStorybook
