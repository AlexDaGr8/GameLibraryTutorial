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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _winner = __webpack_require__(2);

var _winner2 = _interopRequireDefault(_winner);

var _scoreBoard = __webpack_require__(3);

var _scoreBoard2 = _interopRequireDefault(_scoreBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (window) {
    var _init = function _init(_ref) {
        var _ref$container = _ref.container,
            container = _ref$container === undefined ? '' : _ref$container,
            _ref$cellHeight = _ref.cellHeight,
            cellHeight = _ref$cellHeight === undefined ? 50 : _ref$cellHeight,
            _ref$cellWidth = _ref.cellWidth,
            cellWidth = _ref$cellWidth === undefined ? 50 : _ref$cellWidth;

        var gameBody = document.getElementById(container);
        if (gameBody === undefined) {
            gameBody = document.getElementsByTagName('body')[0];
        }

        var W = new _winner2.default();

        var gameState = 0;
        var cellIndex = 0;
        var inputArray = [];

        var tbl = document.createElement('table');
        var tblBody = document.createElement('tbody');
        for (var i = 0; i < 3; i++) {
            var row = document.createElement('tr');

            var _loop = function _loop(j) {
                var cell = document.createElement('td');
                cell.setAttribute('width', cellWidth + 'px');
                cell.setAttribute('height', cellHeight + 'px');

                cell.setAttribute('index', cellIndex++);
                cell.addEventListener("click", function () {
                    var index = cell.getAttribute('index');
                    if (inputArray[index] !== undefined || W.name) return;
                    var inputState = gameState % 2 ? 0 : 1;
                    var cellText = inputState == 1 ? 'X' : 'O';
                    cell.innerHTML = cellText;
                    inputArray[index] = inputState;
                    gameState++;
                    var winner = W.findWinner(inputArray);
                    if (winner.state == 0 || winner.state == 1) {
                        _scoreBoard2.default.declareWinner(W);
                        _scoreBoard2.default.drawScore(tbl, inputArray, winner);
                    }
                });

                // setting styles for table cells
                cell.style.textAlign = 'center';
                cell.style.cursor = 'pointer';
                cell.style.fontSize = cellHeight * 0.4 + 'px';

                row.appendChild(cell);
            };

            for (var j = 0; j < 3; j++) {
                _loop(j);
            }
            tblBody.appendChild(row);
        }
        tbl.appendChild(tblBody);
        gameBody.appendChild(tbl);
        tbl.setAttribute('border', '1');

        // setting styles for table
        tbl.style.borderCollapse = 'collapse';
        tbl.style.border = '2px solid #000';
        tbl.style.height = 'auto';
        tbl.style.width = 'auto';
        tbl.style.margin = '20px auto';
    };
    window.Game = {
        init: _init
    };
})(window);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Winner = function () {
    function Winner() {
        _classCallCheck(this, Winner);

        this._name = null;
        this._score = 0;
    }

    _createClass(Winner, [{
        key: 'findWinner',
        value: function findWinner(inputLines) {
            var winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
            for (var i = 0; i < winningLines.length; i++) {
                var _winningLines$i = _slicedToArray(winningLines[i], 3),
                    a = _winningLines$i[0],
                    b = _winningLines$i[1],
                    c = _winningLines$i[2];

                if (inputLines[a] !== undefined && inputLines[a] === inputLines[b] && inputLines[a] === inputLines[c]) {
                    this._name = inputLines[a] == 1 ? 'X' : 'O';
                    this.calculateScore(inputLines, inputLines[a]);
                    return { state: inputLines[a], lines: [a, b, c] };
                }
            }
            return { state: null, lines: [] };
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(inputLines, player) {
            for (var i = 0; i < inputLines.length; i++) {
                if (inputLines[i] == player) {
                    this._score++;
                }
            }
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }
    }, {
        key: 'score',
        get: function get() {
            return this._score;
        }
    }]);

    return Winner;
}();

exports.default = Winner;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ScoreBoard = {
    drawScore: function drawScore(table, inputArray, winner) {
        table.style.opacity = '0.5';
        var cells = table.getElementsByTagName("td");
        var cellIndex = void 0;
        for (var c = 0; c < cells.length; c++) {
            cellIndex = parseInt(cells[c].getAttribute('index'));
            if (inputArray[cellIndex] == winner.state && winner.lines.indexOf(cellIndex) != -1) {
                cells[c].style.backgroundColor = '#eee';
            }
        }
    },
    declareWinner: function declareWinner(W) {
        var scoreboard = document.createElement("div");
        scoreboard.style.margin = "auto";
        scoreboard.style.height = '100px';
        scoreboard.style.lineHeight = '110px';
        scoreboard.style.border = 'dotted';
        scoreboard.style.marginTop = '10px';
        scoreboard.style.width = window.innerWidth - window.innerWidth * 0.02 + 'px';
        scoreboard.style.backgroundColor = "transparent";
        scoreboard.style.textAlign = "center";
        scoreboard.innerHTML = "Winner: " + W.name + ", Score: " + W.score;
        document.body.appendChild(scoreboard);
    }
};
exports.default = ScoreBoard;

/***/ })
/******/ ]);