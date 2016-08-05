var webpack = require('webpack');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var nodeExternals = require('webpack-node-externals');

var config = {
  context: __dirname + '/src',
  entry: __dirname + '/src/renderer/index.js',
  // in order to ignore built-in modules like path, fs, etc.
  target: 'node',
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals({
    // this WILL include `webpack/hot/dev-server` in the bundle
    whitelist: [/webpack/]
  })],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    publicPath: 'http://localhost:8080/build/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
          compact: false
        }
      },
      { test: /\.less$/, loader: "style!css!less" }
    ]
  }
};
config.target = webpackTargetElectronRenderer(config);
module.exports = config
