$(function () {
	$(document).ready(function() {
		$.getJSON('data_bets.json', function(bettors) {
			$.getJSON('data_weighins.json', function(weighins) {
				
				var rankedWeights = percentChanges(weighins);
				var rBettors = rankedBettors(rankedWeights, bettors);
				console.log(rBettors);
				for (var i=0; i<rBettors.length; i++) {
					var row = '<tr>';
					row += '<tr>';
					row += '<td>' + (i+1) + '</td>';
					row += '<td>' + rBettors[i]['name'] + '</td>';
					row += '<td>' + rBettors[i]['net'] + '</td>';
					row += '</tr>'
					$('#bettorChart').append(row);
				}
			});
		});

	});
});