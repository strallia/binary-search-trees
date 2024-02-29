/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Node: () => (/* binding */ Node)
/* harmony export */ });
class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

/***/ }),

/***/ "./src/Tree.js":
/*!*********************!*\
  !*** ./src/Tree.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tree: () => (/* binding */ Tree)
/* harmony export */ });
/* harmony import */ var _Node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node */ "./src/Node.js");

class Tree {
  constructor(arr) {
    const processedArr = this.processArr(arr);
    console.log('🚀 ~ Tree ~ constructor ~ processedArr:', processedArr);
    this.root = this.buildTree(processedArr, 0, processedArr.length - 1);
  }
  processArr(arr) {
    let arrCopy = arr;
    arrCopy.sort((a, b) => a - b);
    arrCopy = arr.reduce((accumulatorArr, curValue) => {
      if (!accumulatorArr.includes(curValue)) accumulatorArr.push(curValue);
      return accumulatorArr;
    }, []);
    return arrCopy;
  }
  buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const root = new _Node__WEBPACK_IMPORTED_MODULE_0__.Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);
    return root;
  }
  insert(value) {
    let curNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    // Don't insert duplicate values
    if (this.find(value)) return;
    if (!curNode) return new _Node__WEBPACK_IMPORTED_MODULE_0__.Node(value);
    const newNode = value < curNode.data ? this.insert(value, curNode.left) : this.insert(value, curNode.right);
    if (newNode) {
      value < curNode.data ? curNode.left = newNode : curNode.right = newNode;
    }
  }
  delete(value) {
    let curNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    // Deletes node with given value from tree.
    // Tree must be balanced beforehand. Use rebalance() if needed.
    if (!curNode) return false;

    // if target node is a leaf node, delete target
    if (curNode.data === value && !curNode.left && !curNode.right) {
      return true;
    }

    // if target node has 1 child node, copy child node to target node
    if (curNode.data === value && (!curNode.left || !curNode.right)) {
      let childNode = curNode.left ? curNode.left : curNode.right;
      curNode.data = childNode.data;
      curNode.right = childNode.right;
      curNode.left = childNode.left;
    }

    // if target node has 2 child nodes, replace target node
    // with inorder successor
    if (curNode.data === value && curNode.left && curNode.right) {
      let successor = curNode.right;
      while (successor) {
        if (!successor.left) break;
        successor = successor.left;
      }
      // swap values for target node and successor
      let curNodeData = curNode.data;
      curNode.data = successor.data;
      successor.data = curNodeData;
    }

    // traverse tree until hit target node
    let leftFoundTarget = this.delete(value, curNode.left, curNode);
    let rightFoundTarget = this.delete(value, curNode.right, curNode);
    if (leftFoundTarget || rightFoundTarget) {
      const positionToDelete = leftFoundTarget ? 'left' : 'right';
      curNode[positionToDelete] = null;
    } else return;
  }
  find(value) {
    let curNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    // Returns node with given value, otherwise false
    if (curNode.data === value) return curNode;
    const nextNode = value < curNode.data ? curNode.left : curNode.right;
    if (!nextNode) return false;
    return this.find(value, nextNode);
  }
  levelOrder() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    /**
     * If callback is provided, runs callback on each node traversed in
     * breadth-first level order. Otherwise, returns array of values.
     */
    const breadthOrder = [];
    const queue = [this.root];
    while (queue) {
      const node = queue.shift();
      callback ? callback(node) : breadthOrder.push(node.data);
      if (queue.length === 0 && node.left === null && node.right === null) {
        if (callback) break;else return breadthOrder;
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // }
  }
  totalNodes() {
    let node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    // returns total nodes in tree
    if (!node) return 0;
    return this.totalNodes(node.left) + this.totalNodes(node.right) + 1;
  }
  inOrder() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    let totalNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.totalNodes();
    /**
     * If callback provided, runs callback on each node in inorder
     * traversal, otherwise returns array of values
     */
    if (!node) return [];
    const leftTreeArr = this.inOrder(callback, node.left);
    const rightTreeArr = this.inOrder(callback, node.right);
    let formedArr = [...leftTreeArr, node, ...rightTreeArr];
    if (formedArr.length === totalNodes) {
      if (callback) {
        formedArr.forEach(node => callback(node));
        return;
      } else return formedArr.map(node => node.data);
    } else return formedArr;
  }
  preOrder() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    let totalNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.totalNodes();
    /**
     * If callback provided, runs callback on each node in preorder
     * traversal, otherwise returns array of values
     */
    if (!node) return [];
    const leftTreeArr = this.preOrder(callback, node.left);
    const rightTreeArr = this.preOrder(callback, node.right);
    let formedArr = [node, ...leftTreeArr, ...rightTreeArr];
    if (formedArr.length === totalNodes) {
      if (callback) {
        formedArr.forEach(node => callback(node));
        return;
      } else return formedArr.map(node => node.data);
    } else return formedArr;
  }
  postOrder() {
    let callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    let totalNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.totalNodes();
    /**
     * If callback provided, runs callback on each node in postorder
     * traversal, otherwise returns array of values
     */
    if (!node) return [];
    const leftTreeArr = this.postOrder(callback, node.left);
    const rightTreeArr = this.postOrder(callback, node.right);
    let formedArr = [...leftTreeArr, ...rightTreeArr, node];
    if (formedArr.length === totalNodes) {
      if (callback) {
        formedArr.forEach(node => callback(node));
        return;
      } else return formedArr.map(node => node.data);
    } else return formedArr;
  }
  height(node) {
    // Returns height of given node (number of edges from node to farthest leaf node)
    if (!node) return -1;
    let leftHeight = this.height(node.left) + 1;
    let rightHeight = this.height(node.right) + 1;
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }
  depth(node) {
    let curNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
    // Returns depth of given node (number of edges from root to node)
    if (!curNode) return -1;
    if (curNode === node) return 0;
    let count = this.depth(node, curNode.left);
    if (count >= 0) return count + 1;
    count = this.depth(node, curNode.right);
    if (count >= 0) return count + 1;
    return -1;
  }
  isBalanced() {
    let curNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
    /**
     * Returns true if tree is balance (ie difference in heights of
     * left and right subtrees of every node in tree is no
     * more than one, otherwise returns false
     */
    if (!curNode) return true;
    let heightDiff = Math.abs(this.height(curNode.left) - this.height(curNode.right));
    if (heightDiff > 1) return false;
    let leftIsBalanced = this.isBalanced(curNode.left);
    let rightIsBalanced = this.isBalanced(curNode.right);
    if (leftIsBalanced && rightIsBalanced) return true;else return false;
  }
  rebalance() {
    // Rebalances current tree
    const newArr = this.inOrder();
    this.root = this.buildTree(newArr, 0, newArr.length - 1);
  }
}
const prettyPrint = function (node) {
  let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  let isLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Driver script for testing
const generateRandomTreeArr = (maxNumber, numOfElements) => {
  return [...Array(numOfElements)].map(() => {
    return Math.floor(Math.random() * maxNumber);
  });
};
const myTree = new Tree(generateRandomTreeArr(100, 20));
prettyPrint(myTree.root);
console.log('is tree balanced?:', myTree.isBalanced());
console.log('level order:', myTree.levelOrder());
console.log('inOrder:', myTree.inOrder());
console.log('preOrder:', myTree.preOrder());
console.log('postOrder:', myTree.postOrder());
myTree.insert(120);
myTree.insert(188);
myTree.insert(300);
prettyPrint(myTree.root);
console.log('is tree balanced?:', myTree.isBalanced());
myTree.rebalance();
console.log('balancing tree...');
console.log('is tree balanced?:', myTree.isBalanced());
prettyPrint(myTree.root);
console.log('level order:', myTree.levelOrder());
console.log('inOrder:', myTree.inOrder());
console.log('preOrder:', myTree.preOrder());
console.log('postOrder:', myTree.postOrder());

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* outline: 1px solid red; */
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,4BAA4B;AAC9B","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  /* outline: 1px solid red; */\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _Tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tree */ "./src/Tree.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL3NyYy9Ob2RlLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvLi9zcmMvVHJlZS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWVzLy4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWVzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JpbmFyeS1zZWFyY2gtdHJlZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iaW5hcnktc2VhcmNoLXRyZWVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmluYXJ5LXNlYXJjaC10cmVlcy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTm9kZSB7XG4gIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhID0gdmFsdWU7XG4gICAgdGhpcy5sZWZ0ID0gbnVsbDtcbiAgICB0aGlzLnJpZ2h0ID0gbnVsbDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTm9kZSB9IGZyb20gJy4vTm9kZSc7XG5cbmV4cG9ydCBjbGFzcyBUcmVlIHtcbiAgY29uc3RydWN0b3IoYXJyKSB7XG4gICAgY29uc3QgcHJvY2Vzc2VkQXJyID0gdGhpcy5wcm9jZXNzQXJyKGFycik7XG4gICAgY29uc29sZS5sb2coJ/CfmoAgfiBUcmVlIH4gY29uc3RydWN0b3IgfiBwcm9jZXNzZWRBcnI6JywgcHJvY2Vzc2VkQXJyKTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZShwcm9jZXNzZWRBcnIsIDAsIHByb2Nlc3NlZEFyci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHByb2Nlc3NBcnIoYXJyKSB7XG4gICAgbGV0IGFyckNvcHkgPSBhcnI7XG4gICAgYXJyQ29weS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgYXJyQ29weSA9IGFyci5yZWR1Y2UoKGFjY3VtdWxhdG9yQXJyLCBjdXJWYWx1ZSkgPT4ge1xuICAgICAgaWYgKCFhY2N1bXVsYXRvckFyci5pbmNsdWRlcyhjdXJWYWx1ZSkpIGFjY3VtdWxhdG9yQXJyLnB1c2goY3VyVmFsdWUpO1xuICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yQXJyO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gYXJyQ29weTtcbiAgfVxuXG4gIGJ1aWxkVHJlZShhcnIsIHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcigoc3RhcnQgKyBlbmQpIC8gMik7XG4gICAgY29uc3Qgcm9vdCA9IG5ldyBOb2RlKGFyclttaWRdKTtcblxuICAgIHJvb3QubGVmdCA9IHRoaXMuYnVpbGRUcmVlKGFyciwgc3RhcnQsIG1pZCAtIDEpO1xuICAgIHJvb3QucmlnaHQgPSB0aGlzLmJ1aWxkVHJlZShhcnIsIG1pZCArIDEsIGVuZCk7XG5cbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuXG4gIGluc2VydCh2YWx1ZSwgY3VyTm9kZSA9IHRoaXMucm9vdCkge1xuICAgIC8vIERvbid0IGluc2VydCBkdXBsaWNhdGUgdmFsdWVzXG4gICAgaWYgKHRoaXMuZmluZCh2YWx1ZSkpIHJldHVybjtcblxuICAgIGlmICghY3VyTm9kZSkgcmV0dXJuIG5ldyBOb2RlKHZhbHVlKTtcblxuICAgIGNvbnN0IG5ld05vZGUgPVxuICAgICAgdmFsdWUgPCBjdXJOb2RlLmRhdGFcbiAgICAgICAgPyB0aGlzLmluc2VydCh2YWx1ZSwgY3VyTm9kZS5sZWZ0KVxuICAgICAgICA6IHRoaXMuaW5zZXJ0KHZhbHVlLCBjdXJOb2RlLnJpZ2h0KTtcbiAgICBpZiAobmV3Tm9kZSkge1xuICAgICAgdmFsdWUgPCBjdXJOb2RlLmRhdGFcbiAgICAgICAgPyAoY3VyTm9kZS5sZWZ0ID0gbmV3Tm9kZSlcbiAgICAgICAgOiAoY3VyTm9kZS5yaWdodCA9IG5ld05vZGUpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZSh2YWx1ZSwgY3VyTm9kZSA9IHRoaXMucm9vdCkge1xuICAgIC8vIERlbGV0ZXMgbm9kZSB3aXRoIGdpdmVuIHZhbHVlIGZyb20gdHJlZS5cbiAgICAvLyBUcmVlIG11c3QgYmUgYmFsYW5jZWQgYmVmb3JlaGFuZC4gVXNlIHJlYmFsYW5jZSgpIGlmIG5lZWRlZC5cbiAgICBpZiAoIWN1ck5vZGUpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGlmIHRhcmdldCBub2RlIGlzIGEgbGVhZiBub2RlLCBkZWxldGUgdGFyZ2V0XG4gICAgaWYgKGN1ck5vZGUuZGF0YSA9PT0gdmFsdWUgJiYgIWN1ck5vZGUubGVmdCAmJiAhY3VyTm9kZS5yaWdodCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gaWYgdGFyZ2V0IG5vZGUgaGFzIDEgY2hpbGQgbm9kZSwgY29weSBjaGlsZCBub2RlIHRvIHRhcmdldCBub2RlXG4gICAgaWYgKGN1ck5vZGUuZGF0YSA9PT0gdmFsdWUgJiYgKCFjdXJOb2RlLmxlZnQgfHwgIWN1ck5vZGUucmlnaHQpKSB7XG4gICAgICBsZXQgY2hpbGROb2RlID0gY3VyTm9kZS5sZWZ0ID8gY3VyTm9kZS5sZWZ0IDogY3VyTm9kZS5yaWdodDtcbiAgICAgIGN1ck5vZGUuZGF0YSA9IGNoaWxkTm9kZS5kYXRhO1xuICAgICAgY3VyTm9kZS5yaWdodCA9IGNoaWxkTm9kZS5yaWdodDtcbiAgICAgIGN1ck5vZGUubGVmdCA9IGNoaWxkTm9kZS5sZWZ0O1xuICAgIH1cblxuICAgIC8vIGlmIHRhcmdldCBub2RlIGhhcyAyIGNoaWxkIG5vZGVzLCByZXBsYWNlIHRhcmdldCBub2RlXG4gICAgLy8gd2l0aCBpbm9yZGVyIHN1Y2Nlc3NvclxuICAgIGlmIChjdXJOb2RlLmRhdGEgPT09IHZhbHVlICYmIGN1ck5vZGUubGVmdCAmJiBjdXJOb2RlLnJpZ2h0KSB7XG4gICAgICBsZXQgc3VjY2Vzc29yID0gY3VyTm9kZS5yaWdodDtcbiAgICAgIHdoaWxlIChzdWNjZXNzb3IpIHtcbiAgICAgICAgaWYgKCFzdWNjZXNzb3IubGVmdCkgYnJlYWs7XG4gICAgICAgIHN1Y2Nlc3NvciA9IHN1Y2Nlc3Nvci5sZWZ0O1xuICAgICAgfVxuICAgICAgLy8gc3dhcCB2YWx1ZXMgZm9yIHRhcmdldCBub2RlIGFuZCBzdWNjZXNzb3JcbiAgICAgIGxldCBjdXJOb2RlRGF0YSA9IGN1ck5vZGUuZGF0YTtcbiAgICAgIGN1ck5vZGUuZGF0YSA9IHN1Y2Nlc3Nvci5kYXRhO1xuICAgICAgc3VjY2Vzc29yLmRhdGEgPSBjdXJOb2RlRGF0YTtcbiAgICB9XG5cbiAgICAvLyB0cmF2ZXJzZSB0cmVlIHVudGlsIGhpdCB0YXJnZXQgbm9kZVxuICAgIGxldCBsZWZ0Rm91bmRUYXJnZXQgPSB0aGlzLmRlbGV0ZSh2YWx1ZSwgY3VyTm9kZS5sZWZ0LCBjdXJOb2RlKTtcbiAgICBsZXQgcmlnaHRGb3VuZFRhcmdldCA9IHRoaXMuZGVsZXRlKHZhbHVlLCBjdXJOb2RlLnJpZ2h0LCBjdXJOb2RlKTtcbiAgICBpZiAobGVmdEZvdW5kVGFyZ2V0IHx8IHJpZ2h0Rm91bmRUYXJnZXQpIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uVG9EZWxldGUgPSBsZWZ0Rm91bmRUYXJnZXQgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgICAgY3VyTm9kZVtwb3NpdGlvblRvRGVsZXRlXSA9IG51bGw7XG4gICAgfSBlbHNlIHJldHVybjtcbiAgfVxuXG4gIGZpbmQodmFsdWUsIGN1ck5vZGUgPSB0aGlzLnJvb3QpIHtcbiAgICAvLyBSZXR1cm5zIG5vZGUgd2l0aCBnaXZlbiB2YWx1ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgaWYgKGN1ck5vZGUuZGF0YSA9PT0gdmFsdWUpIHJldHVybiBjdXJOb2RlO1xuICAgIGNvbnN0IG5leHROb2RlID0gdmFsdWUgPCBjdXJOb2RlLmRhdGEgPyBjdXJOb2RlLmxlZnQgOiBjdXJOb2RlLnJpZ2h0O1xuICAgIGlmICghbmV4dE5vZGUpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5maW5kKHZhbHVlLCBuZXh0Tm9kZSk7XG4gIH1cblxuICBsZXZlbE9yZGVyKGNhbGxiYWNrID0gbnVsbCkge1xuICAgIC8qKlxuICAgICAqIElmIGNhbGxiYWNrIGlzIHByb3ZpZGVkLCBydW5zIGNhbGxiYWNrIG9uIGVhY2ggbm9kZSB0cmF2ZXJzZWQgaW5cbiAgICAgKiBicmVhZHRoLWZpcnN0IGxldmVsIG9yZGVyLiBPdGhlcndpc2UsIHJldHVybnMgYXJyYXkgb2YgdmFsdWVzLlxuICAgICAqL1xuICAgIGNvbnN0IGJyZWFkdGhPcmRlciA9IFtdO1xuICAgIGNvbnN0IHF1ZXVlID0gW3RoaXMucm9vdF07XG4gICAgd2hpbGUgKHF1ZXVlKSB7XG4gICAgICBjb25zdCBub2RlID0gcXVldWUuc2hpZnQoKTtcblxuICAgICAgY2FsbGJhY2sgPyBjYWxsYmFjayhub2RlKSA6IGJyZWFkdGhPcmRlci5wdXNoKG5vZGUuZGF0YSk7XG4gICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwICYmIG5vZGUubGVmdCA9PT0gbnVsbCAmJiBub2RlLnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgYnJlYWs7XG4gICAgICAgIGVsc2UgcmV0dXJuIGJyZWFkdGhPcmRlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubGVmdCkgcXVldWUucHVzaChub2RlLmxlZnQpO1xuICAgICAgaWYgKG5vZGUucmlnaHQpIHF1ZXVlLnB1c2gobm9kZS5yaWdodCk7XG4gICAgfVxuICAgIC8vIH1cbiAgfVxuXG4gIHRvdGFsTm9kZXMobm9kZSA9IHRoaXMucm9vdCkge1xuICAgIC8vIHJldHVybnMgdG90YWwgbm9kZXMgaW4gdHJlZVxuICAgIGlmICghbm9kZSkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIHRoaXMudG90YWxOb2Rlcyhub2RlLmxlZnQpICsgdGhpcy50b3RhbE5vZGVzKG5vZGUucmlnaHQpICsgMTtcbiAgfVxuXG4gIGluT3JkZXIoY2FsbGJhY2sgPSBudWxsLCBub2RlID0gdGhpcy5yb290LCB0b3RhbE5vZGVzID0gdGhpcy50b3RhbE5vZGVzKCkpIHtcbiAgICAvKipcbiAgICAgKiBJZiBjYWxsYmFjayBwcm92aWRlZCwgcnVucyBjYWxsYmFjayBvbiBlYWNoIG5vZGUgaW4gaW5vcmRlclxuICAgICAqIHRyYXZlcnNhbCwgb3RoZXJ3aXNlIHJldHVybnMgYXJyYXkgb2YgdmFsdWVzXG4gICAgICovXG4gICAgaWYgKCFub2RlKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBsZWZ0VHJlZUFyciA9IHRoaXMuaW5PcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0KTtcbiAgICBjb25zdCByaWdodFRyZWVBcnIgPSB0aGlzLmluT3JkZXIoY2FsbGJhY2ssIG5vZGUucmlnaHQpO1xuICAgIGxldCBmb3JtZWRBcnIgPSBbLi4ubGVmdFRyZWVBcnIsIG5vZGUsIC4uLnJpZ2h0VHJlZUFycl07XG4gICAgaWYgKGZvcm1lZEFyci5sZW5ndGggPT09IHRvdGFsTm9kZXMpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBmb3JtZWRBcnIuZm9yRWFjaCgobm9kZSkgPT4gY2FsbGJhY2sobm9kZSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgcmV0dXJuIGZvcm1lZEFyci5tYXAoKG5vZGUpID0+IG5vZGUuZGF0YSk7XG4gICAgfSBlbHNlIHJldHVybiBmb3JtZWRBcnI7XG4gIH1cblxuICBwcmVPcmRlcihjYWxsYmFjayA9IG51bGwsIG5vZGUgPSB0aGlzLnJvb3QsIHRvdGFsTm9kZXMgPSB0aGlzLnRvdGFsTm9kZXMoKSkge1xuICAgIC8qKlxuICAgICAqIElmIGNhbGxiYWNrIHByb3ZpZGVkLCBydW5zIGNhbGxiYWNrIG9uIGVhY2ggbm9kZSBpbiBwcmVvcmRlclxuICAgICAqIHRyYXZlcnNhbCwgb3RoZXJ3aXNlIHJldHVybnMgYXJyYXkgb2YgdmFsdWVzXG4gICAgICovXG4gICAgaWYgKCFub2RlKSByZXR1cm4gW107XG5cbiAgICBjb25zdCBsZWZ0VHJlZUFyciA9IHRoaXMucHJlT3JkZXIoY2FsbGJhY2ssIG5vZGUubGVmdCk7XG4gICAgY29uc3QgcmlnaHRUcmVlQXJyID0gdGhpcy5wcmVPcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodCk7XG4gICAgbGV0IGZvcm1lZEFyciA9IFtub2RlLCAuLi5sZWZ0VHJlZUFyciwgLi4ucmlnaHRUcmVlQXJyXTtcbiAgICBpZiAoZm9ybWVkQXJyLmxlbmd0aCA9PT0gdG90YWxOb2Rlcykge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvcm1lZEFyci5mb3JFYWNoKChub2RlKSA9PiBjYWxsYmFjayhub2RlKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSByZXR1cm4gZm9ybWVkQXJyLm1hcCgobm9kZSkgPT4gbm9kZS5kYXRhKTtcbiAgICB9IGVsc2UgcmV0dXJuIGZvcm1lZEFycjtcbiAgfVxuXG4gIHBvc3RPcmRlcihjYWxsYmFjayA9IG51bGwsIG5vZGUgPSB0aGlzLnJvb3QsIHRvdGFsTm9kZXMgPSB0aGlzLnRvdGFsTm9kZXMoKSkge1xuICAgIC8qKlxuICAgICAqIElmIGNhbGxiYWNrIHByb3ZpZGVkLCBydW5zIGNhbGxiYWNrIG9uIGVhY2ggbm9kZSBpbiBwb3N0b3JkZXJcbiAgICAgKiB0cmF2ZXJzYWwsIG90aGVyd2lzZSByZXR1cm5zIGFycmF5IG9mIHZhbHVlc1xuICAgICAqL1xuICAgIGlmICghbm9kZSkgcmV0dXJuIFtdO1xuXG4gICAgY29uc3QgbGVmdFRyZWVBcnIgPSB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgbm9kZS5sZWZ0KTtcbiAgICBjb25zdCByaWdodFRyZWVBcnIgPSB0aGlzLnBvc3RPcmRlcihjYWxsYmFjaywgbm9kZS5yaWdodCk7XG4gICAgbGV0IGZvcm1lZEFyciA9IFsuLi5sZWZ0VHJlZUFyciwgLi4ucmlnaHRUcmVlQXJyLCBub2RlXTtcbiAgICBpZiAoZm9ybWVkQXJyLmxlbmd0aCA9PT0gdG90YWxOb2Rlcykge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvcm1lZEFyci5mb3JFYWNoKChub2RlKSA9PiBjYWxsYmFjayhub2RlKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSByZXR1cm4gZm9ybWVkQXJyLm1hcCgobm9kZSkgPT4gbm9kZS5kYXRhKTtcbiAgICB9IGVsc2UgcmV0dXJuIGZvcm1lZEFycjtcbiAgfVxuXG4gIGhlaWdodChub2RlKSB7XG4gICAgLy8gUmV0dXJucyBoZWlnaHQgb2YgZ2l2ZW4gbm9kZSAobnVtYmVyIG9mIGVkZ2VzIGZyb20gbm9kZSB0byBmYXJ0aGVzdCBsZWFmIG5vZGUpXG4gICAgaWYgKCFub2RlKSByZXR1cm4gLTE7XG5cbiAgICBsZXQgbGVmdEhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUubGVmdCkgKyAxO1xuICAgIGxldCByaWdodEhlaWdodCA9IHRoaXMuaGVpZ2h0KG5vZGUucmlnaHQpICsgMTtcbiAgICByZXR1cm4gbGVmdEhlaWdodCA+IHJpZ2h0SGVpZ2h0ID8gbGVmdEhlaWdodCA6IHJpZ2h0SGVpZ2h0O1xuICB9XG5cbiAgZGVwdGgobm9kZSwgY3VyTm9kZSA9IHRoaXMucm9vdCkge1xuICAgIC8vIFJldHVybnMgZGVwdGggb2YgZ2l2ZW4gbm9kZSAobnVtYmVyIG9mIGVkZ2VzIGZyb20gcm9vdCB0byBub2RlKVxuICAgIGlmICghY3VyTm9kZSkgcmV0dXJuIC0xO1xuICAgIGlmIChjdXJOb2RlID09PSBub2RlKSByZXR1cm4gMDtcblxuICAgIGxldCBjb3VudCA9IHRoaXMuZGVwdGgobm9kZSwgY3VyTm9kZS5sZWZ0KTtcbiAgICBpZiAoY291bnQgPj0gMCkgcmV0dXJuIGNvdW50ICsgMTtcbiAgICBjb3VudCA9IHRoaXMuZGVwdGgobm9kZSwgY3VyTm9kZS5yaWdodCk7XG4gICAgaWYgKGNvdW50ID49IDApIHJldHVybiBjb3VudCArIDE7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgaXNCYWxhbmNlZChjdXJOb2RlID0gdGhpcy5yb290KSB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRyZWUgaXMgYmFsYW5jZSAoaWUgZGlmZmVyZW5jZSBpbiBoZWlnaHRzIG9mXG4gICAgICogbGVmdCBhbmQgcmlnaHQgc3VidHJlZXMgb2YgZXZlcnkgbm9kZSBpbiB0cmVlIGlzIG5vXG4gICAgICogbW9yZSB0aGFuIG9uZSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcbiAgICAgKi9cbiAgICBpZiAoIWN1ck5vZGUpIHJldHVybiB0cnVlO1xuXG4gICAgbGV0IGhlaWdodERpZmYgPSBNYXRoLmFicyhcbiAgICAgIHRoaXMuaGVpZ2h0KGN1ck5vZGUubGVmdCkgLSB0aGlzLmhlaWdodChjdXJOb2RlLnJpZ2h0KSxcbiAgICApO1xuICAgIGlmIChoZWlnaHREaWZmID4gMSkgcmV0dXJuIGZhbHNlO1xuICAgIGxldCBsZWZ0SXNCYWxhbmNlZCA9IHRoaXMuaXNCYWxhbmNlZChjdXJOb2RlLmxlZnQpO1xuICAgIGxldCByaWdodElzQmFsYW5jZWQgPSB0aGlzLmlzQmFsYW5jZWQoY3VyTm9kZS5yaWdodCk7XG4gICAgaWYgKGxlZnRJc0JhbGFuY2VkICYmIHJpZ2h0SXNCYWxhbmNlZCkgcmV0dXJuIHRydWU7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZWJhbGFuY2UoKSB7XG4gICAgLy8gUmViYWxhbmNlcyBjdXJyZW50IHRyZWVcbiAgICBjb25zdCBuZXdBcnIgPSB0aGlzLmluT3JkZXIoKTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmJ1aWxkVHJlZShuZXdBcnIsIDAsIG5ld0Fyci5sZW5ndGggLSAxKTtcbiAgfVxufVxuXG5jb25zdCBwcmV0dHlQcmludCA9IChub2RlLCBwcmVmaXggPSAnJywgaXNMZWZ0ID0gdHJ1ZSkgPT4ge1xuICBpZiAobm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobm9kZS5yaWdodCAhPT0gbnVsbCkge1xuICAgIHByZXR0eVByaW50KG5vZGUucmlnaHQsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICfilIIgICAnIDogJyAgICAnfWAsIGZhbHNlKTtcbiAgfVxuICBjb25zb2xlLmxvZyhgJHtwcmVmaXh9JHtpc0xlZnQgPyAn4pSU4pSA4pSAICcgOiAn4pSM4pSA4pSAICd9JHtub2RlLmRhdGF9YCk7XG4gIGlmIChub2RlLmxlZnQgIT09IG51bGwpIHtcbiAgICBwcmV0dHlQcmludChub2RlLmxlZnQsIGAke3ByZWZpeH0ke2lzTGVmdCA/ICcgICAgJyA6ICfilIIgICAnfWAsIHRydWUpO1xuICB9XG59O1xuXG4vLyBEcml2ZXIgc2NyaXB0IGZvciB0ZXN0aW5nXG5jb25zdCBnZW5lcmF0ZVJhbmRvbVRyZWVBcnIgPSAobWF4TnVtYmVyLCBudW1PZkVsZW1lbnRzKSA9PiB7XG4gIHJldHVybiBbLi4uQXJyYXkobnVtT2ZFbGVtZW50cyldLm1hcCgoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heE51bWJlcik7XG4gIH0pO1xufTtcblxuY29uc3QgbXlUcmVlID0gbmV3IFRyZWUoZ2VuZXJhdGVSYW5kb21UcmVlQXJyKDEwMCwgMjApKTtcbnByZXR0eVByaW50KG15VHJlZS5yb290KTtcbmNvbnNvbGUubG9nKCdpcyB0cmVlIGJhbGFuY2VkPzonLCBteVRyZWUuaXNCYWxhbmNlZCgpKTtcbmNvbnNvbGUubG9nKCdsZXZlbCBvcmRlcjonLCBteVRyZWUubGV2ZWxPcmRlcigpKTtcbmNvbnNvbGUubG9nKCdpbk9yZGVyOicsIG15VHJlZS5pbk9yZGVyKCkpO1xuY29uc29sZS5sb2coJ3ByZU9yZGVyOicsIG15VHJlZS5wcmVPcmRlcigpKTtcbmNvbnNvbGUubG9nKCdwb3N0T3JkZXI6JywgbXlUcmVlLnBvc3RPcmRlcigpKTtcbm15VHJlZS5pbnNlcnQoMTIwKTtcbm15VHJlZS5pbnNlcnQoMTg4KTtcbm15VHJlZS5pbnNlcnQoMzAwKTtcbnByZXR0eVByaW50KG15VHJlZS5yb290KTtcbmNvbnNvbGUubG9nKCdpcyB0cmVlIGJhbGFuY2VkPzonLCBteVRyZWUuaXNCYWxhbmNlZCgpKTtcbm15VHJlZS5yZWJhbGFuY2UoKTtcbmNvbnNvbGUubG9nKCdiYWxhbmNpbmcgdHJlZS4uLicpO1xuY29uc29sZS5sb2coJ2lzIHRyZWUgYmFsYW5jZWQ/OicsIG15VHJlZS5pc0JhbGFuY2VkKCkpO1xucHJldHR5UHJpbnQobXlUcmVlLnJvb3QpO1xuY29uc29sZS5sb2coJ2xldmVsIG9yZGVyOicsIG15VHJlZS5sZXZlbE9yZGVyKCkpO1xuY29uc29sZS5sb2coJ2luT3JkZXI6JywgbXlUcmVlLmluT3JkZXIoKSk7XG5jb25zb2xlLmxvZygncHJlT3JkZXI6JywgbXlUcmVlLnByZU9yZGVyKCkpO1xuY29uc29sZS5sb2coJ3Bvc3RPcmRlcjonLCBteVRyZWUucG9zdE9yZGVyKCkpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC8qIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7ICovXG59XG5gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsNEJBQTRCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAvKiBvdXRsaW5lOiAxcHggc29saWQgcmVkOyAqL1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZXMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGVzLmNzcyc7XG5pbXBvcnQgJy4vVHJlZSc7XG4iXSwibmFtZXMiOlsiTm9kZSIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJkYXRhIiwibGVmdCIsInJpZ2h0IiwiVHJlZSIsImFyciIsInByb2Nlc3NlZEFyciIsInByb2Nlc3NBcnIiLCJjb25zb2xlIiwibG9nIiwicm9vdCIsImJ1aWxkVHJlZSIsImxlbmd0aCIsImFyckNvcHkiLCJzb3J0IiwiYSIsImIiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvckFyciIsImN1clZhbHVlIiwiaW5jbHVkZXMiLCJwdXNoIiwic3RhcnQiLCJlbmQiLCJtaWQiLCJNYXRoIiwiZmxvb3IiLCJpbnNlcnQiLCJjdXJOb2RlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwiZmluZCIsIm5ld05vZGUiLCJkZWxldGUiLCJjaGlsZE5vZGUiLCJzdWNjZXNzb3IiLCJjdXJOb2RlRGF0YSIsImxlZnRGb3VuZFRhcmdldCIsInJpZ2h0Rm91bmRUYXJnZXQiLCJwb3NpdGlvblRvRGVsZXRlIiwibmV4dE5vZGUiLCJsZXZlbE9yZGVyIiwiY2FsbGJhY2siLCJicmVhZHRoT3JkZXIiLCJxdWV1ZSIsIm5vZGUiLCJzaGlmdCIsInRvdGFsTm9kZXMiLCJpbk9yZGVyIiwibGVmdFRyZWVBcnIiLCJyaWdodFRyZWVBcnIiLCJmb3JtZWRBcnIiLCJmb3JFYWNoIiwibWFwIiwicHJlT3JkZXIiLCJwb3N0T3JkZXIiLCJoZWlnaHQiLCJsZWZ0SGVpZ2h0IiwicmlnaHRIZWlnaHQiLCJkZXB0aCIsImNvdW50IiwiaXNCYWxhbmNlZCIsImhlaWdodERpZmYiLCJhYnMiLCJsZWZ0SXNCYWxhbmNlZCIsInJpZ2h0SXNCYWxhbmNlZCIsInJlYmFsYW5jZSIsIm5ld0FyciIsInByZXR0eVByaW50IiwicHJlZml4IiwiaXNMZWZ0IiwiZ2VuZXJhdGVSYW5kb21UcmVlQXJyIiwibWF4TnVtYmVyIiwibnVtT2ZFbGVtZW50cyIsIkFycmF5IiwicmFuZG9tIiwibXlUcmVlIl0sInNvdXJjZVJvb3QiOiIifQ==