var app = angular.module('basketCheckout', ['ngRoute'])
    .value('productStorage', {
        products: []
    });

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: '/views/product.html',
        controller: 'productCtrl'
    }).
    when('/checkout', {
        templateUrl: '/views/checkout.html',
        controller: 'checkoutCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);

app.controller('productCtrl', function($scope, $http, productStorage) {

    $scope.productStorage = productStorage;
    $scope.totalItems = productStorage.products.length;
    getProducts();

    function getProducts() {
        $http.get('http://localhost:9001/products')
            .then(function(response) {
                $scope.products = response.data;
            });
    }

    $scope.addToCart = function(product) {
        $scope.productStorage.products.push(product);
        product.addedToCart = true;
        $scope.totalItems++;
    }
});

app.controller('checkoutCtrl', function($scope, $http, productStorage) {
    $scope.products = productStorage.products;
});