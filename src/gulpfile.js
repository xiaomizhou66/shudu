const gulp = require('gulp') //引入 gulp

//定义 webpack 任务：转译 JavaScript 
gulp.task('webpack', () => {
  const webpack = require('webpack-stream') // 引入 webpack-stream
  const config = require('./webpack.config.js') // 引入 webpack 的配置文件
  gulp.src('./js/**/*.js') // 源码中的所有 js 文件
    .pipe(webpack(config))
    .pipe(gulp.dest('../www/js')) //转译到 www 文件夹下的 js 文件
})

//定义 less 任务：转译 less => css
gulp.task('less', () => {
  const less = require('gulp-less')
  gulp.src('./less/*.less') // 源码中的所有 less 文件
    .pipe(less())
    .pipe(gulp.dest('../www/css')) //转译到 www 文件夹下的 css 文件
})

// 定义默认任务，直接依赖与上面定义的 'webpack' 与 'less'  任务
gulp.task('default', ['webpack', 'less'])

// 定义 watch 任务，一旦 js /less 有改变，将自动编译，不需要每次都在命令行去 gulp 执行编译。
// 有了这个 watch 任务之后，在命令行执行 `gulp && gulp watch` 命令，然后再编辑过程中就不需要去动用命令行了，
// 会自动的编译，我们就只要关心 html ，src下的 js /less 编辑，以及浏览器 审查就好了。
gulp.task('watch', () => {
  gulp.watch('js/**/*.js', ['webpack'])  // 一旦 src 下的 所有 js 文件中有改变的就执行 webpack 任务
  gulp.watch('less/**/*.less', ['less']) // 一旦 src 下的  less 文件有所改变就执行  less  任务
}) 