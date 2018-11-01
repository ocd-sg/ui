#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const paths = require('../utils/paths')
const program = require('commander')
const modules = fs.readdirSync(paths.moduleModulesPath)

program
  .version(require(path.resolve(paths.modulePath, 'package.json')).version)
  .description(require(path.resolve(paths.modulePath, 'package.json')).description)

program
  .command('list')
  .description('list available modules')
  .action(() => {
    console.log('Available modules:')
    console.log()
    modules.forEach((module) => { console.log(`  ${module}`) })
    console.log()
  })

program
  .command('init [module]')
  .description('initialize a module')
  .action((module) => {
    if (!modules.includes(module)) {
      return console.error('Module not found, run `list` to see available modules')
    }
    const tasks = require(path.resolve(paths.moduleModulesPath, module))
    console.log(`Initializing ${module}`)
    tasks.init()
    console.log('Done')
  })

// module specific commands
modules.forEach((module) => {
  program
    .command(`${module} [task]`)
    .action((task) => {
      const tasks = require(path.resolve(paths.moduleModulesPath, module))
      if (!task) {
        const _tasks = Object.keys(tasks).filter((d) => d !== 'init')
        console.log(`Available tasks for ${module}`)
        console.log()
        _tasks.forEach((task) => console.log(`  ${task}`))
        console.log()
        return
      }
      tasks[task]()
    })
})

program.parse(process.argv)

if (!program.args.length) { return program.help() }
