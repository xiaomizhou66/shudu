// 检查数独解决方案：检查洗牌算法

// 对用户输入的数据进行检查
// 对每行的数据进行排序之后转化为字符串==='123456789' 那么就是 ok 的。

// 这里我们不只是这么简答，当用户输入数据错误的时候我们还需要提示。
// 检查-生成标记（数据为 0 ：没有填写，行列 数字重复） T：成功， F：false

const Toolkit = require('./toolkit')
const Generator = require('./generator')

// 检查的数组数据
function checkArray(arr) {
  const len = arr.length // length 单词不要错误！！！
  const marks = new Array(len)
  marks.fill(true)
  for (let i = 0; i < len; i++) {
    const v = arr[i]
    // 如果 marks[i] 为 false 就是已经检查过了的
    if (!marks[i]) {
      continue;
    }
    // 数据 为 0 无效。
    if (!v) {
      marks[i] = false // 话说等于 0 的空格我们可以看到的把？
      continue;
    }
    // 数据重复 ： i+1~9 之前是否有与 i 位置 重复的数据
    for (let j = i + 1; j < len; j++) {
      if (v === arr[j]) {
        marks[i] = marks[j] = false
      }
    }
  }
  return marks
}

//  没写一个文件都单独的检查一下是否有错误，避免在其他文件调用的时候不知道自己是错在哪里的
/* console.log(checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(checkArray([0, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(checkArray([1, 1, 3, 4, 5, 6, 7, 8, 9]))
console.log(checkArray([1, 4, 3, 4, 0, 6, 7, 8, 9])) */
/*λ node checker.js
[ true, true, true, true, true, true, true, true, true ]
[ false, true, true, true, true, true, true, true, true ]
[ false, false, true, true, true, true, true, true, true ]
[ true, false, true, false, false, true, true, true, true ]*/


// 输入：matrix，用户完成的数独数据 9x9
// 处理：对 matrix 行，列，宫，进行检查，并填写 marks 数组
// 输出：检查是否成功 && marks 数组

class Checker {
  constructor(matrix) {
    this._matrix = matrix
    // 为什么要写成下划线
    //代码规范中的一种写法（约定），多是局部变量以下划线开头，就跟方法名开头字母一般大写一样。
    // 内部的私有变量  一半就在前面加个 _，一般外部  公共访问的变量 的名称  大家不会在前面 加_
    this._matrixMarks = Toolkit.matrix.makeMatrix(true)
  }

  // get 与其他的方法有是不一样？？？,这些是属性？其他的是方法？
  // 在 Class 内部可以使用get和set关键字， 对某个属性设置存值函数和取值函数， 拦截该属性的存取行为。
  getmatrixMarks() {
    return this._matrixMarks;
  }

  get isSuccess() {
    return this._success;
  }

  check() {
    this.checkRow() // 检查行
    this.checkCol() // 检查列
    this.checkBoxes() // 检查宫

    // every() 遍历，所有都返回 true 才为 true ，否则为 false 
    this._success = this._matrixMarks.every(rowData => rowData.every(mark => mark))
    return this._success
  }

  checkRow() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const rowData = this._matrix[rowIndex] // 获取每行数组
      const marks = checkArray(rowData) // 对每行进行检查
      let len = marks.length
      for (let colIndex = 0; colIndex < len; colIndex++) {
        if (!marks[colIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkCol() {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      const cols = []
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex]
      }
      const marks = checkArray(cols)
      let len = marks.length
      for (let rowIndex = 0; rowIndex < len; rowIndex++) {
        if (!marks[rowIndex]) {
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex)
      const marks = checkArray(boxes)
      //let len = marks.length
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const {
            rowIndex,
            colIndex
          } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex)
          this._matrixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }
}

const gen = new Generator()
console.log(gen._matrixMarks) // undefind
gen.generate()
const matrix = gen.matrix;

const checker = new Checker(matrix)
console.log('checker result: ' + checker.check()) // boolen
console.log(checker.matrixMarks) //

/* matrix[1][1] = 0;
matrix[2][3] = matrix[3][5] = 5
const checker2 = new Checker(matrix)
console.log('checker result: ' + checker2.check())
console.log(checker2.matrixMarks) */

module.exports = Checker