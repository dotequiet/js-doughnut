const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config'); // 多页面的配置项
const env = process.env.BUILD_MODE.trim();
let HTMLPlugins = [];
let Entries = {};

config.HTMLDirs.forEach(item => {
  let filename = ''
  let chunks = []
  if (env === 'dev') {
    filename = `${item.page}.html`;
    if (item.dir) filename = `${item.dir}/${item.page}.html`;
  } else {
    filename = `../view/${item.page}.html`;
    if (item.dir) filename = `../view/${item.dir}/${item.page}.html`;
  }
  chunks = !!item.dir ? [`${item.dir}/index`, 'vendor'] : [item.page, 'vendor']
  const htmlPlugin = new HTMLWebpackPlugin({
    title: item.title, // 生成的html页面的标题
    filename: filename, // 生成到dist目录下的html文件名称，支持多级目录（eg: `${item.page}/index.html`）
    template: !!item.dir ? path.resolve(__dirname, `../src/pages/${item.dir}/index.html`) : path.resolve(__dirname, `../src/pages/${item.page}/index.html`), // 模板文件，不同入口可以根据需要设置不同模板
    chunks: chunks, // html文件中需要要引入的js模块，这里的 vendor 是webpack默认配置下抽离的公共模块的名称
  });
  HTMLPlugins.push(htmlPlugin);
  if (item.dir) {
    Entries[`${item.dir}/${item.page}`] = path.resolve(__dirname, `../src/pages/${item.dir}/index.js`) // 根据配置设置入口js文件
  } else {
    Entries[`${item.page}`] = path.resolve(__dirname, `../src/pages/${item.page}/index.js`) // 根据配置设置入口js文件
  }
});
let ASSET_PATH = '/'; // dev 环境
if (env === 'prod') ASSET_PATH = '/static/'; // build 时设置成实际使用的静态服务地址

module.exports = {
  devtool: 'source-map',
  entry: Entries,
  output: {
    publicPath: ASSET_PATH,
    filename: 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        // 这条规则应用到 JavaScript 内的 pug 导入
        {
          use: ['raw-loader', 'pug-plain-loader']
        }
      ]
    }, {
      test: /\.vue$/, // 处理vue模块
      use: [{
        loader: 'vue-loader',
        options: {}
      }, {
        loader: 'iview-loader',
        options: {
          prefix: false
        }
      }],
    }, {
      test: /\.js$/, //处理es6语法
      exclude: /node_modules/,
      use: ['babel-loader'],
    }]
  },
  resolve: { // 设置模块如何被解析
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@commons': path.resolve(__dirname, '../src/commons'),
      '@mixins': path.resolve(__dirname, '../src/mixins'),
      '@api': path.resolve(__dirname, '../src/api'),
      '@vuex': path.resolve(__dirname, '../src/store'),
      'vue': 'vue/dist/vue.js',
    },
    extensions:['*','.css','.js','.vue', '.less']
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../dist'),
        ignore: ['*.html']
      },
      {
        from: path.resolve(__dirname, '../src/scripts/lib'),
        to: path.resolve(__dirname, '../dist')
      }
    ]),
    ...HTMLPlugins, // 利用 HTMLWebpackPlugin 插件合成最终页面
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH) // 利用 process.env.ASSET_PATH 保证模板文件中引用正确的静态资源地址
    })
  ]
};
