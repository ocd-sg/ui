require('tachyons')
require('normalize.css')
require('@blueprintjs/core/lib/css/blueprint.css')

const req = require.context('project', true, /story\.tsx$/)
const { configure, addParameters } = require('@storybook/react')
const { themes } = require('@storybook/theming')

addParameters({
  options: {
    theme: themes.dark
  }
})

configure(loadStories, module)

function loadStories () {
  return req.keys().forEach(req)
}
