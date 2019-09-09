module.exports = {
  dev: require('./dev'),
  storybook: require('./storybook'),
  'build:app': require('./buildApp'),
  'build:lib': require('./buildLib'),
  'build:storybook': require('./buildStorybook'),
  test: require('./test'),
  'test:watch': require('./testWatch'),
  lint: require('./lint')
}
