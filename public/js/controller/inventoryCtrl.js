'use strict'

app.controller("InventoryCtrl",function($scope, toastr, cellarModel, CategoryModel, productModel, providerModel){

	$scope.cellars = cellarModel.getAllCellars();
	$scope.categorys = CategoryModel.getAllCategorys();
	$scope.products = productModel.getAllProducts();
	$scope.providers = providerModel.getAllProviders();

	$scope.getNameService = function(id){
		var result = 'Servicio Eliminado'; 
		for (var i = $scope.categorys.length - 1; i >= 0; i--) {
			if(angular.equals($scope.categorys[i].$id,id)){
				result = $scope.categorys[i].name;
			}
		}
		return result;
	}
	$scope.getNameCellar = function(id){
		var result = 'Bodega Eliminada'; 
		for (var i = $scope.cellars.length - 1; i >= 0; i--) {
			if(angular.equals($scope.cellars[i].$id,id)){
				result = $scope.cellars[i].name;
			}
		}
		return result;
	}
	$scope.getNameProvider = function(id){
		var result = 'Provedor Eliminado'; 
		for (var i = $scope.providers.length - 1; i >= 0; i--) {
			if(angular.equals($scope.providers[i].$id,id)){
				result = $scope.providers[i].name;
			}
		}
		return result;
	}

	$scope.getCellar = function(cellarId){
		$scope.cellar = cellarModel.getCellarById(cellarId);
	}

	$scope.getProduct = function(productId){
		$scope.product = productModel.getProductById(productId);
	}

	$scope.getProvider = function(providerId){
		$scope.provider = providerModel.getProviderById(providerId);
	}

	$scope.postProduct = function(product){
		if(angular.isDefined(product)){
			productModel.registerProduct(product);
			toastr.success('Producto Creado!',product.name,{ timeOut: 2500, progressBar: true });
		}else{
			toastr.error('No se creo el producto.','Ingrese bien los datos!',{ timeOut: 2500, progressBar: true });
		}
		delete $scope.product;
	}

	$scope.deleteProduct = function(product){
		productModel.deleteProduct(product,product.$id);
		toastr.error('Product Deleted!',product.name,{ timeOut: 2500, progressBar: true });
		delete $scope.product;
	}

	$scope.setProduct = function(product){
		if(angular.isDefined(product)){
			productModel.updateProduct(product, product);
			toastr.success('Producto Actualizado!',product.name,{ timeOut: 2500, progressBar: true });
		}else{
			toastr.error('No se actualizo el producto.','Ingrese bien los datos!',{ timeOut: 2500, progressBar: true });
		}
		delete $scope.product;
	}


	$scope.postCellar = function(cellar){
		if(angular.isDefined(cellar)){
			cellarModel.registerCellar(cellar);
			toastr.success('Cellar Created!',cellar.name,{ timeOut: 2500, progressBar: true });
		}else{
			toastr.error('No se creo la bodega.','Ingrese bien los datos!',{ timeOut: 2500, progressBar: true });
		}
		delete $scope.cellar;
	}

	$scope.deleteCellar = function(cellar){
		cellarModel.deleteCellar(cellar,cellar.$id);
		toastr.error('Bodega Eliminada!',cellar.name,{ timeOut: 2500, progressBar: true });
		delete $scope.cellar;
	}

	$scope.setCellar = function(cellar){
		if(angular.isDefined(cellar)){
			cellarModel.updateCellar(cellar, cellar);
			toastr.success('Bodega actualizada!',cellar.name);
		}else{
			toastr.error('No se actualizo la bodega.','Ingrese bien los datos!',{ timeOut: 2500, progressBar: true });
		}
		delete $scope.cellar;
	}

	$scope.postProvider = function(provider){
		if(angular.isDefined(provider)){
			providerModel.registerProvider(provider);
			toastr.success('Proveedor Creado!',provider.name,{ timeOut: 2500, progressBar: true });
		}else{
			toastr.error('No se creo el proveedor.','Ingrese bien los datos!',{ timeOut: 2500, progressBar: true });
		}
		delete $scope.provider;
	}
	$scope.deleteProvider = function(provider){
		providerModel.deleteProvider(provider,provider.$id);
		toastr.error('Proveedor Eliminado!',provider.name,{ timeOut: 2500, progressBar: true });
		delete $scope.provider;
	}
	$scope.setProvider = function(provider){
		if(angular.isDefined(provider)){
			providerModel.updateProvider(provider, provider);
			toastr.success('Provider Updated!',provider.name,{ timeOut: 2500, progressBar: true });
		}else{
			toastr.error('No se actualizo el proveedor.','Ingrese bien los datos!',{ timeOut: 2500, progressBar: true });
		}
		delete $scope.provider;
	}

});
