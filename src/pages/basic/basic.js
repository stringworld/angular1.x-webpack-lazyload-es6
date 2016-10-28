import picKer from '../../components/picKer/picKer';

import basicService from './basic.service';
import store from 'storejs';
import $bridge from '../../common/js/bridge.js';

export default angular.module('basic', [picKer, basicService])
    .controller('basic', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        $bridge.callMobile('changeTitle', { params: '擅长' })

        getDataAPI.getDoctorTypes().then(({ data }) => {
            // $scope.result = data.doctorTypeList.filter((item) => item.disable).map((item) => item.doctorTypeName);
            // console.log($scope.result)
            $scope.mydata = data;
        });

        $scope.isShowHos = false;
        $scope.isHideBasic = true;

        $scope.showHos = function() {
            $scope.isShowHos = true;
            $scope.isHideBasic = false;
        }

        //擅长
        $scope.registerDictDefault = {
            'doctorTypeId': '1'
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

            getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                console.log(data);
                $scope.registerDictData = data;
                // thisJson.specialtyList = data.specialtyList;
            });

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