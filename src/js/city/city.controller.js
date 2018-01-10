function City() {
    this.city_name = '';
    this.city_id = '';
    this.lat = '';
    this.lon = '';
    this.districs = [];
}

app.controller('cityController', ['$scope', 'jsonrpc', '$location', '$routeParams', 'myCitiesFactory', function ($scope, jsonrpc, $location, $routeParams, myCitiesFactory) {

    var getCity = function (id) {
        // По хорошему надо бы спросить, но не тут то было - метода нет
        // jsonrpc.request('get_city', {
        //     "key": "7c4073d1-ffd0-4e32-bd56-03829dc67126",
        //     "id": id
        // }).then(function (value) {
        //     console.log(value);
        // }).catch(function (error) {
        //     debugger;
        //     console.log(error);
        // });

        if (myCitiesFactory.cities.length === 0) {
            $location.path('/').replace();
        } else {
            var currentCity = _.find(myCitiesFactory.cities, function (o) {
                return o.city_id === Number(id);
            });
            $scope.city = currentCity;
        }

    };


    $scope.city = new City();
    $scope.name = '';
    $scope.population = '';

    if ($routeParams && $routeParams.id) {
        getCity($routeParams.id);
    }

    $scope.addDistrics = function () {
        $scope.city.districs.push({
            name: $scope.name,
            population: $scope.population
        });
        this.name = '';
        this.population = '';
    };

    $scope.save = function () {

        if ($scope.city && $scope.city.city_id) {
            jsonrpc.request('set_city', {
                "key": "7c4073d1-ffd0-4e32-bd56-03829dc67126",
                "city_id": $scope.city.city_id,
                "name": $scope.city.city_name,
                "lat": $scope.city.lat,
                "lon": $scope.city.lon
            })
                .then(function (value) {
                    console.log(value);
                    $location.path('/').replace();
                })
                .catch(function (error) {
                    debugger;
                    console.log(error);
                });

        } else {
            jsonrpc.request('create_city', {
                "key": "7c4073d1-ffd0-4e32-bd56-03829dc67126",
                "name": $scope.city.city_name,
                "lat": $scope.city.lat,
                "lon": $scope.city.lon
            })
                .then(function (value) {
                    console.log(value);
                    $location.path('/').replace();
                })
                .catch(function (error) {
                    debugger;
                    console.log(error);
                });
        }


    };

    $scope.isDisabled = function () {
        if (!$scope.city.city_name || !$scope.city.lat || !$scope.city.lon) {
            return true;
        }
    };
    $scope.isDelete = function () {
        return $scope.city.city_id > 0;
    };

    $scope.delete = function (index) {
        _.each($scope.city.districs, function (item, i) {
            if (index === i) {
                $scope.city.districs.splice(i, 1);
            }
        })
    };

    $scope.deleteCity = function () {
        if ($scope.city && $scope.city.city_id) {
            jsonrpc.request('delete_city', {
                "key": "7c4073d1-ffd0-4e32-bd56-03829dc67126",
                "city_id": $scope.city.city_id
            })
                .then(function (value) {
                    console.log(value);
                    $location.path('/').replace();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }


}]);