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
    // Base case: delete curNode if matches given value
    if (curNode.data === value) {
      const position = value < curNode.data ? 'left' : 'right';
      prevNode[position] = null;
      return;
    }

    // traverse tree till hit leaf node with desired value to remove
    const nextNode = value < curNode.data ? curNode.left : curNode.right;
    this.delete(value, curNode, nextNode);
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
myTree.delete(23);
prettyPrint(myTree.root);
