import { Tree, Node } from "./binary-tree.mjs";

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function printTreeData(tree) {
	const levelOrder = [];
	tree.levelOrder((node) => {
		levelOrder.push(node.value);
	});
	console.log("Level Order: " + levelOrder);

	const preOrder = [];
	tree.preOrder((node) => {
		preOrder.push(node.value);
	});
	console.log("Pre Order: " + preOrder);

	const postOrder = [];
	tree.postOrder((node) => {
		postOrder.push(node.value);
	});
	console.log("Post Order: " + postOrder);

	const inOrder = [];
	tree.inOrder((node) => {
		inOrder.push(node.value);
	});
	console.log("In Order: " + inOrder);
}

// Create Tree
const values = [];
for (let i = 0; i < 100; i++) {
	values.push(getRandomNumber(0, 100));
}

const tree = new Tree(values);

// Check if tree is balanced
console.log("Tree is balanced: " + tree.isBalanced());

// Print tree
printTreeData(tree);

// Add new nodes to tree
for (let i = 0; i < 10; i++) {
	tree.insert(getRandomNumber(100, 1000));
}

// Print tree
printTreeData(tree);

// Rebalance tree
console.log("Tree is balanced: " + tree.isBalanced());
tree.rebalance();
console.log("Tree is balanced: " + tree.isBalanced());

// Print tree
printTreeData(tree);
