$(function () {
	$(document).ready(function() {
		$.getJSON('data_weighins.json', function(jsonData) {
			var parsed = percentChanges(jsonData);
			var chart = new Highcharts.Chart({
				chart: {
					renderTo: 'graphContainer',
					type: 'line',
					marginRight: 130,
					marginBottom: 25
				},
				title: {
					text: 'Scopely Weight Loss Challenge',
					x: -20
				},
				xAxis: {
					categories: ['1', '2', '3', '4', '5', '6',
						'7', '8', '9', '10', '11', '12']
				},
				yAxis: {
					title: {
						text: '% of Fat Percentage Lost'
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				},
				tooltip: {
					formatter: function() {
							return '<b>'+ this.series.name +'</b><br/>'+
							Math.round(this.y) +'% Change';
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -10,
					y: 100,
					borderWidth: 0
				},
				series: parsed
			});

		});

	});

});
