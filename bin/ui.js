#!/usr/bin/env node
const fs = require('fs')
const paths = require('../utils/paths')
const errors = require('../utils/errors')
const args = process.argv.slice(2)

const packages = fs.readdirSync(paths.modulePackagesPath).reduce(
  (memo, package) => ({
    ...memo,
    [package]: require(`${paths.modulePackagesPath}/${package}`)
  }),
  {}
)

const [_package, _task] = args
const task = packages[_package]
  ? packages[_package][_task] || errors.missingTask
  : errors.missingPackage(packages[_package] && packages[_package][_task])

task()
