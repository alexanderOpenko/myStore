module.exports = {
    entry: {
      components: './components/babel/index.js',
    },
    output: {
      filename: '[name].bundle.js', 
      path: __dirname + '/components/build', 
    },
    module: {
      rules: [
        {
          test: /\.(sass|less|css)$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };