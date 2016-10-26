import angular from 'angular'
export default angular.module('page2.service', [])
    .service('getDataAPI', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        return {
            getDoctorTypes() {
                const config = { params: {} };
                return $http.get('http://192.168.10.213:8082/doctor/getDoctorTypes/', config).then(({ data }) => {
                    console.log(data)
                    return data && data[0] || {};
                });
            }
        }
        // return {
        //     getDoctorTypes: function() {
        //         var tempIp = 'http://192.168.10.213:8082'
        //         var config = { params: {} };
        //         return $http.get('http://192.168.10.213:8082/doctor/getDoctorTypes/', config) //.then(({ data }) => { return data || {} })
        //     }
        // }
    }])
    .name