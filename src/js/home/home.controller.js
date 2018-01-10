app.controller('homeController', ['$scope', 'jsonrpc', 'myCitiesFactory', function ($scope, jsonrpc, myCitiesFactory) {

    getCities = function () {
        jsonrpc.request('get_cities', {"key": "7c4073d1-ffd0-4e32-bd56-03829dc67126"})
            .then(function(result) {
                var sortCity = _.sortBy(result.data.result, function (o) {
                    return o.city_name;
                }) ;

                _.each(sortCity, function (item, index) {
                    if (item.districts && item.districts.length > 0) {
                       var sortDistrics =  _.sortBy(item.districts, function (o) {
                            return o.name;
                        }) ;
                       sortCity[index]['districts'] = sortDistrics;
                    }
                });

                $scope.cities = sortCity;
                myCitiesFactory.setCities($scope.cities);
                console.log('cities from factory', myCitiesFactory.cities);
                _.each($scope.cities, function (city) {
                    if(city.city_name === 'test'){
                    }else {
                       addNewMarker(city);
                    }
                })
            })
            .catch(function(error) {
                debugger;
               console.log(error);
            });
    };

    getCities();


    addNewMarker = function(city){

        map.addMarker({
            lat: city.lat,
            lng: city.lon,
            title: city.city_name,
            click: function (e) {
                console.log(e);
                alert('You clicked in this marker'. e.title);
            }
        });
    };

    var map = new GMaps({
        el: '#map',
        lat: 51,
        lng: 5,
        maxZoom: 5
    });

    map.addMarker({
        lat: -12.043333,
        lng: -77.028333,
        title: 'Lima',
        click: function (e) {
            console.log(e);
            alert('You clicked in this marker');
        }
    });


    $scope.sortByPopulation = function () {
        _.each($scope.cities, function (item, index) {
            var count = 0;
            if(item.districts && item.districts.length > 0){
                _.each(item.districts, function (district) {
                    count += Number(district.population);
                });
            }
            $scope.cities[index]['countPopulation'] = count;
        });
        $scope.cities = _.sortBy($scope.cities, function (obj) {
            return obj.countPopulation
        })
    }


}]);