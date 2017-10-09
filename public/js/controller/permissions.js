'use strict'

app.controller("PermissionCtrl",function($scope, FBURL, $firebaseArray, $routeParams, $firebaseObject, toastr){
	
	var ref = new Firebase(FBURL);
	$scope.rols = $firebaseArray(ref.child("Permissions"));
	//var categoryId = $routeParams.categoryId;
	/*if (categoryId) {
		$scope.categorieCheck = getCategory(categoryId);
	}
	function getCategory(categoryId){
		return $firebaseObject(ref.child("Categorys").child(categoryId));
	}*/
	$scope.postRol = function(rol){
		$scope.rols.$add(rol);
		$('#modalRol').modal('close');
		$("#Name").val("");
		toastr.success('Rol Created!',rol.name);
	}
	/*$scope.deleteCategory = function(category){
		 $firebaseObject(ref.child('Categorys').child(categoryId)).$remove(category.$id);
		 $('#modal2').modal('close');
		 toastr.error('Category Deleted!',category.name);
	}
	$scope.setCategory = function(category){
		$scope.categorieCheck.$save(category);
		$('#modal2').modal('close');
		toastr.success('Category Updated!',category.name);
	}*/
});
