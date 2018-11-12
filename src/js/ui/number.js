// 选择数字填写处理：九宫格中数字的填写

class Numbers {
  // new Numbers($("#number-board"),grid)
  // 参数为 （获取的 Jquery 对象：数字操作面板） 与 （一个九宫格实例）
  constructor($obj, grid) {
    this._$obj = $obj
    this._grid = grid
    this._$clickDiv = null
    this._$obj.on('click', 'div', e => {
      if (this._$clickDiv) {
        this._$clickDiv.removeClass('clickNumber')
        // 将上一个点击的数字 clickNumber 样式删除
      }
      this._$clickDiv = $(e.target) // 点击的数字
      // 1~9 回填数字
      this._$clickDiv.addClass('clickNumber')
      const n = this._$clickDiv.text() // 获取 数字面板的数字
      this.fillNumber(n) // 将点击的 div 中的内容添加到 九宫格的格子中
    })
  }

  // 将获取到的数字 填入九宫格
  /*   fillNumber(n) {
      // this._grid.$clickCell  传进来的网格中的  $clickCell 属性，也就是选中的 格子   
      if (this._grid.$clickCell) {
        this._grid.$clickCell.text(n); 不要直接访问别人的属性，如果其他文件的属性改变了，这里代码将会出错。
        // 不符合 面向对象 封装的思想
        // 面向对象的思想：封装，继承，多态
      }
    } 
    */
  fillNumber(n) {
    // 调用  this._grid 实例的  fillNumberToClickCell() 方法 
    if (this._grid.getStatus() === 1) {
      this._grid.fillNumberToClickCell(n)
    }
  }
  disableFillNumber() {
    this._$obj.children().addClass('disableFillNumber')
  }
  ableFillNumber() {
    this._$obj.children().removeClass('disableFillNumber')
  }
}

module.exports = Numbers