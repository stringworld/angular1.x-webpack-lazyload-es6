import angular from 'angular'
export default angular.module('page1.service', [])
    .service('page1_API', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
        return {
            get_data: function () {
                var config = { params: { userdata: 'stone' } };
                return $http.get('/getlist/error', config)
            }
        }
    }])
    .name