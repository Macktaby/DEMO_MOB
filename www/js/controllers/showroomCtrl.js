angular.module('imageID.controllers').controller('ShowroomCtrl', function($scope, $timeout, Restangular, $stateParams, MemoryService, $state) {
	$scope.data = {};
	$scope.title = "Showroom";
	
	$scope.data.showroom  = MemoryService.getData("showroom");
	console.log($scope.data.showroom);
	
	$scope.showroomPromise = Restangular.all("showroom/" + $stateParams.id + "/products").getList().then(function(posts) {
		//console.log(posts);
		$scope.data.products = posts;
		$scope.data.showrooms = [];
		$scope.data.brands = [];
		var vendorIDs = [];
		var showroomIDs = [];
		for(var i = 0; i < $scope.data.products.length; i++){
			$scope.data.products[i].brandID = $scope.data.products[i].brand.ID;
			if(vendorIDs.indexOf($scope.data.products[i].brand.ID) < 0){
				vendorIDs.push($scope.data.products[i].brand.ID);
				$scope.data.brands.push($scope.data.products[i].brand);
			}
			
			$scope.data.products[i].showroomID = $scope.data.products[i].showroom.ID;
			if(showroomIDs.indexOf($scope.data.products[i].showroom.ID) < 0){
				showroomIDs.push($scope.data.products[i].showroom.ID)
				$scope.data.showrooms.push($scope.data.products[i].showroom);
			}
		}
		
		jQuery('.sort-holder').openClose({
			hideOnClickOutside: true,
			activeClass: 'active',
			opener: '.opener',
			slider: '.slide',
			animSpeed: 200,
			effect: 'slide'
		});
	}).catch(function(err) {
		$scope.data.showroom = [];
	});
	
	$scope.goToLocation = function(s) {
        window.open("http://www.google.com/maps/place/" + s.location.lat + "," + s.location.lng, '_system');
    }
	
	$scope.openProduct = function(p){
		$state.go("app.product", { "id" : p.id });
	}
	
	$scope.setBrandFilter = function(t){
		$scope.brandFilter = t;
		$("#productsArea").trigger("click");
	}
	
	$scope.setShowroomFilter = function(t){
		$scope.showroomFilter = t;
		$("#productsArea").trigger("click");
	}
});