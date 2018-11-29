angular.module('shop', [])
    .controller("MainCtrl", [
        '$scope', '$http',
        function($scope, $http) {
            console.log("In AngularJS");
            $scope.products = [];
            $scope.productsTemp = [];
            $scope.addProduct = function() {
                console.log("Adding Product");
                var newProduct = {
                    productName: $scope.productname,
                    price: $scope.price,
                    imageURL: $scope.pictureURL,
                    orders: 0,
                };
                $http.post('/products', newProduct).success(function(data) {
                    $scope.products.push(data);
                });
                $scope.productname = '';
                $scope.price = '';
                $scope.pictureURL = '';
                $scope.formContent = '';
            };
            $scope.incrementOrders = function(product) {
                $http.put('/products/' + product._id + '/order')
                    .success(function(data) {
                        console.log("order worked!");
                        console.log(product);
                        product.orders += 1;
                    });
            };
            $scope.getAll = function() {
                console.log("Getting products...");
                return $http.get('/products').success(function(data) {
                    angular.copy(data, $scope.products);
                    console.log($scope.products);
                });
            };
            $scope.delete = function(product) {
                $http.delete('/products/' + product._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
            $scope.check = function(data) {
                $scope.productsTemp = [];
                console.log("Check bought items");
                for (var i in data) {
                    if (data[i].SELECTED == 'Y') {
                        console.log(data[i]);
                        $scope.productsTemp.push(data[i]);
                    }
                }
                console.log("Before increment Orders");
                for (var i in $scope.productsTemp) {
                    console.log($scope.productsTemp[i]);
                    $scope.incrementOrders($scope.productsTemp[i]);
                }
            };
            $scope.getAll();

        }
    ]);
