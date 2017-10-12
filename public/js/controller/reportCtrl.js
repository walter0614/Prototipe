'use strict'
app.controller("reportCtrl",function($scope, FBURL, $firebaseArray, $firebaseObject, cellarModel, productModel, CategoryModel){
	
	var cellars = cellarModel.getAllCellars();
	var products = productModel.getAllProducts();
	var categorys = CategoryModel.getAllCategorys();
	var cellarsData = [];
	var categorysData = [];
	var categories3D = [];
	var categories = [];
	var cellars3D = [];
	var data = [];

	//Create all categories in each cellar
	for (var k = cellars.length - 1; k >= 0; k--) {
		var categorysSeries = [];
		for (var i = categorys.length - 1; i >= 0; i--) {
			categorysSeries[categorys[i].$id] = 0;
		}
		categorysData[cellars[k].$id] = categorysSeries;
	}

	//Iterate all products
	for (var i = products.length - 1; i >= 0; i--) {
		//Get cellar by product
		for (var k = cellars.length - 1; k >= 0; k--) {
			var stock = !isNaN(products[i].stock) ? products[i].stock : 0; 
			stock = parseInt(stock);
			if(angular.equals(cellars[k].$id,products[i].cellar)){
				if (cellarsData[cellars[k].name] === undefined || cellarsData[cellars[k].name] === null) {
					cellarsData[cellars[k].name] = stock;
				}else{
					cellarsData[cellars[k].name] += stock;
				}
			}
		}
		//Set value from cellar and category from the product
		for(var obj in categorysData){
			if(angular.equals(obj,products[i].cellar)){
				for(var objB in categorysData[obj]){
					if(angular.equals(objB,products[i].type)){
						categorysData[obj][objB] += stock;
					}
				}
			}
		}
	}
	//Prepare data for Graphic 3D
	var categorysSeries = [];
	for(var obj in categorysData){	
		for(var objB in categorysData[obj]){
			for (var i = categorys.length - 1; i >= 0; i--) {
				if(angular.equals(objB,categorys[i].$id)){
					var nameCategory = categorys[i].name;
					if (categorysSeries[nameCategory] === undefined || categorysSeries[nameCategory] === null) {
						categorysSeries[nameCategory] = {
							name: nameCategory,
							data: [categorysData[obj][objB]]
						}
					}else{
						var valueOld = categorysSeries[nameCategory].data;
						valueOld.push(categorysData[obj][objB]);
						categorysSeries[nameCategory].data = valueOld;
					}
				}
			}	
		}
		for (var k = cellars.length - 1; k >= 0; k--) {
			if(angular.equals(cellars[k].$id,obj)){
				cellars3D.push(cellars[k].name);		
			}
		}
	}
	var index = 0;
	for(var obj in cellarsData){
		categories[index] = obj;
		data[index] = cellarsData[obj];
		index++;
	}
	for(var obj in categorysSeries){
		categories3D.push(categorysSeries[obj]);
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
			categories: cellars3D,
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
		series: categories3D
	});

});	
