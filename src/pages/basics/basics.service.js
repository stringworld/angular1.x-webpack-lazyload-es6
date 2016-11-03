import angular from 'angular';
export default angular.module('basics.service', [])
    .service('getDataAPI', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        var tempIp = 'http://192.168.10.213:8082';
        return {
            doctorTypeId: '',
            departmentId: '',
            hospitalId: '',
            realname: '',
            schoolId: '',
            specialtyList: '',
            getDoctorInfo: function({ userData }) {
                var config = { params: { userData } };
                return $http.get(tempIp + '/doctor/doctorInfo/', config).then(({ data }) => { return data || {} });
            },
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
            getSchoolByGeo: function({ cityId, provinceId }) {
                var config = { params: { cityId, provinceId } };
                return $http.get(tempIp + '/doctor/getSchoolByGeo/', config).then(({ data }) => { return data || {} });
            },
            saveRegisterInfo: function({ hospitalId }, { doctorTypeId }, { departmentId, realname, schoolId, specialtyList, userData }) {
                return $http({
                    method: "POST",
                    data: { hospitalId, doctorTypeId, departmentId, realname, schoolId, specialtyList, userData },
                    url: tempIp + '/doctor/saveRegisterInfo/',
                    async: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }).then((data) => { return data || {} });
            }
        }
    }])
    .name