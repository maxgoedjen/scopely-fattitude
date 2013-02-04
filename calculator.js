function percentChanges(data) {
	var parsed = [];
	for (var x=0;x<data.length;x++) {
		var person = data[x];

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
	for (var i=0; i<sorted.length; i++) {
		console.log(i + ' : ' + sorted[i]['name']);
	}
	return sorted;
}

function percentDifference(first, current) {
	return 100.0-(100.0/(first/current));
}

function currentPercentDifference(data) {
	var points = data["data"];
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

function rankedBettors(data, bets) {
	
}