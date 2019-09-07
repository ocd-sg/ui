const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const { paths } = require('@ocd-ui/utils')

const initPackage = () => {
  cp.spawnSync('npm', 'init --yes'.split(' '))
  const package = require(paths.package)

  package.scripts = {
    ...package.scripts,
    'build:app': 'ui javascript-page build:app',
    dev: 'ui javascript-page dev',
    test: 'ui javascript-page test',
    'test:watch': 'ui javascript-page test:watch',
    lint: 'ui javascript-page lint'
  }

  fs.writeFileSync(paths.package, JSON.stringify(package, null, 2))
}

const initTemplate = () => {
  const templatePath = path.resolve(__dirname, '../template')
  cp.spawnSync('cp', [
    '-r',
    path.resolve(templatePath, 'src'),
    paths.project
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, '.gitignore'),
    path.resolve(paths.project, '.gitignore')
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, 'tslint.json'),
    paths.project
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, 'tsconfig.json'),
    paths.project
  ])
  cp.spawnSync('cp', [
    path.resolve(templatePath, 'README.md'),
    paths.project
  ])
}

const init = () => {
  initPackage()
  initTemplate()
}

module.exports = init
