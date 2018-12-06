import { resolve } from 'path';
import webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import baseConfig from './webpack.config.base.babel';

const mode = process.env.NODE_ENV;
const config = webpackMerge(baseConfig, {});

if (mode === 'development') {
  config.entry = {
    ...config.entry,
  };
  config.output = {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    globalObject: 'this',
  };
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ];
  config.devtool = 'inline-source-map';
  config.devServer = {
    contentBase: resolve(__dirname, '../dist'),
    // historyApiFallback: true,
    compress: true,
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api': 'http://127.0.0.1:8080',
    },
  };
}

module.exports = config;
