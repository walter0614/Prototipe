'use strict'
app.controller("reportCtrl",function($scope, FBURL, $firebaseArray, $firebaseObject, cellarModel, productModel){
	
	var cellars = cellarModel.getAllCellars();
	var products = productModel.getAllProducts();
	var cellarsData = [];
	var categories = [];
	var data = [];

	for (var i = products.length - 1; i >= 0; i--) {
		for (var k = cellars.length - 1; k >= 0; k--) {
			if(angular.equals(cellars[k].$id,products[i].cellar)){
				var stock = !isNaN(products[i].stock) ? products[i].stock : 0; 
				stock = parseInt(stock);
				if (cellarsData[cellars[k].name] === undefined || cellarsData[cellars[k].name] === null) {
					cellarsData[cellars[k].name] = stock;
				}else{
					cellarsData[cellars[k].name] += stock;
				}

			}
		}
	}
	var index = 0;
	for(var obj in cellarsData){
		categories[index] = obj;
		data[index] = cellarsData[obj];
		index++;
	}
	showGraphic();
	function showGraphic(){
		Highcharts.chart('container', {
			xAxis: {
				categories: categories
			},
			series: [{
				data: data
			}]
		});
	}

});	
