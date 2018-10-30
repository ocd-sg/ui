const paths = require("../../../utils/paths");
const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin({
      filename: "styles.css",
      allChunks: true
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
