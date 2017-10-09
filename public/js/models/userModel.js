'use strict'

app.factory('UserModel', function (FBURL, $firebaseArray, $firebaseObject) {
	var ref = new Firebase(FBURL);
	var users = $firebaseArray(ref.child("User"));

	function User(user, pass){
		this.user = user;
		this.pass = pass;
	}

  	return {
       getAllUsers: function(){
			return users;
       },
       createUser: function(user, pass){
       		return new User(user, pass);
       },
       registerUser: function(user){
       		users.$add(user);
       }
     } 
});
