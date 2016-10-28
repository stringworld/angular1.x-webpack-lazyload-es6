import angular from 'angular';
import $ from './js/Zepto';
import './js/sm.js';
import './js/sm-city-picker.js'
import './css/public.css';
import './css/sui.css';
// import './css/sm.css';
import store from 'storejs';
export default angular.module("picKer", [])
    .directive('picKer', [function() {
        return {
            restrict: 'AE',
            scope: { classdom: '=', itemlabel: '=', itemvalue: '=', mydata: '=' },
            template: require('./picKer.html'),
            replace: false,
            link: function(scope, element, attrs) {

                setTimeout(function() {
                    scope.result = scope.mydata.doctorTypeList.map((item) => item.doctorTypeName);
                    console.log(scope.mydata)
                        // scope.hospitalAttributeList = scope.mydata.hospitalAttributeList.map((item) => item.hospitalAttributeName);
                        // scope.hospitalLevelList = scope.mydata.hospitalLevelList.map((item) => item.hospitalLevelName);



                    // $('#' + scope.classdom).html(scope.mydata.doctorTypeList.filter((item) => item.doctorTypeId === store.get('doctorTypeId')).map((item) => item.doctorTypeName)[0]);
                    console.log(scope.mydata);

                    $('#' + scope.classdom).picker({
                        toolbarTemplate: '<header class="bar bar-nav">\
                                    <button class="button button-link pull-left  close-picker">取消</button>\
                                    <button class="button button-link pull-right confirm-picker">确定</button>\
                                    </header>',
                        cols: [{
                            textAlign: 'center',
                            values: scope.result
                        }]
                    });
                    $(document).on("click", ".picker-selected", function() {
                        var zindex = $(this).attr('zindex');
                        if (!scope.mydata.doctorTypeList[zindex].disable) {
                            // store("hospitalAttributeId", $scope.registerDictDataT.hospitalAttributeList[zindex].hospitalAttributeId);
                            var pickerToClose = $('.picker-modal.modal-in');
                            $.closeModal(pickerToClose);
                            alert(zindex)
                        } else {
                            $.toast("暂未开放注册", 1000);
                        }
                    });
                }, 1000);
                $("#city-picker").cityPicker({
                    toolbarTemplate: '<header class="bar bar-nav">\
                        <button class="button button-link pull-right close-picker">确定</button>\
                        <h1 class="title">选择地址</h1>\
                        </header>'
                });

                $("#city-hos").cityPicker({
                    toolbarTemplate: '<header class="bar bar-nav">\
                        <button class="button button-link pull-right close-picker">确定</button>\
                        <h1 class="title">选择地址</h1>\
                        </header>'
                });
                $(".show-toast").click(function() {
                    $.toast("操作成功", 1000);
                });
            }
        };
    }])
    .name;