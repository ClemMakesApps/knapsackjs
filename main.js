
fs = require('fs')
var knapsackjs = require('./knapsack.js');
//Read Input file
fs.readFile("data/input.json", 'utf8', function (err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}
 
 	data = JSON.parse(data);

 	//Load data into inventory array
 	var inventory = new Array();
	for(var i = 0; i < data.items.length; i++) {
	  var loadItem = new knapsackjs.item(data.items[i].weight, data.items[i].worth, data.items[i].name);
	  inventory.push(loadItem);
	}


	var t = process.hrtime();	//Start time

	//Start Knapsack Process
 	knapsackjs.setNewLimit(data.limit);
	knapsackjs.setInventory(inventory);

	winningNode = knapsackjs.solveKnapsack();

	console.log("Winning Combination:");
	for(var i = 0; i < winningNode.bitset.length; i++) {
		if(winningNode.bitset[i] == '1') {
			console.log(inventory[i]);
		}
	}
	console.log("Total Worth: " + winningNode.totalWorth);
	console.log("Bitset: " + winningNode.bitset);

	//Benchmarking
	t = process.hrtime(t);
	console.log('benchmark took %d seconds and %d nanoseconds', t[0], t[1]);
});


