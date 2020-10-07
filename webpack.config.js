const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: [
    './src/index.js'
  ],
  devServer: {
    historyApiFallback: true,
    host: '192.168.0.103',
    port: 3011,
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules'
    ]
  }
};