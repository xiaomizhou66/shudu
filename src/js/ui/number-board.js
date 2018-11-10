// 选择数字填写处理：九宫格中数字的填写

/* class Numbers {
  constructor(dom) {
    this._$dom = dom
    this._$dom.on('click', 'span', e => {
      const $cell = this._$targetCell // 点击的的九宫格 格子
      const $div = (e.target) // 点击的数字
      // 1~9 回填数字
      this.setTargetValue($cell.text());
      //$cell.text($div.text()) // 将点击的 div 中的内容添加到 九宫格的格子中
    })
  }
  setTargetValue(value) {
    this._$targetDiv
      .text(value)
  }
  // 
  clickNumber(dom) {
    this._$targetDiv = dom
  }
}

module.exports = Numbers */