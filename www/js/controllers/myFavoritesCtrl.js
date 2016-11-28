angular.module('imageID.controllers').controller('MyFavoritesCtrl', function($scope, $timeout, $state, AuthService, Restangular, MemoryService, WORDPRESS_REST_BASE_URL, $http, $ionicLoading) {
	$scope.data = {};
	$scope.data.user = AuthService.getUser().data;
	
	console.log("Favorites");
	
	$ionicLoading.show({
      template: 'Loading...'
    });
	
	$http.get(WORDPRESS_REST_BASE_URL + '/user/' + $scope.data.user.id + '/profile').then(function(posts) {
		console.log("Liked " ,posts.data.liked);
		$scope.data.fav_products = posts.data.liked;
				
		$timeout(function(){
			$scope.$apply();
		});
		$ionicLoading.hide();
	}).catch(function(err) {
		$scope.data.fav_products = [];
		$scope.data.res_products = [];
		$ionicLoading.hide();
	});
	
	$scope.openProduct = function(p){
		MemoryService.putData("product", p);
		$state.go("app.product", { "id" : p.id });
	}
});