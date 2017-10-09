'use strict'

app.factory('providerModel', function (FBURL, $firebaseArray, $firebaseObject) {

	var ref = new Firebase(FBURL);
	var providers = $firebaseArray(ref.child("Providers"));

	function Provider(name, phone, location, type){
		this.name = name; 
    this.phone = phone;
    this.type = type;
    this.location = location;
	}

  	return {
       getAllProviders: function(){
          return providers;
       },
       getProviderById: function(providerId){
       		return $firebaseObject(ref.child("Providers").child(providerId));
       },
       createProvider: function(name, phone, location, type){
       		return new Provider(name, phone, location, type);
       },
       registerProvider: function(provider){
       		providers.$add(provider);
       },
       deleteProvider: function(provider, providerId){
       		$firebaseObject(ref.child('Providers').child(providerId)).$remove(provider.$id);
       },
       updateProvider: function(providerOld, providerNew){
       		providerOld.$save(providerNew);
       }
     } 
});
