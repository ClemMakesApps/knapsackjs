
fs = require('fs')
//var BitSet = require('./bitset.js').BitSet;
// anotherjs = require('./anotherjs')

var inventory = new Array();
var limit = 0;

item = function (weight, worth) {
	this.weight = weight;
	this.worth = worth;
}

nodeData = function (bitset, totalWeight, totalWorth) {
	this.bitset = bitset;
	this.totalWeight = totalWeight;
	this.totalWorth = totalWorth;
}

function nodeWorth(bitset) {
	var totalWorth = 0;
	var totalWeight = 0;

	for(var i = 0; i < bitset.length; i++) {
		if(bitset[i] == '1') {
			var node = inventory[i];
			totalWorth += node.worth;
			totalWeight += node.weight;
			if(totalWeight > limit) {
				var returnNode = new nodeData(bitset, totalWeight, -1);
				return returnNode;
			}
		}
	}

	var returnNode = new nodeData(bitset, totalWeight, totalWorth);
	return returnNode;
}

function processNode(nodeBitset, take) {
	var newBitset = nodeBitset.slice(0);
	newBitset.push(take);

	//console.log(newBitset.length);
	//console.log(inventory.length);
	if(newBitset.length == inventory.length) {
		return nodeWorth(newBitset);
	} else {
		var t = processNode(newBitset, 1);
		var i = processNode(newBitset, 0);
		if( t.totalWorth > i.totalWorth) {
			return t;
		} else {
			return i;
		}
	}
}

//Read Input file
fs.readFile("data/p01.json", 'utf8', function (err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}
 
 	data = JSON.parse(data);

 	limit = data.limit;
 	//Load data into inventory array
	for(var i = 0; i < data.items.length; i++) {
	  var loadItem = new item(data.items[i].weight, data.items[i].worth);
	  inventory.push(loadItem);
	}

	var firstNodeBitset = new Array();
	 
	var firstNodeTake = processNode(firstNodeBitset, 1);
	// console.log("Take Branch");
	// console.log("-------------------------")
	// console.log("Bitset = " + firstNodeTake.bitset);
	// console.log("Worth = " + firstNodeTake.totalWorth);
	// console.log("Weight = " + firstNodeTake.totalWeight);
	// console.log("");
	var firstNodeIgnore = processNode(firstNodeBitset, 0);
	// console.log("Ignore Branch");
	// console.log("-------------------------")
	// console.log("Bitset = " + firstNodeIgnore.bitset);
	// console.log("Worth = " + firstNodeIgnore.totalWorth);
	// console.log("Weight = " + firstNodeIgnore.totalWeight);
	
	var winningNode;

	if(firstNodeTake.totalWorth > firstNodeIgnore.totalWorth) {
		winningNode = firstNodeTake;
	} else {
		winningNode = firstNodeIgnore;
	}

	console.log("Winning Combination:");
	for(var i = 0; i < winningNode.bitset.length; i++) {
		if(winningNode.bitset[i] == '1') {
			console.log(inventory[i]);
		}
	}
	console.log("Total Worth: " + winningNode.totalWorth);
	console.log("Bitset: " + winningNode.bitset);
});

