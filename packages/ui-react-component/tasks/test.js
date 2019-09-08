const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const config = require('../config/webpack.config.test.js')

const test = () => {
  const fs = new MemoryFS()
  const compiler = webpack(config)

  compiler.outputFileSystem = fs
  compiler.run(() => {
    eval(fs.readFileSync('/bundle.js', 'utf8'))
  })
}

module.exports = test
