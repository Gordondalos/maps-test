app.controller('homeController', ['$scope', 'jsonrpc', 'myCitiesFactory', function ($scope, jsonrpc, myCitiesFactory) {

    getCities = function () {
        jsonrpc.request('get_cities', {"key": "7c4073d1-ffd0-4e32-bd56-03829dc67126"})
            .then(function(result) {
                $scope.cities = result.data.result;
                myCitiesFactory.setCities( $scope.cities);
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



}]);