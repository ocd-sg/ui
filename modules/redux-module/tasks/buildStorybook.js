const path = require('path')
const storybook = require('@storybook/react/standalone')

const buildStorybook = () => {
  storybook({
    mode: 'static',
    configDir: path.resolve(__dirname, '../storybook'),
    outputDir: 'build/storybook' 
  })
}

module.exports = buildStorybook
