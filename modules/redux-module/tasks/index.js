module.exports = {
  init: require('./init'),
  dev: require('./dev'),
  'build:app': require('./buildApp'),
  'build:lib': require('./buildLib'),
  test: require('./test'),
  'test:watch': require('./testWatch'),
  lint: require('./lint')
}
