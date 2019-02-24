const items = [
	{
		value: 60,
		weight: 10,
	},
	{
		value: 100,
		weight: 20,
	},
	{
		value: 120,
		weight: 30,
	},
];

const knapsack = require('./knapsack')({ items, capacity: 50 });

console.log(knapsack);