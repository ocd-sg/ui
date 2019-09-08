module.exports = {
  init: require('./init'),
  storybook: require('./storybook'),
  'build:lib': require('./buildLib'),
  'build:storybook': require('./buildStorybook'),
  test: require('./test'),
  'test:watch': require('./testWatch'),
  lint: require('./lint')
}
