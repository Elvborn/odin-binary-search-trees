import MergeSort from "./merge-sort.mjs";

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

	deleteItem(value) {
		const { parent, target } = this.find(value);

		if (!target) return;

		deleteNode(target, parent);

		function deleteNode(target, parent) {
			// Delete leaf node
			if (!target.left && !target.right) {
				if (parent.value > target.value) parent.left = null;
				else parent.right = null;

				return;
			}

			// Delete node with single child
			if ((target.left && !target.right) || (!target.left && target.right)) {
				const targetChildNode =
					target.left !== null ? target.left : target.right;

				if (parent.value > target.value) parent.left = targetChildNode;
				else parent.right = targetChildNode;

				return;
			}

			// Delete node with two children
			const { nextBiggestParrent, nextBiggestNode } = getNextNode(
				target.right,
				target
			);

			deleteNode(nextBiggestNode, nextBiggestParrent);

			target.value = nextBiggestNode.value;

			function getNextNode(currentNode, prevNode = null) {
				if (!currentNode.left)
					return {
						nextBiggestParrent: prevNode,
						nextBiggestNode: currentNode,
					};

				return getNextNode(currentNode.left, currentNode);
			}
		}
	}

	find(value, currentNode = this.root, prevNode = null) {
		if (!currentNode) {
			return {
				parent: null,
				target: null,
			};
		}

		if (value === currentNode.value) {
			return {
				parent: prevNode,
				target: currentNode,
			};
		}

		if (value < currentNode.value)
			return this.find(value, currentNode.left, currentNode);
		else return this.find(value, currentNode.right, currentNode);
	}

	levelOrder(callback) {
		if (!callback) throw new Error("No callback function!");

		const queue = [this.root];

		while (queue.length > 0) {
			const node = queue.shift();

			callback(node);

			if (node.left) queue.push(node.left);
			if (node.right) queue.push(node.right);
		}
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

const data = [1, 5, 3, 15, 42, 2, 8, 9, 14, 123, 45, 135, 331, 78];
const tree = new Tree(data);

tree.insert(6);
tree.deleteItem(0);
prettyPrint(tree.root);
