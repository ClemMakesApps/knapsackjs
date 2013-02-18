var inventory = new Array();
var limit = 0;
var lowerBound = -1;

var nodeData = function (bitset, totalWeight, totalWorth) {
	this.bitset = bitset;
	this.totalWeight = totalWeight;
	this.totalWorth = totalWorth;
}

var processNode = function(currentNode, take) {
	var newBitset = currentNode.bitset.slice(0);
	newBitset.push(take);

	var newCurrentWeight = currentNode.totalWeight;
	var newCurrentWorth = currentNode.totalWorth;

	if(take == 1) {
		newCurrentWeight += inventory[newBitset.length-1].weight;
		newCurrentWorth += inventory[newBitset.length-1].worth;
	}

	var returnNode = new nodeData(newBitset, newCurrentWeight, newCurrentWorth);
	if(newBitset.length == inventory.length) {
		return returnNode;
	} else if(newCurrentWeight > limit) {
		//Optimization #1
		//Only go for right children when weight exceeds limit
		return processNode(returnNode, 0);
	} else {
		var t = processNode(returnNode, 1);
		var i = processNode(returnNode, 0);
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
	//calculateLowerBound();

	var firstNodeBitset = new Array();
	 
	var firstNode = new nodeData(firstNodeBitset, 0, 0)

	var firstNodeTake = processNode(firstNode, 1);
	var firstNodeIgnore = processNode(firstNode, 0);
	
	var winningNode;

	if(firstNodeTake.totalWorth > firstNodeIgnore.totalWorth) {
		winningNode = firstNodeTake;
	} else {
		winningNode = firstNodeIgnore;
	}

	return winningNode;
}

//Greedy Implementation
var calculateLowerBound = function () {

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