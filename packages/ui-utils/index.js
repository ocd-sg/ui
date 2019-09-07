const path = require('path')

const project = process.cwd()

const paths = {
  project,
  package: path.resolve(project, 'package.json'),
  source: path.resolve(project, 'src'),
  build: path.resolve(project, 'build'),
  app: path.resolve(project, 'build/app'),
  lib: path.resolve(project, 'build/lib'),
  modules: path.resolve(project, 'node_modules')
}

module.exports = { paths }
