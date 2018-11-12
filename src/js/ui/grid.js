//生成九宫格
//const Toolkit = require('../core/toolkit') // commonJS 模块导入方法
//const Generator = require('../core/generator')
const Shudu = require('../core/shudu')
const Checker = require('../core/checker')

class Grid {
  // 这个类 需要传入一个 $('') 选择器,$("#container") 为 Jquery 对象
  constructor(container) {
    this.useTime = 0
    this.timeId = ''
    this.status = 1 // 计时暂停与开始 1 为 开始， 0 为暂停
    // 用数字作为状态，可以表示很多种状态，其他需要可能会出现多状态的情况。
    //不要用 布尔值，用数值好。思维。
    this._$container = container //  container  为 Jquery 对象
    this.$clickCell = null; // 给 Grid 类一个当前所在 格子 Jquery 对象 属性保存
    this.cellBackArr = []; //用户填入数据的数组，为了做回退功能
    this.cellForwardArr = []; //用户填入数据的数组，为了做回退功能
    this._$container.on('click', 'span:not(.fixed)', e => {
      // 选中九宫格格子
      if (this.$clickCell) {
        this.$clickCell.removeClass('clickCell')
        // 当点击下一个格子时，将上一个格子的 clickCell 样式删除
      }
      this.$clickCell = $(e.target)
      this.$clickCell.addClass('clickCell')
    })
    // 将 container 这个 Jquery 对象 赋值给 Grid 类的 _$container 属性
  }
  /* map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
    map() 方法按照原始数组元素顺序依次处理元素。注意： map() 不会对空数组进行检测。map() 不会改变原始数组。 */
  build(level) {
    // ①const matrix=Toolkit.matrix.makeMatrix(0) // 调用矩阵，创建一个元素都是 0 的二维数组
    /* ②const g = new Generator()
    g.generate()
    const matrix = g.matrix   // 生成了 1~9 的二维矩阵 并且随机的 去掉一些数据 */
    // ③ 通过 shudu.js 来去掉一些数据
    const shudu = new Shudu()
    shudu.make(level)
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
    this.startTimedCount()
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

  timedCount() {
    this.useTime += 1
    let m = Math.floor(this.useTime / 60)
    m = (m < 10) ? '0' + m : m
    //m = (m < 10) ? '0' + m : '' + m  可以不用改写为 字符串 ，ES6 字符串模板
    // 因为字符串模本 用时 ${m}:${s}` ，会将 ${} 内部的变量值改写为字符串
    let s = this.useTime % 60
    s = (s < 10) ? '0' + s : s
    $('.time').text(`用时 ${m}:${s}`);
  }
  startTimedCount() {
    this.timeId = setInterval(() => {
      this.timedCount()
    }, 1000)
  }
  // 用户玩游戏，数字填入九宫格
  fillNumberToClickCell(n) {
    if (this.$clickCell) {
      this.$clickCell.text(n)
      this.cellBackArr.push({
        'cell': this.$clickCell,
        'value': n
      })
    }
    this.cellForwardArr = [] // 用户在填写数据的过程中 前进功能应该是无效的
    // 前进是在 返回之后使用的前进，有了返回才有前进
  }
  //返回
  goBack() {
    if (this.status === 1) {
      let cellBack = this.cellBackArr.pop() // 需要置空的格子
      if (cellBack) {
        let cellForwardObj = {
          'cell': cellBack.cell,
          'value': cellBack.cell.text()
        }
        cellBack.cell.text("").removeClass('clickCell')
        this.cellForwardArr.push(cellForwardObj)
      }
      let len = this.cellBackArr.length
      if (len) {
        this.$clickCell = this.cellBackArr[len - 1].cell
        this.$clickCell.addClass('clickCell')
      }
    }
  }
  //前进
  goForward() {
    if (this.status === 1) {
      let cellForward = this.cellForwardArr.pop()
      if (cellForward) {
        this.$clickCell.removeClass('clickCell')
        this.$clickCell = cellForward.cell
        this.$clickCell.addClass('clickCell').text(cellForward.value)
        this.cellBackArr.push(cellForward)
      }
    }
  }
  //重置
  rebuild(level) {
    if (this.status === 1) {
      window.clearInterval(this.timeId) // 将之前的间隔任务清除
      this.useTime = 0
      this._$container.empty(); // 清除原来的  dom，下面重新生成一个
      this.build(level); // 重新 build 会充电创建一个  间隔任务
      this.layout();
    }
  }
  //暂停
  pause() {
    if (this.status === 1) {
      // 如果为 计时状态
      window.clearInterval(this.timeId) // 停止计时
      this.status = 0 // 改为暂停状态 0 
      this._$container.addClass('disableDiv')
    }
  }
  //开始
  start() {
    if (this.status === 0) {
      this.startTimedCount()
      this.status = 1 // 改为计时状态
      this._$container.removeClass('disableDiv')
    }
  }
  // 删除指定格子
  del() {
    if (this.status === 1) {
      if (this.$clickCell) {
        this.$clickCell.text("")
      }
      // 因为 给 Grid 类这个数据结构，赋予了一个 $clickCell 属性，也就是当前操作的格子
      // 很简单的就删除了需要删除的数据了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // 是空字符串，不是 0 ，
    }
  }
  //提交检查：成功显示通关，失败提示错误位置
  submit() {
    //获取用户填入的数据
    // 对 this._$container 这个 jQuery 对象使用 .children()  方法 获取到 DOM 对象数组
    if (this.status === 1) {
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
  getStatus() {
    return this.status
  }
}

// 要在文档加载完全之后执行 window.onload =函数
/* $(document).ready(function () {
  const gird=new Gird($("#container"))
  gird.build(level);
  gird.layout();
}); */

module.exports = Grid;