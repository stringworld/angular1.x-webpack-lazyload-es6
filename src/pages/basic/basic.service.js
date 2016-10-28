import angular from 'angular'
export default angular.module('basic.service', [])
    .service('getDataAPI', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        var tempIp = 'http://192.168.10.15:8082';
        return {
            getDoctorTypes: function() {
                var config = { params: {} };
                return $http.get(tempIp + '/doctor/getDoctorTypes/', config).then(({ data }) => { return data || {} });
            },
            getRegisterDict: function({ doctorTypeId }) {
                var config = { params: { doctorTypeId } };
                return $http.get(tempIp + '/doctor/getRegisterDict/', config).then(({ data }) => { return data || {} });
            }
        }
    }])
    .name