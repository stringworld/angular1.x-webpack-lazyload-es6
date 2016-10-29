import picKer from '../../components/picKer/picKer';
import $ from './js/Zepto';
import './js/sm.js';
import './js/sm-city-picker.js'
import './css/public.css';
import './css/sui.css';

import basicService from './basic.service';
import store from 'storejs';
import $bridge from '../../common/js/bridge.js';

export default angular.module('basic', [picKer, basicService])
    .controller('basic', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        $bridge.callMobile('changeTitle', { params: '擅长' })

        getDataAPI.getDoctorTypes().then(({ data }) => {
            // $scope.result = data.doctorTypeList.filter((item) => item.disable).map((item) => item.doctorTypeName);
            // console.log($scope.result)
            $scope.mydata = [data.doctorTypeList.map((item) => item.doctorTypeName)];
        });

        $scope.isShowHos = false;
        $scope.isHideBasic = true;

        $scope.showHos = function() {
            // $scope.isShowHos = true;
            // $scope.isHideBasic = false;
        }

        //擅长
        $scope.registerDictDefault = {
            'doctorTypeId': '2'
        }
        $scope.newtag = {};
        $scope.registerDict = function(event) {
            event.stopPropagation();
            // alert(JSON.parse($scope.newtag.classesIds))
            // $scope.registerDictDefault.doctorTypeId = store.get('doctorTypeId') || '';
            // alert(store.get('doctorTypeId'));

            var thisJson = {
                'classesIds': $scope.newtag.classesIds || '', //类别id
                'diseaseIds': $scope.newtag.diseaseIds || '', //慢病id
                'diseaseNames': $scope.newtag.diseaseNames || '' //慢病name
            };

            var saveStatus = thisJson;
            $bridge.callMobile("speciallyData", saveStatus);
            // console.log($bridge)
        }
        $bridge.RegisterFunction("selectdefaultValue");
        window.selectdefaultValue = function(newtag) {
            alert(JSON.stringify(newtag))
            alert(newtag.classesIds)
            $scope.newtag = newtag;

        }

        //医院属性
        getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
            $scope.hospro = [
                data.hospitalLevelList.map(item => item.hospitalLevelName),
                data.hospitalAttributeList.map(item => item.hospitalAttributeName)
            ]
        });

        $scope.Hospital = {
            hospitalAttributeId: 1,
            hospitalCityId: 75,
            hospitalLevelId: 1
        }

        //医院名称
        getDataAPI.getDoctorHospital($scope.registerDictDefault, $scope.Hospital).then(({ data }) => {
            console.log(data);
            $scope.hosname = [
                data.list.map(item => item.name)
            ]
        });

        $scope.HospitalDepartment = {
            hospitalId: 1050
        }

        //科室
        getDataAPI.getHospitalDepartment($scope.registerDictDefault, $scope.HospitalDepartment).then(({ data }) => {
            console.log(data);
            // $scope.hosdepartment = [
            //     data.departmentList.map(item => item.name),
            //     // data.departmentList.map(item => item.name)
            // ]
        });

        $scope.schoolData = {
            cityId: 75,
            provinceId: 2
        }

        //毕业院校
        getDataAPI.getSchoolByGeo($scope.schoolData).then(({ data }) => {
            console.log(data);
            $scope.schooldata = [
                data.list.map(item => item.name)
            ]
        });
    }])
    .controller('basicHos', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        getDataAPI.getRegisterDict({ 'doctorTypeId': store.get('doctorTypeId') }).then(({ data }) => {
            console.log(data);
            $scope.registerDictDataT = data;
        });

        $scope.isHideHos = function() {
            alert('ddd')
            $scope.isShowHos = false;
            // $scope.isHideBasic = true;
        }

        $scope.openHos = function() {
            alert('ddd0000')
            setTimeout(function() {
                // $('#city-picker').cityPicker({
                //     value: ['北京', '北京市']
                // });
            }, 100)

            // var pickerToOpen = $('.picker-modal.modal-in');
            // $.closeModal(pickerToOpen);
        }
        setTimeout(function() {
                $('#citpicker').picker({
                    toolbarTemplate: '<header class="bar bar-nav">' +
                        '<button class="button button-link pull-left  close-picker">取消</button>' +
                        '<button class="button button-link pull-right citpicker">确定</button>\
                             </header>',
                    cols: [{
                        textAlign: 'center',
                        values: [1, 3, 5]
                    }]
                })
            }, 100)
            // console.log($scope.registerDictDataT)

        $scope.isShowHos = $scope.isShowHos;
        // $(document).on("click", ".confirm-picker", function() {
        //     var res = [];
        //     var actionIndex = $('.picker-selected').forEach(i => (
        //         res.push($(i).attr('zindex'))
        //     ));
        //     var tt1 = $('.picker-selected').eq(0).attr('zindex');
        //     var tt2 = $('.picker-selected').eq(1).attr('zindex');
        //     store("hospitalAttributeId", $scope.registerDictDataT.hospitalAttributeList[tt1].hospitalAttributeId);
        //     store("hospitalLevelId", $scope.registerDictDataT.hospitalLevelList[tt2].hospitalLevelId);
        //     var pickerToClose = $('.picker-modal.modal-in');
        //     $.closeModal(pickerToClose);
        //     // actionIndex.forEach(i => console.log($(i).attr('zindex')))
        //     console.log(tt1, tt2)
        //         // if (!scope.mydata.doctorTypeList[actionIndex].disable) {
        //         //     store("doctorTypeId", scope.mydata.doctorTypeList[actionIndex].doctorTypeId);
        //         //     var pickerToClose = $('.picker-modal.modal-in');
        //         //     $.closeModal(pickerToClose);
        //         // } else {}
        //     $.toast("暂未开放注册", 1000);
        // });
        // $(document).on("click", ".picker-selected", function() {
        //     var zindex = $(this).attr('zindex');
        //     // if (!scope.mydata.doctorTypeList[zindex].disable) {
        //     store("hospitalAttributeId", $scope.registerDictDataT.hospitalAttributeList[zindex].hospitalAttributeId);
        //     var pickerToClose = $('.picker-modal.modal-in');
        //     $.closeModal(pickerToClose);
        //     alert(zindex)
        //         // } else {}
        //     $.toast("暂未开放注册", 1000);
        // });

    }])

.name;