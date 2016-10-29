import angular from 'angular';
import $ from './js/Zepto';
import './js/sm.js';
import './js/sm-city-picker.js'
import './js/sm-depat-picker.js'
import './css/public.css';
import './css/sui.css';
// import './css/sm.css';
import store from 'storejs';
export default angular.module("picKer", [])
    .directive('picKer', [function() {
        return {
            restrict: 'AE',
            scope: { classdom: '=', itemlabel: '=', itemvalue: '=', mydata: '=', hosproperty: '=' },
            template: require('./picKer.html'),
            replace: false,
            link: function(scope, element, attrs) {

                setTimeout(function() {
                    // scope.result = scope.mydata.doctorTypeList.map((item) => item.doctorTypeName);
                    // console.log(scope.mydata)
                    // scope.hospitalAttributeList = scope.mydata.hospitalAttributeList.map((item) => item.hospitalAttributeName);
                    // scope.hospitalLevelList = scope.mydata.hospitalLevelList.map((item) => item.hospitalLevelName);
                    scope.temp = scope.mydata.map(item => ({
                        textAlign: 'center',
                        values: item
                    }))
                    console.log([...scope.temp])



                    // $('#' + scope.classdom).html(scope.mydata.doctorTypeList.filter((item) => item.doctorTypeId === store.get('doctorTypeId')).map((item) => item.doctorTypeName)[0]);

                    $('#' + scope.classdom).picker({
                        toolbarTemplate: '<header class="bar bar-nav">' +
                            '<button class="button button-link pull-left  close-picker">取消</button>' +
                            '<button class="button button-link pull-right ' + scope.classdom + '">确定</button>\
                             </header>',
                        cols: scope.temp
                    });

                    //我是
                    // $(document).on("click", ".picker", function() {
                    //     var actionIndex = $('#picker').attr('activeindex');
                    //     if (!scope.mydata.doctorTypeList[actionIndex].disable) {
                    //         store("doctorTypeId", scope.mydata.doctorTypeList[actionIndex].doctorTypeId);
                    //         var pickerToClose = $('.picker-modal.modal-in');
                    //         $.closeModal(pickerToClose);
                    //     } else {
                    //         $.toast("暂未开放注册", 1000);
                    //     }
                    // });
                    // $(document).on("click", ".picker-selected", function() {
                    //     var zindex = $(this).attr('zindex');
                    //     if (!scope.mydata.doctorTypeList[zindex].disable) {
                    //         store("doctorTypeId", scope.mydata.doctorTypeList[zindex].doctorTypeId);
                    //         var pickerToClose = $('.picker-modal.modal-in');
                    //         $.closeModal(pickerToClose);
                    //     } else {
                    //         $.toast("暂未开放注册", 1000);
                    //     }
                    // });
                }, 300);
                $('#city-picker').cityPicker({
                    value: ['北京', '北京市']
                });
                $('#hos-department').departPicker({
                    value: ['北京', '北京市']
                })

                // $("#city-picker").cityPicker({
                //     toolbarTemplate: '<header class="bar bar-nav">\
                //         <button class="button button-link pull-right close-picker">确定</button>\
                //         <h1 class="title">选择地址</h1>\
                //         </header>'
                // });

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