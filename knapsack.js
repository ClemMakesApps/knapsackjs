var inventory = new Array();
var limit = 0;
var upperBoundWorth = 0;

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
		if(newCurrentWeight > limit) {
			returnNode = new nodeData(newBitset, newCurrentWeight, -1);
		}
		return returnNode;
	} else if(newCurrentWeight > limit || newCurrentWorth > upperBoundWorth) {
		//Optimization #1
		//Only go for right children when weight exceeds limit

		//Optimization #2
		//Only go for right children when worth exceeds upperbound
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

exports.item = function (weight, worth, name) {
	this.weight = weight;
	this.worth = worth;
	this.ratio = worth/weight;
	this.name = name;
}

exports.solveKnapsack = function() {
	//calculateLowerBound();

	var greedyNode = calculateGreedy();
	var factor = limit/greedyNode.totalWeight;
	upperBoundWorth = greedyNode.totalWorth * factor;

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
var calculateGreedy = function () {
	var totalWeight = 0;
	var totalWorth = 0;
	var totalBitset = new Array();

	inventory.sort(function(a,b) { return parseFloat(b.ratio) - parseFloat(a.ratio)} );
	
	for(var i = 0; i < inventory.length; i++) {
		totalWeight += inventory[i].weight;
		totalWorth += inventory[i].worth;
		totalBitset[i] = 1;

		if(totalWeight > limit) {
			totalWeight -= inventory[i].weight;
			totalWorth -= inventory[i].worth;
			totalBitset[i] = 0;
		} else if(totalWeight == limit) {
			break;
		}
	}

	var returnNode = new nodeData(totalBitset, totalWeight, totalWorth);

	return returnNode;
}