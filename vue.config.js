
const path = require('path') // 引入path模块（node）
const resolve = dir => path.join(__dirname, dir) // 将文件组成绝对路径
const CompressionPlugin = require('compression-webpack-plugin') // gzip
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const pxtoviewport = require('postcss-px-to-viewport');

module.exports = {
  // 部署应用包时的基本 URL，管网介绍使用相对路径会有限制，推荐生产使用绝对路径
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  //   当运行 vue-cli-service build 时生成的生产环境构建文件的目录,可以不配置
  outputDir: 'dist',
  //   放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录,推荐配置，并使用static(静态)
  assetsDir: 'static',
  // eslint-loader 是否在保存的时候检查代码，推荐打开
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾
  productionSourceMap: true,
  // webpack-dev-server 相关配置
  devServer: {
    // 设置代理
    // hot: true, //热加载
    host: '0.0.0.0', // ip地址
    port: 8080, // 端口
    https: false, // false关闭https，true为开启
    open: true, // 自动打开浏览器
    proxy: 'http://major.leonp.club:8181'   // 只有一个代理地址
    // proxy: {
    //   '/api': {
    //     changeOrigin: true,
    //     target:'http://major.leonp.club:8181',
    //     pathRewrite: {
    //       '^/api': '/api'
    //     }
    //   }
    // }
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias.set('@', resolve('src'))
    //   .set('assets', resolve('src/assets'))
    //   .set('components', resolve('src/components'))
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          }),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  }
}

