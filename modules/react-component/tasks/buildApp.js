const path = require('path')
const storybook = require('@storybook/react/standalone')

const buildApp = () => {
  storybook({
    mode: 'static',
    configDir: path.resolve(__dirname, '../app'),
    outputDir: 'build/app'
  })
}

module.exports = buildApp
