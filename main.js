
var inputFilename = process.argv[2];

// MODES
	// 0 - Brute Force Tree
	// 1 - Tree Optimized w/ weight optimizations
	// 2 - Tree Optimized w/ weight optimizations + greedy upper bound optimizations
var modeType = process.argv[3];

fs = require('fs')
var knapsackjs = require('./knapsack.js');
var t = process.hrtime();	//Start time

//Read Input file
fs.readFile(inputFilename, 'utf8', function (err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}
 
 	data = JSON.parse(data);

 	knapsackjs.setNewLimit(data.limit);

 	//Load data into inventory array
 	var inventory = new Array();
	for(var i = 0; i < data.items.length; i++) {
	  var loadItem = new knapsackjs.item(data.items[i].weight, data.items[i].worth, data.items[i].name);
	  inventory.push(loadItem);
	}
	knapsackjs.setInventory(inventory);

	winningNode = knapsackjs.solveKnapsack(modeType);

	var answerSack = new Array();
	console.log("Winning Combination:");
	for(var i = 0; i < winningNode.bitset.length; i++) {
		if(winningNode.bitset[i] == '1') {
			answerSack.push(inventory[i]);
		}
	}
	answerSack.sort(function(a,b) { 
		if(a.name < b.name) return -1;
	    if(a.name > b.name) return 1;
	    return 0;
	} );
	//console.log(answerSack);

	console.log("Limit: " + knapsackjs.getLimit());
	console.log("Total Weight: " + winningNode.totalWeight);
	console.log("Total Worth: " + winningNode.totalWorth);
	console.log("Bitset: " + winningNode.bitset);

	//Benchmarking
	t = process.hrtime(t);
	console.log('benchmark took %d seconds and %d nanoseconds', t[0], t[1]);
});


