/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/core/checker.js":
/*!****************************!*\
  !*** ./js/core/checker.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 检查数独解决方案：检查洗牌算法

// 对用户输入的数据进行检查
// 对每行的数据进行排序之后转化为字符串==='123456789' 那么就是 ok 的。

// 这里我们不只是这么简答，当用户输入数据错误的时候我们还需要提示。
// 检查-生成标记（数据为 0 ：没有填写，行列 数字重复） T：成功， F：false

var Toolkit = __webpack_require__(/*! ./toolkit */ "./js/core/toolkit.js");
var Generator = __webpack_require__(/*! ./generator */ "./js/core/generator.js");

// 检查的数组数据
function checkArray(arr) {
  var len = arr.length; // length 单词不要错误！！！
  var marks = new Array(len);
  marks.fill(true);
  for (var i = 0; i < len; i++) {
    var v = arr[i];
    // 如果 marks[i] 为 false 就是已经检查过了的
    if (!marks[i]) {
      continue;
    }
    // 数据 为 0 无效。
    if (!v) {
      marks[i] = false; // 话说等于 0 的空格我们可以看到的把？
      continue;
    }
    // 数据重复 ： i+1~9 之前是否有与 i 位置 重复的数据
    for (var j = i + 1; j < len; j++) {
      if (v === arr[j]) {
        marks[i] = marks[j] = false;
      }
    }
  }
  return marks;
}

//  没写一个文件都单独的检查一下是否有错误，避免在其他文件调用的时候不知道自己是错在哪里的
/* console.log(checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(checkArray([0, 2, 3, 4, 5, 6, 7, 8, 9]))
console.log(checkArray([1, 1, 3, 4, 5, 6, 7, 8, 9]))
console.log(checkArray([1, 4, 3, 4, 0, 6, 7, 8, 9])) */
/*λ node checker.js
[ true, true, true, true, true, true, true, true, true ]
[ false, true, true, true, true, true, true, true, true ]
[ false, false, true, true, true, true, true, true, true ]
[ true, false, true, false, false, true, true, true, true ]*/

// 输入：matrix，用户完成的数独数据 9x9
// 处理：对 matrix 行，列，宫，进行检查，并填写 marks 数组
// 输出：检查是否成功 && marks 数组

var Checker = function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    // 为什么要写成下划线
    //代码规范中的一种写法（约定），多是局部变量以下划线开头，就跟方法名开头字母一般大写一样。
    // 内部的私有变量  一半就在前面加个 _，一般外部  公共访问的变量 的名称  大家不会在前面 加_
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  // get 与其他的方法有是不一样？？？,这些是属性？其他的是方法？
  // 在 Class 内部可以使用get和set关键字， 对某个属性设置存值函数和取值函数， 拦截该属性的存取行为。


  _createClass(Checker, [{
    key: 'getmatrixMarks',
    value: function getmatrixMarks() {
      return this._matrixMarks;
    }
  }, {
    key: 'check',
    value: function check() {
      this.checkRow(); // 检查行
      this.checkCol(); // 检查列
      this.checkBoxes(); // 检查宫

      // every() 遍历，所有都返回 true 才为 true ，否则为 false 
      this._success = this._matrixMarks.every(function (rowData) {
        return rowData.every(function (mark) {
          return mark;
        });
      });
      return this._success;
    }
  }, {
    key: 'checkRow',
    value: function checkRow() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var rowData = this._matrix[rowIndex]; // 获取每行数组
        var marks = checkArray(rowData); // 对每行进行检查
        var len = marks.length;
        for (var colIndex = 0; colIndex < len; colIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkCol',
    value: function checkCol() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var cols = [];
        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          cols[rowIndex] = this._matrix[rowIndex][colIndex];
        }
        var marks = checkArray(cols);
        var len = marks.length;
        for (var _rowIndex = 0; _rowIndex < len; _rowIndex++) {
          if (!marks[_rowIndex]) {
            this._matrixMarks[_rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'checkBoxes',
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(boxes);
        //let len = marks.length
        for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
          if (!marks[cellIndex]) {
            var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex),
                rowIndex = _Toolkit$box$convertF.rowIndex,
                colIndex = _Toolkit$box$convertF.colIndex;

            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: 'isSuccess',
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

var gen = new Generator();
console.log(gen._matrixMarks); // undefind
gen.generate();
var matrix = gen.matrix;

var checker = new Checker(matrix);
console.log('checker result: ' + checker.check()); // boolen
console.log(checker.matrixMarks); //

/* matrix[1][1] = 0;
matrix[2][3] = matrix[3][5] = 5
const checker2 = new Checker(matrix)
console.log('checker result: ' + checker2.check())
console.log(checker2.matrixMarks) */

module.exports = Checker;

/***/ }),

/***/ "./js/core/generator.js":
/*!******************************!*\
  !*** ./js/core/generator.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独解决方案：洗牌算法
var Toolkit = __webpack_require__(/*! ./toolkit */ "./js/core/toolkit.js");

var Generator = function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }
  //

  // 将数据 0~9 填入九宫格


  _createClass(Generator, [{
    key: 'generate',
    value: function generate() {
      this.matrix = Toolkit.matrix.makeMatrix(0); // 现在生成的 九宫格数据全都是 0

      // 获取一个随机序列的矩阵
      this.orders = Toolkit.matrix.makeMatrix(0) // 现在生成的 九宫格数据全都是 0
      .map(function (row) {
        return row.map(function (v, i) {
          return i;
        });
      }) // 将数组 1-9 传入每行
      .map(function (row) {
        return Toolkit.matrix.shuffle(row);
      }); // 对每行数据进行打乱

      //console.log(this.orders)

      for (var n = 1; n <= 9; n++) {
        this.fillNumber(n);
      }

      // 随机让一些数据为 0 ，搬到 shudu.js 去做这个动作了
      /* for (let i = 0; i < 20; i++) {
        var y = Math.floor(Math.random() * 9)
        var x = Math.floor(Math.random() * 9)
        this.matrix[y][x] = 0
      } */
    }
  }, {
    key: 'fillNumber',
    value: function fillNumber(n) {
      this.fillRow(n, 0); // 从第 0  行开始填入 n
    }
  }, {
    key: 'fillRow',
    value: function fillRow(n, rowIndex) {
      // 递归函数出口
      if (rowIndex > 8) {
        return true;
      }
      var rowData = this.matrix[rowIndex];
      var orders = this.orders[rowIndex];
      //随机选择列
      var len = orders.length;
      for (var i = 0; i < len; i++) {
        var colIndex = orders[i];
        // 如果这个位置已经有值，跳过
        if (rowData[colIndex]) {
          continue;
        }
        // 检查这个位置是否可以填 n
        if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
          continue;
        }
        rowData[colIndex] = n;
        // 当前 n 填写成功，递归调用 fillRow() 来在下一行中填写 n
        // 例如 当前 n=1 ，要在每行 填入 一个 1
        // 当前      n=2 ，要在每行 填入 一个 2......填入 1~9
        // 去下一行填写 n，如果没有填写进去，就继续寻找当前行下一个位置
        if (!this.fillRow(n, rowIndex + 1)) {
          rowData[colIndex] = 0;
          continue;
        }
        return true;
      }
      return false;
    }
  }]);

  return Generator;
}();

// 没写一段代码都要去检查，检查成功之后，把检查的代码删除
/* const generator = new Generator()
generator.generate()
console.log(generator.matrix)  */

// ①将数字 1~9 依次填入每行（0~8 行）
// ②随机选列 检查是否可以填入
// ③如果所有列都不可以填入，要返回上一行 ②随机选.......，（形成一个递归过程）

module.exports = Generator;

// 现在生成的是错误的，每宫的数据有重复的

/***/ }),

/***/ "./js/core/shudu.js":
/*!**************************!*\
  !*** ./js/core/shudu.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成数独游戏迷盘

// 1. 生成完成的解决方案：Gnerator
// 2. 随去除部分数据：按比例


var Generator = __webpack_require__(/*! ./generator */ "./js/core/generator.js");

var Shudu = function () {
  function Shudu() {
    _classCallCheck(this, Shudu);

    // 生成完整的数独解决方案
    var generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  _createClass(Shudu, [{
    key: 'make',
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

      // 随去除部分数据：按比例
      // this.puzzleMatrix   这样写就是给 这个 Shudu 类添加了一个 puzzleMatrix 属性
      this.puzzleMatrix = this.solutionMatrix.map(function (rowData) {
        return rowData.map(function (cellValue) {
          return Math.random() * 9 < level ? 0 : cellValue;
        });
      });
    }
  }]);

  return Shudu;
}();

module.exports = Shudu;

/***/ }),

/***/ "./js/core/toolkit.js":
/*!****************************!*\
  !*** ./js/core/toolkit.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
 *矩阵和数组相关的工具集
 */
var matrixToolkit = {
  //生成一维数组,这里不能写默认参数
  makeRowArray: function makeRowArray(v) {
    var arr = new Array(9);
    arr.fill(v);
    return arr;
  },

  //生成二维数组/矩阵
  makeMatrix: function makeMatrix(v) {
    var _this = this;

    return Array.from({
      length: 9
    }, function () {
      return _this.makeRowArray(0);
    }); // 在 ES6 的模块中不能使用this
  },

  /* 
   *对传入数组进行随机排序，然后返回新数组
   */
  shuffle: function shuffle(arr) {
    var n = arr.length - 1;
    for (var i = n; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref = [arr[i], arr[j]];
      arr[j] = _ref[0];
      arr[i] = _ref[1];
    }
    return arr;
  },

  /* 
   * 检查指定位置是否可以填入 n
   */
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    var rowData = matrix[rowIndex];
    var colData = this.makeRowArray().map(function (v, i) {
      return matrix[i][colIndex];
    });

    var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$convertTo.boxIndex;

    var boxData = boxToolkit.getBoxCells(matrix, boxIndex);
    for (var i = 0; i < 9; i++) {
      if (rowData[i] === n || colData[i] === n || boxData[i] === n) return false;
    }
    return true;
  }
};

/* 
 *宫坐标工具集
 */
var boxToolkit = {
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];
    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[(rowIndex, colIndex)]);
    }
    return result;
  },
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      BoxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  }
};

// toolkit : 工具包
module.exports = function () {
  function Toolkit() {
    _classCallCheck(this, Toolkit);
  }

  _createClass(Toolkit, null, [{
    key: "matrix",

    /* 
     *矩阵和数组相关的工具集
     */
    get: function get() {
      return matrixToolkit;
    }
    /* 
     *宫坐标工具集
     */

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return Toolkit;
}();

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Grid = __webpack_require__(/*! ./ui/grid */ "./js/ui/grid.js");

$(function () {
  var grid = new Grid($("#container"));
  grid.build();
  grid.layout();
  console.log($('#operation-board div'));

  var _$ = $('#operation-board div'),
      _$2 = _slicedToArray(_$, 6),
      $goBack = _$2[0],
      $goForward = _$2[1],
      $rebuild = _$2[2],
      $pause = _$2[3],
      $del = _$2[4],
      $submit = _$2[5];
  // 返回,前进,重置,暂停,删除,提交
  //$goBack.click(function(){})


  $('#goBack').on('click', function (e) {
    grid.goBack();
  });
  $('#goForward').on('click', function (e) {
    grid.goForward();
  });
  $('#rebuild').on('click', function (e) {
    grid.rebuild();
  });
  /*   $rebuild.on('click', e => {
      console.log($('#reset'))
      grid.build()
      grid.layout();
    }) 为什么不行？？？*/
  $('#pause').on('click', function (e) {
    grid.pause();
  });
  $('#del').on('click', function (e) {
    grid.del();
  });
  $('#submit').on('click', function (e) {
    grid.submit();
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./js/ui/grid.js":
/*!***********************!*\
  !*** ./js/ui/grid.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//生成九宫格
//const Toolkit = require('../core/toolkit') // commonJS 模块导入方法
//const Generator = require('../core/generator')
var Shudu = __webpack_require__(/*! ../core/shudu */ "./js/core/shudu.js");
var Checker = __webpack_require__(/*! ../core/checker */ "./js/core/checker.js");

var Grid = function () {
  // 这个类 需要传入一个 $('') 选择器
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container; //  container  为 Dom
    // ？？？多此一举啊，干嘛要把传捡来的参数再定义一次？？？？为了保存？？
  }
  /* map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
    map() 方法按照原始数组元素顺序依次处理元素。注意： map() 不会对空数组进行检测。map() 不会改变原始数组。 */


  _createClass(Grid, [{
    key: 'build',
    value: function build() {
      // ①const matrix=Toolkit.matrix.makeMatrix(0) // 调用矩阵，创建一个元素都是 0 的二维数组
      /* ②const g = new Generator()
      g.generate()
      const matrix = g.matrix   // 生成了 1~9 的二维矩阵 并且随机的 去掉一些数据 */
      // ③ 通过 shudu.js 来去掉一些数据
      var shudu = new Shudu();
      shudu.make();
      var matrix = shudu.puzzleMatrix; // 等于 shudu 类中的 puzzleMatrix 属性

      var rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
      // 定义行样式，使用解构赋值，需要操作的是 row_g_bottom
      var colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right'];
      // 定义列样式，使用解构赋值，需要操作的是 col_g_right
      //matrix.map(RowArray => $div); // 二维数组的 元素 也就是 一维数组/每行数据 映射为 div
      //RowArray.map(cellValue =>)     // 一维数组/每行数据 映射为 <span>cellValue</span>

      // 将所有的数据都加入到 span  中
      this.$cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellValue, colIndex) {
          /* if (cellValue !== 0) { */
          return $("<span>") // 2 个 map 遍历，可以执行九宫格中所有的数组
          .addClass(colGroupClasses[colIndex % 3])
          //addClass() - 向被选元素添加一个或多个类 (每宫右边的外框加粗线) 
          .addClass(cellValue ? 'fixed' : 'empty')
          // 给九宫格题目 生成的数字灰色的背景,数字为 0 时，颜色为 白色，就不用 if 来判断 0 了
          .text(cellValue); //<span>cellValue</span> 
          //设置 text(str) 或返回 text() 所选元素的文本内容
        }
        /* return $("<span>")
          .addClass(colGroupClasses[colIndex % 3])  */
        // cellValue 值为 0 的时候不放进 九宫格，也就是不显示在 界面中
        /* } */
        );
      });

      // 将每行数据加入 1  个 div 中，得到 9  个 div
      var $divArray = $cells.map(function ($spanArray, rowIndex) {
        // 1 个 map 遍历，每次处理 1 行
        return $("<div>").addClass('row').addClass(rowGroupClasses[rowIndex % 3]) //(每宫底边的外框加粗线)
        .append($spanArray);
        // append() 在被选元素的结尾插入内容  
        // http://www.runoob.com/jquery/jquery-dom-add.html
      });

      // 将 9 个 div 加入到 this._$container 中：在这个 index.html 也就是 $(#container) 中
      this._$container.append($divArray);
    }
    // 给 Gird 类添加一个布局方法

  }, {
    key: 'layout',
    value: function layout() {
      var width = $('span:first', this._$container).width(); // $ 里面传 2 个参数？？？
      $('span', this._$container).height(width) // 是的高度等于宽度
      .css({
        'line-height': width + 'px', // ES6 字符串模本语法
        'font-size': width < 32 ? width / 2 + 'px' : ''
      });
    }
    //返回

  }, {
    key: 'goBack',
    value: function goBack() {}
    //前进

  }, {
    key: 'goForward',
    value: function goForward() {}
    //重置

  }, {
    key: 'rebuild',
    value: function rebuild() {
      this._$container.empty(); // 清除原来的  dom，下面重新生成一个
      this.build();
      this.layout();
    }
    //暂停

  }, {
    key: 'pause',
    value: function pause() {}
    // 删除指定格子

  }, {
    key: 'del',
    value: function del() {}
    //提交检查：成功显示通关，失败提示错误位置

  }, {
    key: 'submit',
    value: function submit() {
      //获取用户填入的数据
      var data = this._$container.children() // 获取到每行 也就是 div
      .map(function (rowIndex, div) {
        // 遍历 每个 div 
        return $(div).children() // 获取到每个 span
        .map(function (colIndex, span) {
          return parseInt($(span).text()) || 0;
        }); // 遍历 span 获取其内部的文本
      }).toArray() // 转为为原生数组
      .map(function ($data) {
        return $data.toArray();
      });
      var checker = new Checker(data);
      if (checker.check()) {
        return true;
      }
      // 检查不成功进行标记
      var marks = checker._matrixMarks;
      this._$container.children().each(function (rowIndex, div) {
        $(div).children().each(function (colIndex, span) {
          if ($span.hasClass('fixed')) {
            return; // 如果这个 span 带有  .fixed 的 class 类，就是游戏数据，不需要标记
          }
          if (!marks[rowIndex][colIndex]) {
            $(span).addClass('error'); // 给错误的地方，加一个 error 的 class 类，以突显错误
            //$(span)  与 $span ???
          } else {
            $span.removeClass("error");
          }
        });
      });
    }
  }]);

  return Grid;
}();

// 要在文档加载完全之后执行 window.onload =函数
/* $(document).ready(function () {
  const gird=new Gird($("#container"))
  gird.build();
  gird.layout();
}); */

module.exports = Grid;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map