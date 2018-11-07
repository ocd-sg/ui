const webpack = require('webpack')
const config = require('../config/webpack.config.build-app')

const buildApp = () => {
  const compiler = webpack(config)
  compiler.run((err, stats) => {
    if (err) { return console.error(err) }

    console.log(stats.toString({
      chunks: false,
      colors: true
    }))
  })
}

module.exports = buildApp
