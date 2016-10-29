import angular from 'angular'
export default angular.module('basic.service', [])
    .service('getDataAPI', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        var tempIp = 'http://192.168.10.213:8082';
        return {
            getDoctorTypes: function() {
                var config = { params: {} };
                return $http.get(tempIp + '/doctor/getDoctorTypes/', config).then(({ data }) => { return data || {} });
            },
            getRegisterDict: function({ doctorTypeId }) {
                var config = { params: { doctorTypeId } };
                return $http.get(tempIp + '/doctor/getRegisterDict/', config).then(({ data }) => { return data || {} });
            },
            getDoctorHospital: function({ doctorTypeId }, { hospitalAttributeId, hospitalCityId, hospitalLevelId }) {
                var config = { params: { doctorTypeId, hospitalAttributeId, hospitalCityId, hospitalLevelId } };
                return $http.get(tempIp + '/doctor/getDoctorHospitalByCityLevelAttribute/', config).then(({ data }) => { return data || {} });
            },
            getHospitalDepartment: function({ doctorTypeId }, { hospitalId }) {
                var config = { params: { doctorTypeId, hospitalId } };
                return $http.get(tempIp + '/doctor/getHospitalDepartment/', config).then(({ data }) => { return data || {} });
            },
            getSchoolByGeo: function({ cityId , provinceId }) {
                var config = { params: { cityId, provinceId } };
                return $http.get(tempIp + '/doctor/getSchoolByGeo/', config).then(({ data }) => { return data || {} });
            }
        }
    }])
    .name