'use strict'

app.controller("CategoryCtrl",function($scope, toastr, CategoryModel){
	
	$scope.categorys = CategoryModel.getAllCategorys();

	$scope.getCategory = function(catId){
		$scope.categorieCheck = CategoryModel.getCategoryById(catId);
	}

	$scope.postCategory = function(category){
		category.color = "#"+Math.floor(Math.random()*16777215).toString(16);
		CategoryModel.registerCategory(category);
		$('#modal1').modal('close');
		$("#Name").val("");
		$("#Val").val("");
		$("#Desc").val("");
		$("#type").val("");
		toastr.success('Category Created!',category.name);
	}
	$scope.deleteCategory = function(category){
		 CategoryModel.deleteCategory(category,category.$id);
		 $('#modal2').modal('close');
		 toastr.error('Category Deleted!',category.name);
	}
	$scope.setCategory = function(category){
		CategoryModel.updateCategory($scope.categorieCheck, category);
		$('#modal2').modal('close');
		toastr.success('Category Updated!',category.name);
	}
});
