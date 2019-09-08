const cp = require('child_process')
const fs = require('fs')
const path = require('path')
const { paths } = require('@ocd-ui/utils')

const initPackage = () => {
  cp.spawnSync('npm', 'init --yes'.split(' '))
  const package = require(paths.package)
  const name = require('../package').name.replace('@ocd-ui/', '')

  package.scripts = {
    ...package.scripts,
    'build:lib': `ui ${name} build:lib`,
    'build:storybook': `ui ${name} build:storybook`,
    storybook: `ui ${name} storybook`,
    test: `ui ${name} test`,
    'test:watch': `ui ${name} test:watch`,
    lint: `ui ${name} lint`
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
