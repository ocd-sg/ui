const cp = require('child_process')
const path = require('path')
const paths = require('../../../utils/paths')

const buildApp = () => {
  const webpack = require.resolve('webpack/bin/webpack')
  const config = path.resolve(
    __dirname,
    '../config/webpack.config.build-app.js'
  )
  const child = cp.spawn(webpack, `--config ${config}`.split(' '))

  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
}

module.exports = buildApp
