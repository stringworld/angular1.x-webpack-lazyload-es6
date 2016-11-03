import picKer from '../../components/picKer/picKer';
import $ from './js/Zepto';
import './js/sm.js';
// import './js/sm-city-picker.js'
import './css/public.css';
import './css/sui.css';

import basicsService from './basics.service';
import basicsData from './basics.data';
import store from 'storejs';
import $bridge from '../../common/js/bridge.js';

export default angular.module('basics', [picKer, basicsService, basicsData])
    .controller('basics', ['getDataAPI', 'basicData', '$scope', '$q', function(getDataAPI, basicData, $scope, $q) {
        $scope.dataPool = basicData;

        $q.all([getDataAPI.getDoctorInfo({ userData: document.cookie }), getDataAPI.getDoctorTypes()]).then(values => {
                basicData.doctorInfoList = values[0].data;
                basicData.doctorTypeList = values[1].data;

            }).catch(reason => {
                console.log(reason)
            })
            //我是
        $scope.myIdentity = function() {
            $('.hide-item-1').show();
            console.log(basicData.doctorTypeList)
            basicData.selectData.type = 'oneCols';
            basicData.selectData.list = basicData.doctorTypeList.doctorTypeList.map((item) => ({
                id: item.doctorTypeId,
                name: item.doctorTypeName,
                disable: item.disable
            }))

            //     $scope.dataPool.selectData.list = [
            //         { id: 1, name: 'test 1', disable: false ,list:[]},
            //         { id: 2, name: 'test 2', disable: false ,list:[]},
            //         { id: 3, name: 'test 3', disable: false ,list:[]},
            //         { id: 4, name: 'test 4', disable: false ,list:[]},
            //     ]

            console.log(basicData.selectData)
            $scope.getchange = function(id, name) {
                getDataAPI.getRegisterDict({ doctorTypeId: id }).then(({ data }) => {
                    console.log(data)
                    basicData.propList = data.hospitalAttributeList; //属性 
                    basicData.levelList = data.hospitalLevelList; //  级别
                    basicData.locationList = data.provinceListWithCity; //地区
                    basicData.specialtyList = data.specialtyList; //  擅长
                })
                getDataAPI.doctorTypeId = id;
                console.log(id, name)
            }
            console.log(1)
        }

        $scope.closePicker = function() {
            basicData.selectData.list = [];
            $('.hide-item-1').hide();
            console.log($scope.dataPool.selectData)
        }

        //选择医院地区
        $scope.hosRegion = function() {
            basicData.selectData.type = 'twoCols';
            basicData.selectData.list = basicData.doctorTypeList.doctorTypeList.map((item) => ({
                id: item.doctorTypeId,
                name: item.doctorTypeName,
                disable: item.disable
            }))
            $scope.getchange = function(id, name) {

            }
        }

        $scope.isShowHos = false;
        $scope.isShowAcademy = false;
        $scope.isHideBasic = true;

        //医院地址
        $scope.showHos = function() {
            $scope.isShowHos = true;
            $scope.isHideBasic = false;
            $bridge.callMobile('changeTitle', { params: '医院' });
            $bridge.callMobile('isHospital');
        }

        // 毕业院校
        $scope.showAcademy = function() {
            $bridge.callMobile('changeTitle', { params: '毕业院校' });
            $bridge.callMobile('isHospital');
            $scope.isShowAcademy = true;
            $scope.isHideBasic = false;
        }

        //医院返回
        $bridge.RegisterFunction("hospitalBack");
        window.hospitalBack = $scope.hospitalBack = function() {
            setTimeout(function() {
                $scope.isShowHos = false;
                $scope.isShowAcademy = false;
                $scope.isHideBasic = true;
                $scope.$apply();
            }, 100)
        }
    }])
    .name;