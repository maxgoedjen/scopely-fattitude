$(function () {
	$(document).ready(function() {
		$.getJSON('data_weighins.json', function(jsonData) {
			var parsed = percentChanges(jsonData);
			var chartPercents = new Highcharts.Chart({
				chart: {
					renderTo: 'graphContainerPercentsLost',
					type: 'line',
					marginRight: 130,
					marginBottom: 25
				},
				title: {
					text: 'Fat Percentages Lost (Higher is Better)',
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
			
			var chartRaw = new Highcharts.Chart({
				chart: {
					renderTo: 'graphContainerRaw',
					type: 'line',
					marginRight: 130,
					marginBottom: 25
				},
				title: {
					text: 'Fat Percentages (Lower is Better)',
					x: -20
				},
				xAxis: {
					categories: ['1', '2', '3', '4', '5', '6',
						'7', '8', '9', '10', '11', '12']
				},
				yAxis: {
					title: {
						text: 'Fat Percentage'
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
							this.y +'%';
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
				series: jsonData
			});


		});

	});

});
