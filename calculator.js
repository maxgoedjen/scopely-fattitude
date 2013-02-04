function percentChanges(people) {
	var parsed = [];
	for (var x=0;x<people.length;x++) {
		var person = people[x];

		var endObject = {"name" : person["name"]};
		var rawData = person["data"];
		var points = [];
		
		var first = rawData[0];
		for (var i=0;i<rawData.length;i++) {
			var percent = percentDifference(first, rawData[i])
			points.push(percent);
		}
				 
		endObject["data"] = points;
		parsed.push(endObject);
	}

	var sorted = parsed.sort(percentSorter);
	return sorted;
}

function percentDifference(first, current) {
	return 100.0-(100.0/(first/current));
}

function currentPercentDifference(person) {
	var points = person["data"];
	return points[points.length-1];
}

function percentSorter(a, b) {
	var aCurrent = currentPercentDifference(a);
	var bCurrent = currentPercentDifference(b);
	if (aCurrent == bCurrent) {
		return 0;
	} else if (aCurrent > bCurrent) {
		return -1;
	} else {
		return 1;
	}
}

function rankedBettors(weightRankings, bettors) {
	var rankedBettors = [];
	for (var i=0; i<bettors.length; i++) {
		var ranked = rankedBettor(weightRankings, bettors[i]);
		rankedBettors.push(ranked);
	}
	var sorted = rankedBettors.sort(netSorter);
	return sorted;
}

function rankedBettor(weightRankings, bettorData) {
	var ranked = {'name' : bettorData['name']};
	var bets = bettorData['bets'];
	var rankedBets = []
	for (var i=0; i<bets.length; i++) {
		var index = -1;
		for (var x=0; x<weightRankings.length; x++) {
			if (weightRankings[x]['name'] == bets[i]) {
				index = x;
			}
		}
		if (index == -1) {
			console.log('ERROR: ' + bets[i]);
		}
		var diff = Math.abs(index - i);
		rankedBets.push({
			'name' : bets[i],
			'diff' : diff
		});
	}
	ranked['bets'] = rankedBets;
	ranked['net'] = netBettor(ranked);
	return ranked;
}

function netBettor(bettor) {
	var bets = bettor['bets'];
	var net = 0;
	for (var i=0; i<bets.length; i++) {
		var bet = bets[i];
		net += bet['diff'];
	}
	return net;
}

function netSorter(a, b) {
	var netA = a['net'];
	var netB = b['net'];
	if (netA == netB) {
		return 0;
	} else if (netA < netB) {
		return -1;
	} else {
		return 1;
	}
}