'use strict'
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

require('dotenv').config()

module.exports = (env) => {
  console.log('WEBPACK ENV:', env)

  // VARIABLES
  const isProduction = env === 'production'
  const isDev = env === 'development'

  // PLUGGINS
  // minifying our CSS
  const CSSPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })

  // creating global variables for the app.
  const DefinePlug = new webpack.DefinePlugin({
    VERSION: JSON.stringify(process.env.VERSION),
    baseURL: JSON.stringify(process.env.API_URL),
    environment: JSON.stringify(process.env.ENV)
  })

  // cleans 'dist' folder everytime before a new build
  const CleanPLugin = new CleanWebpackPlugin({ verbose: true })

  const AnalyzerPlugin = new BundleAnalyzerPlugin({ analyzerMode: 'none' })

  const HTMLPlugin = new HtmlWebpackPlugin({
    template: 'template.html',
    chunksSortMode: 'none',
    favicon: 'src/assets/favicon.ico'
  })

  const CopyPlugin = new CopyWebpackPlugin([
    { from: 'src/assets/images', to: 'images' },
    { from: 'src/assets/fonts/webfonts', to: 'webfonts' }
  ])

  // const ContextReplacementPlugin = new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-\w\w/)

  // BUILDING WEBPACK
  const config = {}

  config.entry = './src/app.js'

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    },
    runtimeChunk: { name: 'manifest' },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      }),
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          parallel: true,
          extractComments: true,
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  }

  config.plugins = [CSSPlugin, DefinePlug, CleanPLugin, AnalyzerPlugin, HTMLPlugin, CopyPlugin]

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      }
    ]
  }

  config.resolve = {
    extensions: ['.js']
  }

  if (isProduction) {
    config.output = {
      path: path.join(__dirname, './dist'),
      publicPath: '/',
      chunkFilename: '[name].[chunkhash].bundle.js',
      filename: '[name].[chunkhash].bundle.js'
    }
    config.mode = 'production'
    config.devtool = 'source-map'
  }

  if (isDev) {
    config.output = {
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js'
    }

    config.mode = 'development'
    config.devtool = 'inline-source-map'

    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      port: 3000
    }
  }

  return config
}
