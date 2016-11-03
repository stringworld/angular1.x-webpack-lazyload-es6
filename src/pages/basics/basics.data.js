import angular from 'angular';
export default angular.module('basics.factory', [])
    .factory('basicData', ['$http', '$q', '$rootScope', function($http, $q, $rootScope) {
        return {
            selectData: {
                type: '',
                list: []
            },
            doctorInfoList: [],
            doctorTypeList: [],
            hospitalNameList: [],
            departmentList: [],
            schoolList: [],
            locationList: [],
            levelList: [],
            propList: []
        }
    }])
    .name