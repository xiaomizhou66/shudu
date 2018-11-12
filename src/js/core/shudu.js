//生成数独游戏迷盘

// 1. 生成完成的解决方案：Gnerator
// 2. 随去除部分数据：按比例


const Generator = require('./generator')

class Shudu {
  constructor() {
    // 生成完整的数独解决方案
    const generator = new Generator()
    generator.generate()
    this.puzzleMatrix = generator.matrix
  }
  make(level) {
    // 随去除部分数据：按比例
    // puzzle  谜题
    // this.puzzleMatrix   这样写就是给 这个 Shudu 类添加了一个 puzzleMatrix 属性
    /*  this.puzzleMatrix = this.solutionMatrix.map(rowData => {
       //return rowData.map(cellValue => Math.random() * 60 < level ? 0 : cellValue) 这样不对
       return rowData.map(cellValue => {

       })
     }) */
    if (level < 10) {
      this.makeEmpty(20)
    } else if (level < 20) {
      this.makeEmpty(25)
    } else if (level < 30) {
      this.makeEmpty(30)
    } else if (level < 40) {
      this.makeEmpty(35)
    } else if (level < 50) {
      this.makeEmpty(40)
    } else if (level < 60) {
      this.makeEmpty(45)
    } else if (level < 70) {
      this.makeEmpty(50)
    }
  }
  makeEmpty(n) {
    let i = 1;
    while (i < n) {
      let rowIndex = Math.floor(Math.random() * 9)
      let colIndex = Math.floor(Math.random() * 9)
      // 当它已经被删除了，我们需要不能再次将它删除，要挑选其他位置进行删除
      while (this.puzzleMatrix[rowIndex][colIndex] == 0) {
        rowIndex = Math.floor(Math.random() * 9)
        colIndex = Math.floor(Math.random() * 9)
      }
      this.puzzleMatrix[rowIndex][colIndex] = 0
      i++
    }
  }
}

module.exports = Shudu