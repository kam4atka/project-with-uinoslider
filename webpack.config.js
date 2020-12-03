const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, ''),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, ''),
    watchContentBase: true,
  }
};
