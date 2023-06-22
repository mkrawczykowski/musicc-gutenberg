const path = require('path');
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: glob.sync('./src/**/index.js', { dot: true }).reduce((acc, path) => {
      // console.log(`path: ${path}`);


      const entry = path;
      // const entry = path.replace('index.js', '')
      // path = './' + path;
      // console.log(`path: ${path}`);
      let withoutPath;

      // // const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
      // console.log(`entry: ${entry}`);
      // console.log(entry.includes('src\\js\\blocks\\'));

      if (entry.includes('src\\js\\blocks\\')) {
        path = entry.replace('src\\js\\blocks\\', '')
        console.log(`entry: ${entry}`)
      }
      if (entry.includes('src\\')) {
        console.log(`entry: ${entry}`)
        path = entry.replace('src\\', '')
        console.log(`path 2: ${path}`)
      }

      path = './' + path;

      // const withoutBackslash = withoutPath.replace(/\\/g, '')
      // console.log(withoutBackslash)

      acc[entry] = path
      console.log(acc)
      console.log('-------------');
      return acc
    }, {}),
    output: {
      filename: '[name]',
      path: path.resolve(__dirname, 'dist'),
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: [new MiniCssExtractPlugin({
      filename: "style.min.css"
    })],
    module: {
      rules: [
        {
          test: /\.(scss|sass|less|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    }
  }

};