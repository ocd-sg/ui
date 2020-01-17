const { paths } = require('@ocd-ui/utils')
const baseConfig = require('./webpack.config.base')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { TITLE = 'Module' } = process.env

const overrides = fs.existsSync(
  path.resolve(paths.project, 'webpack.config.build-app.js')
)
  ? require(path.resolve(paths.project, 'webpack.config.build-app.js'))
  : {}

const config = {
  mode: 'production',
  entry: [require.resolve('../app')],
  output: {
    path: paths.app,
    filename: 'bundle.min.js',
    globalObject: 'this' // for `worker-loader`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.source,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: { transpileOnly: true }
          }
        ]
      },
      {
        test: /(\.css)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: require.resolve('css-loader') }
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: 'styles.css',
      chunks: 'all'
    }),
    new HtmlWebpackPlugin({
      title: TITLE,
      meta: {
        description: require(paths.package).description,
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    })
  ],
  optimization: {
    minimize: true
  }
}

module.exports = {
  ...baseConfig,
  ...config,
  ...overrides
}
