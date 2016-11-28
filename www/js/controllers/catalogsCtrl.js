angular.module('imageID.controllers').controller('CatalogsCtrl', function($scope, $timeout, $state, Restangular, MemoryService) {
	$scope.data = {};
	$scope.data.catalogs = [];
	
	$scope.catalogsPromise = Restangular.all('type/catalog').getList().then(function(posts) {
		$scope.data.catalogs = posts;
	}).catch(function(err) {
		$scope.data.catalogs = [];
	});
	
	
	$scope.open_link = function(event) { 
			var href = event.target.href; 
			var browserRef = window.open(href, '_system', 'location=no,clearsessioncache=no,clearcache=no'); 
			event.preventDefault(); 
	}
	
	$scope.goToDetails = function(v){	
	
		var url = v.file;
		if(ionic.Platform.isAndroid()){
			 var ref = window.open("https://docs.google.com/gview?embedded=true&url=" + encodeURIComponent(v.file) ,  '_blank', 'location=no'); //'location=no,EnableViewPortScale=yes');
				
				//ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
				//ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
				//ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
				//ref.addEventListener('exit', function(event) { alert(event.type); });
		
		} else {
			window.open(v.file, '_blank', 'location=yes');
		}
		// MemoryService.putData("catalog", v);
		// $state.go("app.catalog", { "id" : v.id });
	}
	
	
});
