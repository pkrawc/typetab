const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = ({ production }) => ({
  mode: production ? "production" : "development",
  entry: {
    main: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }]
  },
  devServer: {
    contentBase: "dist",
    stats: {
      version: false,
      chunks: false,
      modules: false,
      children: false,
      source: false,
      publicPath: false
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      minify: production ? true : false
    }),
    new CopyWebpackPlugin(["src/manifest.json"])
  ]
})
