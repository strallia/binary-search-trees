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
    if (this.find(value)) return;

    if (!curNode) return new Node(value);

    const newNode =
      value < curNode.data
        ? this.insert(value, curNode.left)
        : this.insert(value, curNode.right);
    if (newNode) {
      value < curNode.data
        ? (curNode.left = newNode)
        : (curNode.right = newNode);
    }
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
    // Returns node with given value, otherwise false
    if (curNode.data === value) return curNode;
    const nextNode = value < curNode.data ? curNode.left : curNode.right;
    if (!nextNode) return false;
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

  totalNodes(node = this.root) {
    // returns total nodes in tree
    if (!node) return 0;
    return this.totalNodes(node.left) + this.totalNodes(node.right) + 1;
  }

  inOrder(callback = null, node = this.root, totalNodes = this.totalNodes()) {
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
        formedArr.forEach((node) => callback(node));
        return;
      } else return formedArr.map((node) => node.data);
    } else return formedArr;
  }

  preOrder(callback = null, node = this.root, totalNodes = this.totalNodes()) {
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
        formedArr.forEach((node) => callback(node));
        return;
      } else return formedArr.map((node) => node.data);
    } else return formedArr;
  }

  postOrder(callback = null, node = this.root, totalNodes = this.totalNodes()) {
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
        formedArr.forEach((node) => callback(node));
        return;
      } else return formedArr.map((node) => node.data);
    } else return formedArr;
  }

  height(node) {
    // Returns height of given node (number of edges from node to farthest leaf node)
    if (!node) return -1;

    let leftHeight = this.height(node.left) + 1;
    let rightHeight = this.height(node.right) + 1;
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  depth(node, curNode = this.root) {
    // Returns depth of given node (number of edges from root to node)
    if (!curNode) return -1;
    if (curNode === node) return 0;

    let count = this.depth(node, curNode.left);
    if (count >= 0) return count + 1;
    count = this.depth(node, curNode.right);
    if (count >= 0) return count + 1;
    return -1;
  }

  isBalanced(curNode = this.root) {
    /**
     * Returns true if tree is balance (ie difference in heights of
     * left and right subtrees of every node in tree is no
     * more than one, otherwise returns false
     */
    if (!curNode) return;

    let heightDiff = Math.abs(
      this.height(curNode.left) - this.height(curNode.right),
    );
    if (heightDiff > 1) return false;
    this.isBalanced(curNode.left);
    this.isBalanced(curNode.right);
    return true;
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

const myTree = new Tree([4, 8, 15]);
myTree.insert(1);
myTree.insert(7);
myTree.insert(6);
myTree.insert(5);
prettyPrint(myTree.root);
console.log(myTree.isBalanced());

const myTree2 = new Tree([1, 2, 5, 4]);
prettyPrint(myTree2.root);
console.log(myTree2.isBalanced());

// const myTree3 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// prettyPrint(myTree3.root);
// console.log(myTree3.isBalanced());
