/* 
 *矩阵和数组相关的工具集
 */
const matrixToolkit = {
  //生成一维数组,这里不能写默认参数
  makeRowArray(v) {
    const arr = new Array(9)
    arr.fill(v)
    return arr
  },
  //生成二维数组/矩阵
  makeMatrix(v) {
    return Array.from({
      length: 9
    }, () => this.makeRowArray(0)) // 在 ES6 的模块中不能使用this
  },
  /* 
   *对传入数组进行随机排序，然后返回新数组
   */
  shuffle(arr) {
    let n = arr.length - 1
    for (var i = n; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]]
    }
    return arr;
  },
  /* 
   * 检查指定位置是否可以填入 n
   */
  checkFillable(matrix, n, rowIndex, colIndex) {
    const rowData = matrix[rowIndex]
    const colData = this.makeRowArray().map((v, i) => matrix[i][colIndex])
    const {
      boxIndex
    } = boxToolkit.convertToBoxIndex(rowIndex, colIndex)
    const boxData = boxToolkit.getBoxCells(matrix, boxIndex)
    for (let i = 0; i < 9; i++) {
      if (rowData[i] === n || colData[i] === n || boxData[i] === n)
        return false
    }
    return true
  }
}

/* 
 *宫坐标工具集
 */
const boxToolkit = {
  getBoxCells(matrix, boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3
    const startColIndex = boxIndex % 3 * 3
    const result = []
    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3)
      const colIndex = startColIndex + cellIndex % 3
      result.push(matrix[rowIndex, colIndex])
    }
    return result
  },
  convertToBoxIndex(rowIndex, colIndex) {
    return {
      BoxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },
  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    }
  }
}




// toolkit : 工具包
module.exports = class Toolkit {
  /* 
   *矩阵和数组相关的工具集
   */
  static get matrix() {
    return matrixToolkit
  }
  /* 
   *宫坐标工具集
   */
  static get box() {
    return boxToolkit
  }
}