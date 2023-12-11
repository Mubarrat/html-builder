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
      banner: `Html-Builder JavaScript Library v1.0.0
https://github.com/Mubarrat/html-builder/

Copyright OpenJS Foundation and other contributors
Released under the MIT license
https://github.com/Mubarrat/html-builder/blob/main/LICENSE`,
      raw: false
    })
  ]
};
