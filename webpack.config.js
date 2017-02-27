module.exports = {
  entry: './src/App.ts',
  output: {
    filename: './dist/app.js'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    loaders: [
      { loader: 'awesome-typescript-loader' }
    ]
  }
};