const Grid = require('./ui/grid')
const Numbers=require('./ui/number-board')

$(function () {
  var grid = new Grid($("#container"))
  grid.build();
  grid.layout();
  console.log($('#operation-board div'))
  var [$goBack, $goForward, $rebuild, $pause, $del, $submit] = $('#operation-board div')
  // 返回,前进,重置,暂停,删除,提交
  //$goBack.click(function(){})
  $('#goBack').on('click', (e) => {
    grid.goBack()
  })
  $('#goForward').on('click', (e) => {
    grid.goForward()
  })
  $('#rebuild').on('click', (e) => {
    grid.rebuild()
  })
  /*   $($rebuild.on('click', e => {
      console.log($('#reset'))
      grid.build()
      grid.layout();
    }) 为什么不行？？？*/
  $('#pause').on('click', (e) => {
    grid.pause()
  })
  $('#del').on('click', (e) => {
    grid.del()
  })
  $('#submit').on('click', (e) => {
    grid.submit()
  })

  new Numbers($("#number-board"),grid)


})