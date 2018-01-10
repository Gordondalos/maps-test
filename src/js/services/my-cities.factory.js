app.factory('myCitiesFactory', function () {

    var service = {};
    service.setCities  = function (cities) {
        service.cities = cities;
    };
    service.cities = [];

    return service;
});