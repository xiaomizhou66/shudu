// 选择操作填写处理：九宫格的操作，返回，前进，删除，重玩，提交检查，暂停，开始，等等


class Operations {
  // 参数为 （获取的 Jquery 对象：操作面板） 与 （一个九宫格实例）
  constructor($operationDiv, grid, numbers) {
    this._$operationDiv = $operationDiv
    this._grid = grid
    this.numbers = numbers //数字面板 index.js 中创建的 Numbers 类的一个 实例
    this._$clickDiv = null
    this._$operationDiv.on('click', 'div', e => {
      if (this._$clickDiv) {
        this._$clickDiv.removeClass('clickOperation')
      }
      this._$clickDiv = $(e.target)
      this._$clickDiv.addClass('clickOperation')
      this.clickOperation()
    })
  }
  clickOperation() {
    let clickID = this._$clickDiv.attr("id")
    //let buttonIDs = ['#goBack', '#goForward', '#rebuild', '#del', '#submit']
    switch (clickID) {
      case 'goBack':
        this._grid.goBack();
        break;
      case 'goForward':
        this._grid.goForward();
        break;
      case 'rebuild':
        this._grid.rebuild();
        break;
      case 'pause':
        let status = this._grid.getStatus(); // 获取 status 状态， 1 为计时，0 为暂停
        if (status === 1) {
          // 如果为 计时状态,那么现在按钮应该是 显示暂停，可以让我们 开始计时
          this._grid.pause()
          this._$clickDiv.text('开始')
          /*  for (let value of buttonIDs) {
             $(value).addClass('disableOperation')
           } */
          this._$operationDiv.children().not($('#pause')).addClass('disableOperation')
          this.numbers.disableFillNumber()
        } else {
          this._grid.start()
          this._$clickDiv.text('暂停')
          /*  for (let value of buttonIDs) {
             $(value).removeClass('disableOperation')
           } */
          this._$operationDiv.children().removeClass('disableOperation')
          this.numbers.ableFillNumber()

        }
        break;
      case 'del':
        this._grid.del();
        break;
      case 'submit':
        this._grid.submit();
        break;
    }
  }
}

module.exports = Operations