import { Node } from './Node';

export class Tree {
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
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, curNode = this.root) {
    // Don't insert duplicate values
    if (value === curNode.data) return;

    // Base case: stop at leaf node and insert value
    if (curNode.left === null && curNode.right === null) {
      const newNode = new Node(value);
      if (value < curNode.data) {
        curNode.left = newNode;
      } else {
        curNode.right = newNode;
      }
      return;
    }

    const nextNode = value < curNode.data ? curNode.left : curNode.right;
    this.insert(value, nextNode);
  }

  delete(value, prevNode = null, curNode = this.root) {
    // Base case: delete curNode only if matches value and is a leaf node
    if (
      curNode.data === value &&
      curNode.left === null &&
      curNode.right === null
    ) {
      const position = value < curNode.data ? 'left' : 'right';
      prevNode[position] = null;
      return;
    }

    if (
      curNode.data === value &&
      curNode.left !== null &&
      curNode.right !== null
    ) {
      // if select node has 2 children, replace curNode with inorder successor

      // loop until get to number just greater than target value
      // (ie the inorder successor)
      let successor = curNode.right;
      let successorParent = curNode;
      let movesCount = 0;
      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
        movesCount += 1;
      }

      // replace curNode with inorder successor depending on
      // how far the inorder successor is
      if (movesCount === 0) {
        curNode.data = successor.data;
        curNode.right = successor.right;
      } else {
        successorParent.left = successor.right;
        curNode.data = successor.data;
      }
      return;
    }

    let nextNode = null;
    if (
      curNode.data === value &&
      (curNode.left !== null || curNode.right !== null)
    ) {
      // if select node has 1 child, swap data values for curNode and child node
      const childNode = curNode.left === null ? curNode.right : curNode.left;
      const curNodeValue = curNode.data;
      curNode.data = childNode.data;
      childNode.data = curNodeValue;
      nextNode = childNode;
    } else {
      // continue traversing tree
      nextNode = value < curNode.data ? curNode.left : curNode.right;
    }
    this.delete(value, curNode, nextNode);
  }

  find(value, curNode = this.root) {
    // Returns node with given value
    if (curNode.data === value) return curNode;
    const nextNode = value < curNode.data ? curNode.left : curNode.right;
    return this.find(value, nextNode);
  }

  levelOrder(callback = null) {
    /**
     * If callback is provided, runs callback on each node traversed in
     * breadth-first level order. Otherwise, returns array of values.
     *   - try implementing using iteration and recursion
     */
    const breadthOrder = [];
    const queue = [this.root];
    while (queue) {
      const node = queue.shift();

      callback ? callback(node) : breadthOrder.push(node.data);
      if (queue.length === 0 && node.left === null && node.right === null) {
        if (callback) break;
        else return breadthOrder;
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    // }
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
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

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(
  myTree.levelOrder((arg) => {
    console.log(arg);
  }),
);
console.log(myTree.levelOrder());
prettyPrint(myTree.root);
