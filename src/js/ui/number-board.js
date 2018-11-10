// 选择数字填写处理：九宫格中数字的填写

class Numbers {
  // 构造函数 传入参数： 从 数字面板获取到的 divDom，与 九宫格 grid
  // new Numbers($("#number-board"),grid)
  constructor($obj, grid) {
    this._$obj = $obj
    this._grid = grid
    this._$obj.on('click', 'div', e => {
      const $div = $(e.target) // 点击的数字
      // 1~9 回填数字
      const n = $div.text() // 获取 数字面板的数字
      this.fillNumber(n) // 将点击的 div 中的内容添加到 九宫格的格子中
    })
  }

  // 将获取到的数字 填入九宫格
  fillNumber(n) {
    // this._grid.$clickCell  传进来的网格中的  $clickCell 属性，也就是选中的 格子
    this._grid.$clickCell.text(n);
  }
}

module.exports = Numbers