'use strict'

app.factory('productModel', function (FBURL, $firebaseArray, $firebaseObject) {

	var ref = new Firebase(FBURL);
	var products = $firebaseArray(ref.child("Products"));

	function Product(name, value, stock, type, cellar){
		this.name = name; 
    this.value = value; 
    this.stock = stock; 
    this.type = type;
    this.cellar = cellar;
	}

  	return {
       getAllProducts: function(){
          return products;
       },
       getProductById: function(productId){
       		return $firebaseObject(ref.child("Products").child(productId));
       },
       createProduct: function(name, value, stock, type, cellar){
       		return new Product(name, value, stock, type, cellar);
       },
       registerProduct: function(product){
       		products.$add(product);
       },
       deleteProduct: function(product, productId){
       		$firebaseObject(ref.child('Products').child(productId)).$remove(product.$id);
       },
       updateProduct: function(productOld, productNew){
       		productOld.$save(productNew);
       }
     } 
});