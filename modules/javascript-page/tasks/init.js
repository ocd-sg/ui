const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const paths = require('../../../utils/paths')

const initPackage = () => {
  cp.spawnSync('npm', 'init --yes'.split(' '))
  const package = require(paths.projectPackagePath)

  package.scripts = {
    ...package.scripts,
    'build:app': 'ui javascript-page build:app',
    dev: 'ui javascript-page dev',
    test: 'ui javascript-page test',
    'test:watch': 'ui javascript-page test:watch',
    lint: 'ui javascript-page lint'
  }

  fs.writeFileSync(paths.projectPackagePath, JSON.stringify(package, null, 2))
}

const initTemplate = () => {
  const templatePath = path.resolve(__dirname, '../template')
  cp.spawnSync('cp', [
    '-r',
    path.resolve(templatePath, 'src'),
    paths.projectPath
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, '.gitignore'),
    path.resolve(paths.projectPath, '.gitignore')
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, 'tslint.json'),
    paths.projectPath
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, 'tsconfig.json'),
    paths.projectPath
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, 'README.md'),
    paths.projectPath
  ])
}

const init = () => {
  initPackage()
  initTemplate()
}

module.exports = init
