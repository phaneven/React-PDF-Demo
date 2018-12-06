import { resolve } from 'path';
import webpackMerge from 'webpack-merge';
import CompressionPlugin from 'compression-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import baseConfig from './webpack.config.base.babel';

const mode = process.env.NODE_ENV;
const config = webpackMerge(baseConfig, {});

if (mode === 'production') {
  config.entry = {
    app: resolve(__dirname, '../src/index.js'),
    vendor: [
      'react',
      'react-dom',
      'pdfjs-dist',
    ],
  };
  config.output = {
    filename: '[name].[hash].js',
    chunkFilename: 'chunks/[name].[hash].bundle.js',
  };
  config.plugins = [
    ...config.plugins,
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './reports-index.html',
      openAnalyzer: false,
    }),
  ];
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: 'vendor',
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  };
}

module.exports = config;
