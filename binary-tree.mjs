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
			if (currentNode.value === val) return;

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
		const { parent, target } = this.findExtended(value);

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

	findExtended(value, currentNode = this.root, prevNode = null) {
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
			return this.findExtended(value, currentNode.left, currentNode);
		else return this.findExtended(value, currentNode.right, currentNode);
	}

	find(value) {
		return this.findExtended(value).target;
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

	inOrder(callback) {
		if (!callback) throw new Error("No callback function!");

		sortInOrder(this.root);

		function sortInOrder(node) {
			if (!node.left) {
				callback(node);

				if (node.right) sortInOrder(node.right);

				return;
			}

			if (node.left) sortInOrder(node.left); // Smaller nodes

			callback(node); // Current node

			if (node.right) sortInOrder(node.right); // Bigger nodes
		}
	}

	preOrder(callback) {
		if (!callback) throw new Error("No callback function!");

		sortPreOrder(this.root);

		function sortPreOrder(node) {
			callback(node);

			if (node.left) sortPreOrder(node.left); // Smaller nodes
			if (node.right) sortPreOrder(node.right); // Bigger nodes
		}
	}

	postOrder(callback) {
		if (!callback) throw new Error("No callback function!");

		sortPostOrder(this.root);

		function sortPostOrder(node) {
			if (node.left) sortPostOrder(node.left); // Smaller nodes
			if (node.right) sortPostOrder(node.right); // Bigger nodes

			callback(node);
		}
	}

	height(node) {
		if (!(node instanceof Object))
			throw new Error("Argument must be of type Node");

		function findHeight(currentNode) {
			if (!currentNode.left && !currentNode.right) return 0;

			let leftHeight = 0;
			let rightHeight = 0;

			if (currentNode.left) {
				leftHeight += findHeight(currentNode.left);
				leftHeight++;
			}

			if (currentNode.right) {
				rightHeight += findHeight(currentNode.right);
				rightHeight++;
			}

			return leftHeight > rightHeight ? leftHeight : rightHeight;
		}

		return findHeight(node) + 1;
	}

	depth(node) {
		if (!(node instanceof Object))
			throw new Error("Argument must be of type Node");

		function findDepth(currentNode, depth = 0) {
			if (!currentNode) return null;

			if (currentNode === node) return depth;

			if (node.value < currentNode.value)
				return findDepth(currentNode.left, (depth += 1));
			else return findDepth(currentNode.right, (depth += 1));
		}

		return findDepth(this.root);
	}

	isBalanced() {
		const leftHeight = this.root.left ? this.height(this.root.left) : 0;
		const rightHeight = this.root.right ? this.height(this.root.right) : 0;

		if (Math.abs(leftHeight - rightHeight) > 1) {
			return false;
		}

		return true;
	}

	rebalance() {
		const values = [];

		this.levelOrder((node) => {
			values.push(node.value);
		});

		this.root = this.buildTree(values);
	}

	prettyPrint(node, prefix = "", isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	}
}

export { Tree, Node };
