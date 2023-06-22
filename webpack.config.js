const path = require('path');
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  return {
    entry: glob.sync('./src/**/index.js').reduce((acc, path) => {
      const entry = path.replace('/index.js', '')
      if (entry.includes('src\\blocks\\')) {
        path = entry.replace('src\\blocks\\', '').replace('\\index.js', '')
        acc[`blocks/${path}/${path}`] = { import: `./src/blocks/${path}/index.js`, filename: './[name].js' }
      }
      if (entry.includes('src\\')) {
        path = entry.replace('src\\', '')
        acc['main'] = './src/index.js'
      }
      return acc
    }, {}),
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    plugins: [new MiniCssExtractPlugin({
      filename: "[name].css"
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