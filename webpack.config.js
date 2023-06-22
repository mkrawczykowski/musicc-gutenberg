const path = require('path');
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const test = glob.sync('./src/**/index.js').reduce((acc, path) => {
  const entry = path.replace('/index.js', '')
  if (entry.includes('src\\blocks\\')) {
    console.log('includes MORE')
    console.log(`entry: ${entry}`)
    path = entry.replace('src\\blocks\\', '').replace('\\index.js', '')

    acc[`blocks/${path}/${path}`] = { import: `./src/blocks/${path}/index.js`, filename: './[name].js' }
  }
  if (entry.includes('src\\')) {
    console.log('includes LESS')
    console.log(`entry: ${entry}`)
    path = entry.replace('src\\', '')
    acc['main'] = './src/index.js'
  }
  console.log('---------------');
  return acc
}, {})
console.log('======================')
// console.log('test')
console.log(test)

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





    // entry: {
    //   main: './src/index.js',
    //   'blocks/test-block/test-block': {
    //     import: './src/blocks/test-block/index.js',
    //     filename: './[name].js'
    //   },
    //   'blocks/list-of-tracks/list-of-tracks': {
    //     import: './src/blocks/list-of-tracks/index.js',
    //     filename: './[name].js'
    //   }
    // }
    // ,

    // entry: {
    //   'main': './src/index.js',
    //   'blocks/blocks': { import: './src/blocks-index.js', filename: './[name].js' },
    //   // 'blocks/blocks': glob.sync('./src/**/index.js', { dot: true }).reduce((acc, path) => {
    // },

    // entry: glob.sync('./src/**/index.js', { dot: true }).reduce((acc, path) => {
    //   // console.log(`path: ${path}`);


    //   const entry = path;
    //   // const entry = path.replace('index.js', '')
    //   // path = './' + path;
    //   // console.log(`path: ${path}`);
    //   let withoutPath;

    //   // // const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
    //   // console.log(`entry: ${entry}`);
    //   // console.log(entry.includes('src\\js\\blocks\\'));

    //   if (entry.includes('src\\js\\blocks\\')) {
    //     path = entry.replace('src\\js\\blocks\\', '')
    //     console.log(`entry: ${entry}`)
    //   }
    //   if (entry.includes('src\\')) {
    //     console.log(`entry: ${entry}`)
    //     path = entry.replace('src\\', '')
    //     console.log(`path 2: ${path}`)
    //   }

    //   path = './' + path;

    //   // const withoutBackslash = withoutPath.replace(/\\/g, '')
    //   // console.log(withoutBackslash)

    //   acc[entry] = path
    //   console.log(acc)
    //   console.log('-------------');
    //   return acc
    // }, {}),


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