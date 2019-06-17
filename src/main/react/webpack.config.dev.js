const path = require("path");
const webpack = require("webpack");

const CONTEXT_PATH = "/taskorger";
const API_PATH = CONTEXT_PATH + "/api";
const API_PORT = 8081;

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "../webapp"),
    filename: "assets/js/taskorger.bundle.js",
    // publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "../webapp"),
    port: 3000,
    hot: true,
    historyApiFallback: true,
    // https: true,
    proxy: {
      API_PATH: {
        target: {
          host: "localhost",
          protocol: 'http:',
          port: API_PORT,
        },
        secure: false,
        prependPath: false
      },
    }
  }
};