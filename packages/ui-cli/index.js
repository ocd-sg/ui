const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const { paths } = require('@ocd-ui/utils')
const program = require('commander')
const package = require('./package.json')

module.exports = (modules) => {
  program
    .version(package.version)
    .description(package.description)

  program
    .command('list')
    .description('list available modules')
    .action(list)

  program
    .command('update')
    .description('update config')
    .action(update)

  program
    .command('init [module]')
    .description('initialize a module')
    .action(init)

  // module specific commands
  modules.forEach((module) => {
    const { name, tasks } = module
    program
      .command(`${name} [task]`)
      .action((_task) => {
        const task = tasks[_task]
        if (!task) {
          console.log(`Available tasks for ${name}:`)
          Object.keys(tasks)
            .forEach((task) => console.log(`  ${task}`))
          return
        } else {
          task()
        }
      })
  })

  program.parse(process.argv)

  if (!program.args.length) { return program.help() }

  function list () {
    console.log('Available modules:')
    modules.forEach(({ name }) => { console.log(`  ${name}`) })
  }

  function update () {
    cp.spawnSync('cp', [
      require.resolve('@ocd-ui/config/git/gitignore'),
      path.resolve(paths.project, '.gitignore')
    ])
    cp.spawnSync('cp', [
      require.resolve('@ocd-ui/config/typescript/tslint.json'),
      paths.project
    ])
    cp.spawnSync('cp', [
      require.resolve('@ocd-ui/config/typescript/tsconfig.json'),
      paths.project
    ])
    cp.spawnSync('cp', [
      require.resolve('@ocd-ui/config/prettier/prettierrc.js'),
      path.resolve(paths.project, '.prettierrc.js')
    ])
    console.log('Updated config files')
  }

  function init (_module) {
    const module = modules.find(({ name }) => name === _module)
    if (!module) {
      return list()
    } else {
      const { name, tasks } = module
      const template = path.resolve(module.path, 'template')

      // initialize package.json
      cp.spawnSync('npm', 'init --yes'.split(' '))
      const package = require(paths.package)
      package.scripts = {
        ...package.scripts,
        ...Object.keys(tasks)
          .reduce((memo, task) => ({
            ...memo,
            [task]: `ui ${name} ${task}`
          }), {})
      }
      fs.writeFileSync(paths.package, JSON.stringify(package, null, 2))
      console.log(`Initialized package.json`)

      // initialize with template
      cp.spawnSync('cp', [
        '-r',
        path.resolve(template, 'src'),
        paths.project
      ])
      cp.spawnSync('cp', [
        path.resolve(template, 'README.md'),
        paths.project
      ])
      console.log(`Initialized template`)

      // initialize with config
      update()

      console.log(`Initialized ${name}`)
    }
  }
}
