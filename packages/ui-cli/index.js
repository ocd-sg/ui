const path = require('path')
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
    .action(() => {
      console.log('Available modules:')
      console.log()
      modules.forEach(({ name }) => { console.log(`  ${name}`) })
      console.log()
    })

  program
    .command('init [module]')
    .description('initialize a module')
    .action((_module) => {
      const module = modules.find(({ name }) => name === _module)
      if (!module) {
        return console.error('Module not found, run `list` to see available modules')
      } else {
        const { name, tasks } = module
        console.log(`Initializing ${name}`)
        tasks.init()
        console.log('Done')
      }
    })

  // module specific commands
  modules.forEach((module) => {
    const { name, tasks } = module
    program
      .command(`${name} [task]`)
      .action((task) => {
        if (!task) {
          const _tasks = Object.keys(tasks).filter((d) => d !== 'init')
          console.log(`Available tasks for ${name}`)
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
}
