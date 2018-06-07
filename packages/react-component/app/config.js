const req = require.context('project', true, /story\.tsx$/)
const { configure } = require('@storybook/react')

const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)
