import { resolve } from 'path';
import webpack from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

module.exports = {
  entry: {
    app: resolve(__dirname, '../src/index.js'),
    // 'pdf.worker': resolve(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.entry.js'),
  },
  output: {
    path: resolve(__dirname, '../dist'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolve(__dirname, '../src'),
        loader: 'eslint-loader',
        options: {
          cache: true, // enable caching of the linting results into '/node_modules/.cache'
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: resolve(__dirname, '../src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }],
      }
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: resolve(__dirname, '../src/template.html'),
    }),
    new CleanWebpackPlugin(['dist'], {
      root: resolve(__dirname, '..'),
      exclude: ['public'],
    }),
    new webpack.DefinePlugin({
      // 定义前端全局变量
    }),
  ],
};
