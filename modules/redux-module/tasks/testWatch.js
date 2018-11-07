const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const config = require('../config/webpack.config.test.js')

const testWatch = () => {
  const fs = new MemoryFS()
  const compiler = webpack(config)

  compiler.outputFileSystem = fs
  const watcher = compiler.watch(
    {},
    () => {
      eval(fs.readFileSync('/bundle.js', 'utf8'))
    }
  )
}

module.exports = testWatch
