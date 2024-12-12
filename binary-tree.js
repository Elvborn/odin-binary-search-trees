import MergeSort from "./merge-sort.js";

class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.root = this.buildTree(array);
	}

	buildTree(array) {
		// Sort array and remove duplicates
		array = [...new Set(MergeSort(array))];

		// Build BST
		function build(arr, start, end) {
			if (start > end) return null;

			const mid = Math.floor((start + end) / 2);

			const node = new Node(arr[mid]);

			node.left = build(arr, start, mid - 1);
			node.right = build(arr, mid + 1, end);

			return node;
		}

		return build(array, 0, array.length - 1);
	}

	insert(value) {
		function insertRec(val, currentNode) {
			if (val < currentNode.value) {
				if (currentNode.left === null) currentNode.left = new Node(val);
				else insertRec(val, currentNode.left);

				return;
			}

			if (currentNode.right === null) currentNode.right = new Node(val);
			else insertRec(val, currentNode.right);
		}

		insertRec(value, this.root);
	}

	remove(value) {
		function removeRec(val, currentNode) {
			if (!currentNode) {
				console.log("Node not found!");
				return;
			}

			if (val === currentNode.value) {
				console.log("Found!");

				return;
			}

			if (val < currentNode.value) removeRec(val, currentNode.left);
			else removeRec(val, currentNode.right);
		}

		removeRec(value, this.root);
	}
}

function prettyPrint(node, prefix = "", isLeft = true) {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
}

const data = [1, 2, 3, 4, 5, 123, 45, 2, 135, 4, 331, 5, 78];
const tree = new Tree(data);

tree.insert(6);
tree.remove(4);
prettyPrint(tree.root);
