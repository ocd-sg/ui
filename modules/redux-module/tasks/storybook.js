const path = require('path')
const sb = require('@storybook/react/standalone')

const storybook = () => {
  sb({
    mode: 'dev',
    configDir: path.resolve(__dirname, '../storybook'),
    port: 9001,
    quiet: true,
    ci: true
  })
}

module.exports = storybook
