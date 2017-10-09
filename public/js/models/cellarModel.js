'use strict'

app.factory('cellarModel', function (FBURL, $firebaseArray, $firebaseObject) {

	var ref = new Firebase(FBURL);
	var cellars = $firebaseArray(ref.child("Cellars"));

	function Cellar(name, phone, supervisor, location){
		this.name = name; 
    this.phone = phone;
    this.supervisor = supervisor;
    this.location = location;
	}

  	return {
       getAllCellars: function(){
          return cellars;
       },
       getAllNew: function(){
          return cellars;
       },
       getCellarById: function(cellarId){
       		return $firebaseObject(ref.child("Cellars").child(cellarId));
       },
       createCellar: function(name, phone, supervisor, location){
       		return new Cellar(name, phone, supervisor, location);
       },
       registerCellar: function(cellar){
       		cellars.$add(cellar);
       },
       deleteCellar: function(cellar, cellarId){
       		$firebaseObject(ref.child('Cellars').child(cellarId)).$remove(cellar.$id);
       },
       updateCellar: function(cellarOld, cellarNew){
       		cellarOld.$save(cellarNew);
       }
     } 
});
