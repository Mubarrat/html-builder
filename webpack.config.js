const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/html.ts',
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'html.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: "module"
  },
  experiments: {
    outputModule: true
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `/**
 * @package Html-Builder
 * @version 1.0.0
 * @license MIT
 */`,
      raw: true
    })
  ]
};
