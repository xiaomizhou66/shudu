var webpack = require('webpack');

// 导出对象
module.exports = {
  //入口文件，现在 src/js 文件夹下创建一个 index.js 文件
  mode: 'development',
  entry: {
    index: './js/index'
  },
  // 出口文件,输出在 gulpfile 已经指定了，这里就只需要写 文件名就好
  output: {
    filename: '[name].js' // [name].js 这样是什么意思啊？？？？
  },
  //细粒度的配置，source map 格式来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。
  devtool: 'source-map',
  resolve: { // 解决的问题
    extensions: ['.js'] // extensions 扩展 ！！！！！！
  },
  module: {
    rules: [{
      test: /\.js$/, // 处理的是 js 文件
      exclude: /node_modules/, //排除依赖包文件夹    
      use: [{
        loader: 'babel-loader', // 使用的是 babel-loader 工具
        // loader:用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。
        //        因此，loader 类似于其他构建工具中“任务(task)”
        options: {
          //当前 loader 需要的特殊配置：webpack 2.5 之前为 query，之后为 options
          // 预置 es2015
          presets: ['es2015'] ////按照最新的 ES6 语法规则去转换
        }
      }]
    }]
  },
  externals: { 
    //外部扩展，提供了「不从bundle 中引用依赖」的方式，也就是说，自己的库本身不打包这个lodash，需要用户环境提供。
    // 我们想引用一个库，但是又不想让 webpack 打包 （如果把这个 lodash 打入进去，打包文件就会非常大，影响我们的打包速度）
    // 总得来说，externals 配置就是为了使 import _ from 'lodash' 这句代码，在本身不引入 lodash 的情况下，能够在各个环境都能解释执行。
    "jquery": "jQuery"
  },
  plugins: [ // ProvidePlugin 允许代码中直接使用定义的属性，而不需要 require()
    // 比如下面的定义可以直接使用 $，而不再需要 const $ = require("jquery");
    // 这里使用到 webpack 需要在文件开头引入 var webpack = require('webpack');
    // 否则会报错  ReferenceError: webpack is not defined
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}