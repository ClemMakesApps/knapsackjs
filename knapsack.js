var inventory = new Array();
var limit = 0;
var lowerBound = -1;

var nodeData = function (bitset, totalWeight, totalWorth) {
	this.bitset = bitset;
	this.totalWeight = totalWeight;
	this.totalWorth = totalWorth;
}

var nodeWorth = function(bitset) {
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

var processNode = function(nodeBitset, take, currentWeight) {
	var newBitset = nodeBitset.slice(0);
	newBitset.push(take);

	var newCurrentWeight = currentWeight + inventory[newBitset.length-1].weight;

	if(newBitset.length == inventory.length) {
		return nodeWorth(newBitset);
	} else if(newCurrentWeight > limit) {
		return processNode(newBitset, 0, newCurrentWeight);
	} else {
		var t = processNode(newBitset, 1, newCurrentWeight);
		var i = processNode(newBitset, 0, newCurrentWeight);
		if( t.totalWorth > i.totalWorth) {
			return t;
		} else {
			return i;
		}
	}
}

exports.getLimit = function() {
	return limit;
}

exports.setNewLimit = function(newLimit) {
	limit = newLimit;
}

exports.resetLimit = function() {
	setNewLimit(0);
}

exports.setInventory = function(newInventory) {
	inventory = newInventory;
}

exports.item = function (weight, worth) {
	this.weight = weight;
	this.worth = worth;
	this.ratio = worth/weight;
}

exports.solveKnapsack = function() {
	calculateLowerBound();

	var firstNodeBitset = new Array();
	 
	var firstNodeTake = processNode(firstNodeBitset, 1);
	var firstNodeIgnore = processNode(firstNodeBitset, 0);
	
	var winningNode;

	if(firstNodeTake.totalWorth > firstNodeIgnore.totalWorth) {
		winningNode = firstNodeTake;
	} else {
		winningNode = firstNodeIgnore;
	}

	return winningNode;
}

//Greedy Implementation
calculateLowerBound = function () {

	inventory.sort(function(a,b) { return parseFloat(b.ratio) - parseFloat(a.ratio)} );
	
	for(var i = 0; i < inventory.length; i++) {
		lowerBound += inventory[i].weight;

		if(lowerBound > limit) {
			lowerBound -= inventory[i].weight;
		} else if(lowerBound == limit) {
			return;
		}
	}
}