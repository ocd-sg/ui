const req = require.context('project', true, /story\.tsx$/)
const { configure, addDecorator } = require('@storybook/react')
const { withInfo } = require('@storybook/addon-info')

addDecorator(withInfo({
  header: false,
  inline: false,
  propTables: null,
  styles: (stylesheets) => ({
    ...stylesheets,
    children: {
      ...stylesheets.children,
      height: '100vh'
    }
  })
}))
configure(loadStories, module)

function loadStories () {
  return req.keys().forEach(req)
}
