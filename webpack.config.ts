import * as path from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import 'webpack-dev-server'

import { setMultiHtmlPages } from './util/util'
import config from './config'

const mode: 'production' | 'development' = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const webpackConfiguration: webpack.Configuration = {
   mode: mode,
   //Entries specified in config file
   entry: {
      ...config.entries,
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js',
      //For dynamic asset imports
      assetModuleFilename: 'assets/img/[hash][ext][query]',
   },
   module: {
      rules: [

         //JS 
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },

         //TS
         {
            test: /\.tsx?$/i,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         // CSS | SCSS | SASS
         {
            test: /\.s[ac]ss$/i,
            use: [
               {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '' },
               },
               {
                  loader: 'css-loader',
                  options: { url: false },
               },
               'postcss-loader',
               'resolve-url-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true,
                  },
               },
            ],
         },
         // Dynamic images
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset',
         },
         // Dynamic fonts
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
      ],
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
   plugins: [
      new CleanWebpackPlugin(),
      //Copy img, fonts folder avoiding dynamic imports. 
      //It uses the same path, so if you change the structure you have to adjust the path manually'
      new CopyPlugin({
         patterns: [
            { from: './src/img', to: 'img' },
            { from: './src/fonts', to: 'fonts' },
         ],
      }),
      //@ts-ignore
      new ImageminPlugin({
         disable: mode !== 'production', // Disable during development
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         pngquant: {
            quality: '20-100',
         },
      }),
      new MiniCssExtractPlugin({
         filename: 'css/[name].css',
      }),
      //Index.html
      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html',
         chunks: ['main'],
      }),
      //Other *.html. Chunks[] include Main as default, pass false to disable.
      ...setMultiHtmlPages(config.htmlPageNames),

      new FaviconsWebpackPlugin({
         logo: 'src/img/logo.svg',
         prefix: 'img/favicons/',
      }),
   ],

   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      hot: true,
   },
   devtool: 'source-map',
}

export default webpackConfiguration
