const gulp = require('gulp') //引入 gulp

//定义 webpack 任务：转译 JavaScript 
gulp.task('webpack', () => {
  const webpack = require('webpack-stream') // 引入 webpack-stream
  const config = require('./webpack.config.js') // 引入 webpack 的配置文件
  gulp.src('./src/js/**/*.js') // 源码中的所有 js 文件
    .pipe(webpack(config)) // 转译 过程
    .pipe(gulp.dest('./dist/js')) //转译到 www 文件夹下的 js 文件
})

//定义 less 任务：转译 less => css
gulp.task('less', () => {
  const less = require('gulp-less')
  gulp.src('./src/less/*.less') // 源码中的所有 less 文件
    // './src/less/*.less'   . 表示当前目录的意思，它 等价于 'src/less/*.less' 
    .pipe(less()) // 转译 过程
    .pipe(gulp.dest('./dist/css')) //转译到 www 文件夹下的 css 文件
})

// 定义任务 将 html 文件移动到另外一个位置：html 不需要编译
gulp.task('html', () => {
  /*要操作哪些文件 确定源文件地址*/
  gulp.src('index.html')
    .pipe(gulp.dest('./dist'))
});

// 定义默认任务，直接依赖与上面定义的 'webpack' 与 'less'  任务
gulp.task('default', ['webpack', 'less', 'html'])

// 定义 watch 任务，一旦 js /less 有改变，将自动编译，不需要每次都在命令行去 gulp 执行编译。
// 有了这个 watch 任务之后，在命令行执行 `gulp && gulp watch` 命令，然后再编辑过程中就不需要去动用命令行了，
// 会自动的编译，我们就只要关心 html ，src下的 js /less 编辑，以及浏览器 审查就好了。
gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', ['webpack']) // 一旦 src 下的 所有 js 文件中有改变的就执行 webpack 任务
  gulp.watch('src/less/**/*.less', ['less']) // 一旦 src 下的  less 文件有所改变就执行  less  任务
  gulp.watch('index.html', ['html']) // hmtl 文件有所改变就执行  html  任务
})