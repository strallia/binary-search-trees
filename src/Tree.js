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

  delete(value, curNode = this.root) {
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
    if (!curNode) return true;

    let heightDiff = Math.abs(
      this.height(curNode.left) - this.height(curNode.right),
    );
    if (heightDiff > 1) return false;
    let leftIsBalanced = this.isBalanced(curNode.left);
    let rightIsBalanced = this.isBalanced(curNode.right);
    if (leftIsBalanced && rightIsBalanced) return true;
    else return false;
  }

  rebalance() {
    // Rebalances current tree
    const newArr = this.inOrder();
    this.root = this.buildTree(newArr, 0, newArr.length - 1);
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
