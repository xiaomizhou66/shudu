//生成九宫格
//const Toolkit = require('../core/toolkit') // commonJS 模块导入方法
//const Generator = require('../core/generator')
const Shudu = require('../core/shudu')
const Checker = require('../core/checker')

class Grid {
  // 这个类 需要传入一个 $('') 选择器,$("#container") 为 Jquery 对象
  constructor(container) {
    this._$container = container //  container  为 Jquery 对象
    this._$container.on('click', 'span', e => {
      // 选中九宫格格子
      this.$clickCell = $(e.target)
    })
    // 将 container 这个 Jquery 对象 赋值给 Grid 类的 _$container 属性
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
      if (cellValue) {
        return $("<span>") // 2 个 map 遍历，可以执行九宫格中所有的数组
          .addClass(colGroupClasses[colIndex % 3])
          .addClass('fixed')
          .text(cellValue); //<span>cellValue</span> 
        /* if (cellValue !== 0) { */
        //设置 text(str) 或返回 text() 所选元素的文本内容
      } else {
        return $("<span>") // 2 个 map 遍历，可以执行九宫格中所有的数组
          .addClass(colGroupClasses[colIndex % 3])
      }
      /* return $("<span>")
        .addClass(colGroupClasses[colIndex % 3])  */
      // cellValue 值为 0 的时候不放进 九宫格，也就是不显示在 界面中
      /* } */
    }));

    // 将每行数据加入 1  个 div 中，得到 9  个 div
    const $divArray = this.$cells.map(($spanArray, rowIndex) => {
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
    this._$container.empty(); // 清除原来的  dom，下面重新生成一个
    this.build();
    this.layout();
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
    // 对 this._$container 这个 jQuery 对象使用 .children()  方法 获取到 DOM 对象数组
    const dataArr = this._$container.children()
      .map((rowIndex, divDom) => { // 遍历 每个 div ，这里的 div 变量指的是 DOM 对象数组 元素 
        return $(divDom).children() // $(div) DOM 对象转为 jQuery 对象使用 .children()，获取 span DOM对象
          .map((colIndex, spanDom) => parseInt($(spanDom).text()) || 0); // 遍历 span 获取其内部的文本
      })
      .toArray().map($data => $data.toArray());
    //.toArray() 由jQuery 对象数组  转为为原生数组 JS 语言中的数组，这里是个二维数组，矩阵

    // 检查 用户输入的数据
    const checker = new Checker(dataArr);
    if (checker.check()) {
      return true;
    }
    // 检查不成功进行标记
    const marks = checker._matrixMarks
    this._$container.children()
      .each((rowIndex, divDom) => {
        $(divDom).children()
          .each((colIndex, spanDom) => {
            if ($(spanDom).hasClass('fixed')) {
              return // 如果这个 span 带有  .fixed 的 class 类，就是游戏数据，不需要标记
            }
            if (!marks[rowIndex][colIndex]) {
              $(spanDom).addClass('error') // 给错误的地方，加一个 error 的 class 类，以突显错误
              //$(span)  与 $span ???
            } else {
              $(spanDom).removeClass("error");
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