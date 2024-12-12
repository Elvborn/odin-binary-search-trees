export default function mergeSort(array) {
	// I array size is 1 then return the value
	if (array.length <= 1) {
		return array;
	}

	// Split it again
	const middle = Math.round(array.length / 2);

	const left = mergeSort(array.splice(0, middle));
	const right = mergeSort(array);

	// Merge the arrays
	const sorted = [];
	let i = 0;
	let j = 0;

	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) sorted.push(left[i++]);
		else sorted.push(right[j++]);
	}

	for (i; i < left.length; i++) sorted.push(left[i]);

	for (j; j < right.length; j++) sorted.push(right[j]);

	return sorted;
}
