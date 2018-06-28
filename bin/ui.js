#!/usr/bin/env node
const fs = require('fs')
const paths = require('../utils/paths')
const errors = require('../utils/errors')
const args = process.argv.slice(2)

const modules = fs.readdirSync(paths.moduleModulesPath).reduce(
  (memo, _module) => ({
    ...memo,
    [_module]: require(`${paths.moduleModulesPath}/${_module}`)
  }),
  {}
)

const [_module, _task] = args
const task = modules[_module]
  ? modules[_module][_task] || errors.missingTask
  : errors.missingPackage(modules[_module] && modules[_module][_task])

task()
