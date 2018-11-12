//生成数独解决方案：洗牌算法
const Toolkit = require('./toolkit')

class Generator {
  constructor() {
    this.matrix = null
    this.orders = null
  }
  matrix() {
    return this.matrix
  }
  generate() {
    while (!this.internalGenerate()) {
      // 不停的生成直到正确
    }
  }
  // 将数据 0~9 填入九宫格
  internalGenerate() {
    // 获取一个随机序列的矩阵
    // 现在生成的 九宫格数据全都是 0
    this.matrix = Toolkit.matrix.makeMatrix(0);

    this.orders = Toolkit.matrix.makeMatrix(0)
      .map(rowArr => rowArr.map((cellValue, i) => i))
      .map(rowArr => Toolkit.matrix.shuffle(rowArr));
    // shuffle(arr) 对传入的数组打乱顺序，返回新数组
    for (let n = 1; n <= 9; n++) {
      // 将数组 1-9 传入每行
      if (!this.fillNumber(n)) {
        return false
      }
    }
    return true
  }

  fillNumber(n) {
    return this.fillRow(n, 0) // 从第 0  行开始填入 n
  }

  fillRow(n, rowIndex) {
    // 递归函数出口
    if (rowIndex > 8) {
      return true
    }
    const rowData = this.matrix[rowIndex]
    const orders = this.orders[rowIndex]
    //随机选择列
    let len = orders.length
    for (let i = 0; i < len; i++) {
      const colIndex = orders[i]
      // 如果这个位置已经有值，跳过
      if (rowData[colIndex]) {
        continue
      }
      // 检查这个位置是否可以填 n
      if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue
      }
      rowData[colIndex] = n
      // 当前 n 填写成功，递归调用 fillRow() 来在下一行中填写 n
      // 例如 当前 n=1 ，要在每行 填入 一个 1
      // 当前      n=2 ，要在每行 填入 一个 2......填入 1~9
      // 去下一行填写 n，如果没有填写进去，就继续寻找当前行下一个位置
      if (!this.fillRow(n, rowIndex + 1)) {
        rowData[colIndex] = 0
        continue
      }
      return true
    }
    return false
  }
}

// 没写一段代码都要去检查，检查成功之后，把检查的代码删除
/* const generator = new Generator()
generator.generate()
console.log(generator.matrix)  */

// ①将数字 1~9 依次填入每行（0~8 行）
// ②随机选列 检查是否可以填入
// ③如果所有列都不可以填入，要返回上一行 ②随机选.......，（形成一个递归过程）

module.exports = Generator;

// 现在生成的是错误的，每宫的数据有重复的