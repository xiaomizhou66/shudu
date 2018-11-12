const Grid = require('./ui/grid')
const Numbers = require('./ui/number')
const Operations = require('./ui/operation')

$(() => {
  let level = 0
  $('.main .level').on('click', 'div', e => {
    const $div = $(e.target)
    level = $div.children('span').text()
    let url = './pages/home.html?level=' + level;
    window.location.href = url; // 点击之后跳转页面
  })
})

$(function () {
  let level = getLevel('level');
  $('.home .level').text('关卡 ' + level)
  var grid = new Grid($("#container"))
  grid.build(level);
  grid.layout();
  let numbers = new Numbers($("#number-board"), grid)
  new Operations($("#operation-board"), grid, numbers)
  $('.goBack').click(() => {
    window.location.href ='../index.html'
  })

  function getLevel(level) {
    // 传值学习链接 https://blog.csdn.net/championSuiyang/article/details/77879652     
    //url = './pages/home.index?level=' + level; 
    let str = window.location.search; // 获取到 url 中 ?level=' + level  部分
    let index = str.indexOf('='); //返回参数值
    return str.slice(index + 1)
    // 在这里 level，没有用到，因为我们只传了一个 参数，
    // 如果是多个参数需要使用到 level 等参数与 正则匹配查找。
  }
})