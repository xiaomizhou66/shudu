//生成数独游戏迷盘

// 1. 生成完成的解决方案：Gnerator
// 2. 随去除部分数据：按比例


const Generator = require('./generator')

class Shudu {
  constructor() {
    // 生成完整的数独解决方案
    const generator = new Generator()
    generator.generate()
    this.solutionMatrix = generator.matrix
  }
  make(level = 5) {
    // 随去除部分数据：按比例
    // this.puzzleMatrix   这样写就是给 这个 Shudu 类添加了一个 puzzleMatrix 属性
    this.puzzleMatrix = this.solutionMatrix.map(rowData => {
      return rowData.map(cellValue => Math.random() * 9 < level ? 0 : cellValue)
    })
  }
}

module.exports = Shudu