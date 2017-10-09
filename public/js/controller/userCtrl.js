app.controller('userCtrl', function($scope, toastr, $location, $rootScope, UserModel){

	$scope.users = UserModel.getAllUsers();

	$scope.validateUser = function(user){
		
		$rootScope.loggedIn = false;
		if(angular.isDefined(user)){
			for (var i = 0; i<$scope.users.length; i++) {
				if(angular.equals($scope.users[i].name, user.name) && angular.equals($scope.users[i].pwd, user.pwd)){
					$rootScope.User = $scope.users[i];
					$rootScope.loggedIn = $scope.users[i];
					i = $scope.users.length;
				}
			}
		}
		if($rootScope.loggedIn){
			$location.path('dashboard');
			toastr.success('','Bienvenido '+user.name,{ timeOut: 2500, progressBar: true });
		}else{
			$rootScope.loggedIn = false;
			toastr.error('Credenciales Incorrectas!','Intente de nuevo',{ timeOut: 2500, progressBar: true });
		}

	}
	$scope.closeSession = function(){
		toastr.error('','Adios '+$rootScope.User.name,{ timeOut: 2500, progressBar: true });
		delete $rootScope.User;
		delete $rootScope.loggedIn;
		$location.path('/');
	}
	$scope.register = function(user){
		UserModel.registerUser(user);
		toastr.success('User Created!',user.data,{ timeOut: 2500, progressBar: true });
		$location.path('publish');
	}

});
