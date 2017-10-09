'use strict'

app.factory('CategoryModel', function (FBURL, $firebaseArray, $firebaseObject) {

	var ref = new Firebase(FBURL);
	var categorys = $firebaseArray(ref.child("Categorys"));

	function Category(user, pass){
		this.user = user;
		this.pass = pass;
	}

  	return {
       getAllCategorys: function(){
			return categorys;
       },
       getCategoryById: function(categoryId){
       		return $firebaseObject(ref.child("Categorys").child(categoryId));
       },
       createCategory: function(user, pass){
       		return new Category(user, pass);
       },
       registerCategory: function(category){
       		categorys.$add(category);
       },
       deleteCategory: function(category, categoryId){
       		$firebaseObject(ref.child('Categorys').child(categoryId)).$remove(category.$id);
       },
       updateCategory: function(categoryOld, categoryNew){
       		categoryOld.$save(categoryNew);
       }
     } 
});
