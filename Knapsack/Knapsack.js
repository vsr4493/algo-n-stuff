// A knapsack built with a purpose

const getRow = (item, grid, capacity) => {

}

const NONE = {
	total: 0,
	items: [],
};

const getMatrix = (items, capacity) => {
	let matrix = [];
	items = items.sort((a,b) => a.weight > b.weight);
	const weights = items.map(item => item.weight);
	let row = 0;
	while(row < items.length) {
		const currentItem = items[row];
		console.log("Processing: ", currentItem);
		matrix[row] = [NONE];
		let col = 0;
		while(col <= capacity) {
			const canAddItem = currentItem.weight <= col;
			if(row === 0) {
				matrix[row][col] = {
					total: canAddItem ? currentItem.value : NONE.total,
					items: canAddItem ? [currentItem] : [NONE],	
				};
			} else {
				if(!canAddItem) {
					matrix[row][col] = matrix[row-1][col] || NONE;
				} else {
					const itemsAtSlab = matrix[row - 1][col - currentItem.weight] || NONE;
					const existingMax = matrix[row-1][col] || NONE;
					const addNewValue = currentItem.value + itemsAtSlab.total > existingMax.total; // Compare value if we use this item vs the existing item
					console.log("Remaining items: ", itemsAtSlab)
					console.log("Current Max: ", existingMax);

					matrix[row][col] = {
						total: addNewValue ? currentItem.value + itemsAtSlab.total : existingMax.total,
						items: itemsAtSlab.items.concat(currentItem), 
					};
				}
			}
			col = col + 10;
		}
		row++;
	}
	const size = items.length;
	//console.clear();
	console.log(matrix.length);
	//console.log("RESULT: ", matrix[size - 1][(capacity/10) - 1].items);
}

// Given a list of items, pick up the items we need
// What does each cell indicate: The current max value
// What does each axis indicate:
	// Columns: Knapsack sizes
	// Rows: Knapsack items
const buildKnapsack = ({ items, capacity }) => {
	/*const knapsack = items.reduce((acc, item) => {
		return acc.concat(getRow(item, acc, capacity));
	}, []);
	return knapsack;*/
	getMatrix(items, capacity);
}

module.exports = buildKnapsack;