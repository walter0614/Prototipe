'use strict'
app.controller("reportCtrl",function($scope, FBURL, $firebaseArray, $firebaseObject, cellarModel, productModel, CategoryModel){
	
	var cellars = cellarModel.getAllCellars();
	var products = productModel.getAllProducts();
	var categorys = CategoryModel.getAllCategorys();
	var cellarsData = [];
	var categorysData = [];
	var categorysSeries = [];
	var categories = [];
	var data = [];

	for (var i = products.length - 1; i >= 0; i--) {
		for (var k = cellars.length - 1; k >= 0; k--) {
			var stock = !isNaN(products[i].stock) ? products[i].stock : 0; 
			stock = parseInt(stock);
			if(angular.equals(cellars[k].$id,products[i].cellar)){
				if (cellarsData[cellars[k].name] === undefined || cellarsData[cellars[k].name] === null) {
					cellarsData[cellars[k].name] = stock;
				}else{
					cellarsData[cellars[k].name] += stock;
				}
				for (var m = categorys.length - 1; m >= 0; m--) {
					var value = angular.equals(categorys[m].$id,products[i].type) ? stock : 0;
					if (categorysData[categorys[m].name] === undefined || categorysData[categorys[m].name] === null) {
						categorysData[categorys[m].name] = {
							data: [value+'-'+cellars[k].name]
						};
					}else{
						var detail = categorysData[categorys[m].name].data;
						detail.push(value+'-'+cellars[k].name);
						categorysData[categorys[m].name] = {
							data: detail
						};
					}
				}
			}
		}
	}
	console.log(categorysData);
	var index = 0;
	for(var obj in cellarsData){
		categories[index] = obj;
		data[index] = cellarsData[obj];
		index++;
	}
	for(var obj in categorysData){
		for (var i = categorysData[obj].data.length - 1; i >= 0; i--) {
			var split = categorysData[obj].data[i].split("-");
		}
	}
	
	Highcharts.chart('container', {
		xAxis: {
			categories: categories
		},
		title:{
			text: 'Productos Por Bodega'
		},
		series: [{
			data: data
		}]
	});
	Highcharts.chart('container2', {
		chart: {
			type: 'column',
			options3d: {
				enabled: true,
				alpha: 15,
				beta: 15,
				viewDistance: 25,
				depth: 40
			}
		},

		title: {
			text: 'Productos por Bodega, agrupados por servicio'
		},

		xAxis: {
			categories: categories,
			labels: {
				skew3d: true,
				style: {
					fontSize: '16px'
				}
			}
		},

		yAxis: {
			allowDecimals: false,
			min: 0,
			title: {
				text: 'Número de Productos',
				skew3d: true
			}
		},

		tooltip: {
			headerFormat: '<b>{point.key}</b><br>',
			pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
		},

		plotOptions: {
			column: {
				stacking: 'normal',
				depth: 40
			}
		},

		series: [{
			name: 'Auditoría',
			data: [5, 3, 4, 7, 2],
			stack: 'male'
		}, {
			name: 'Televisión',
			data: [3, 4, 4, 2, 5],
			stack: 'male'
		}, {
			name: 'Internet',
			data: [2, 5, 6, 2, 1],
			stack: 'female'
		}, {
			name: 'Telefonía',
			data: [3, 0, 4, 4, 3],
			stack: 'female'
		}]
	});

});	
