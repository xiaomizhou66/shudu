//生成九宫格
//const Toolkit = require('../core/toolkit') // commonJS 模块导入方法
//const Generator = require('../core/generator')
const Shudu = require('../core/shudu')
const Checker = require('../core/checker')

class Grid {
  // 这个类 需要传入一个 $('') 选择器
  constructor(container) {
    this._$container = container //  container  为 Dom
    // ？？？多此一举啊，干嘛要把传捡来的参数再定义一次？？？？为了保存？？
  }
  /* map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
    map() 方法按照原始数组元素顺序依次处理元素。注意： map() 不会对空数组进行检测。map() 不会改变原始数组。 */
  build() {
    // ①const matrix=Toolkit.matrix.makeMatrix(0) // 调用矩阵，创建一个元素都是 0 的二维数组
    /* ②const g = new Generator()
    g.generate()
    const matrix = g.matrix   // 生成了 1~9 的二维矩阵 并且随机的 去掉一些数据 */
    // ③ 通过 shudu.js 来去掉一些数据
    const shudu = new Shudu()
    shudu.make()
    const matrix = shudu.puzzleMatrix // 等于 shudu 类中的 puzzleMatrix 属性
    
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    // 定义行样式，使用解构赋值，需要操作的是 row_g_bottom
    const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right']
    // 定义列样式，使用解构赋值，需要操作的是 col_g_right
    //matrix.map(RowArray => $div); // 二维数组的 元素 也就是 一维数组/每行数据 映射为 div
    //RowArray.map(cellValue =>)     // 一维数组/每行数据 映射为 <span>cellValue</span>

    // 将所有的数据都加入到 span  中
    this.$cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
        /* if (cellValue !== 0) { */
        return $("<span>") // 2 个 map 遍历，可以执行九宫格中所有的数组
          .addClass(colGroupClasses[colIndex % 3])
          //addClass() - 向被选元素添加一个或多个类 (每宫右边的外框加粗线) 
          .addClass(cellValue ? 'fixed' : 'empty')
          // 给九宫格题目 生成的数字灰色的背景,数字为 0 时，颜色为 白色，就不用 if 来判断 0 了
          .text(cellValue); //<span>cellValue</span> 
        //设置 text(str) 或返回 text() 所选元素的文本内容
      }
      /* return $("<span>")
        .addClass(colGroupClasses[colIndex % 3])  */
      // cellValue 值为 0 的时候不放进 九宫格，也就是不显示在 界面中
      /* } */
    ));

    // 将每行数据加入 1  个 div 中，得到 9  个 div
    const $divArray = $cells.map(($spanArray, rowIndex) => {
      // 1 个 map 遍历，每次处理 1 行
      return $("<div>")
        .addClass('row')
        .addClass(rowGroupClasses[rowIndex % 3]) //(每宫底边的外框加粗线)
        .append($spanArray);
      // append() 在被选元素的结尾插入内容  
      // http://www.runoob.com/jquery/jquery-dom-add.html
    })

    // 将 9 个 div 加入到 this._$container 中：在这个 index.html 也就是 $(#container) 中
    this._$container.append($divArray);
  }
  // 给 Gird 类添加一个布局方法
  layout() {
    const width = $('span:first', this._$container).width() // $ 里面传 2 个参数？？？
    $('span', this._$container)
      .height(width) // 是的高度等于宽度
      .css({
        'line-height': `${width}px`, // ES6 字符串模本语法
        'font-size': width < 32 ? `${width/2}px` : ''
      })
  }
  //返回
  goBack() {

  }
  //前进
  goForward() {

  }
  //重置
  rebuild() {
    this._$container.empty() // 清除原来的  dom，下面重新生成一个
    this.build()
    this.layout()
  }
  //暂停
  pause() {

  }
  // 删除指定格子
  del() {

  }
  //提交检查：成功显示通关，失败提示错误位置
  submit() {
    //获取用户填入的数据
    const data = this._$container.children() // 获取到每行 也就是 div
      .map((rowIndex, div) => { // 遍历 每个 div 
        return $(div).children() // 获取到每个 span
          .map((colIndex, span) => parseInt($(span).text()) || 0) // 遍历 span 获取其内部的文本
      })
      .toArray() // 转为为原生数组
      .map($data => $data.toArray())
    const checker = new Checker(data)
    if (checker.check()) {
      return true
    }
    // 检查不成功进行标记
    const marks = checker._matrixMarks
    this._$container.children()
      .each((rowIndex, div) => {
        $(div).children()
          .each((colIndex, span) => {
            if ($span.hasClass('fixed')) {
              return // 如果这个 span 带有  .fixed 的 class 类，就是游戏数据，不需要标记
            }
            if (!marks[rowIndex][colIndex]) {
              $(span).addClass('error') // 给错误的地方，加一个 error 的 class 类，以突显错误
              //$(span)  与 $span ???
            } else {
              $span.removeClass("error");
            }
          })
      })
  }
}

// 要在文档加载完全之后执行 window.onload =函数
/* $(document).ready(function () {
  const gird=new Gird($("#container"))
  gird.build();
  gird.layout();
}); */

module.exports = Grid;