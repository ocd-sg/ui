const paths = require("../../../utils/paths");
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

const MiniCssExtractTextPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { TITLE = "Module" } = process.env;

const config = {
  ...baseConfig,
  mode: "production",
  entry: [require.resolve("../app")],
  output: {
    path: paths.projectBuildAppPath,
    filename: "bundle.min.js",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: paths.projectSourcePath,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /(\.css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve("css-loader")
          }
        ]
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunks: "all"
    }),
    new HtmlWebpackPlugin({
      title: TITLE
    })
  ],
  optimization: {
    minimize: true
  }
};

module.exports = config;
