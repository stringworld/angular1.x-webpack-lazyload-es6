// import picKer from '../../components/picKer/picKer';
import $ from './js/Zepto';
import './js/sm.js';
// import './js/sm-city-picker.js'
import './css/public.css';
import './css/sui.css';

import basicService from './basic.service';
import store from 'storejs';
import $bridge from '../../common/js/bridge.js';

export default angular.module('basic', [basicService])
    .controller('basic', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        $bridge.callMobile('changeTitle', { params: '基本资料' });
        $scope.doctorInFo = {};
        $scope.saveSpecialty = {};
        getDataAPI.getDoctorInfo({ userData: document.cookie }).then(({ data }) => {
            console.log(data)
            console.log(data.doctor[0].specialty.map((item) => item.name).join(','))
            console.log(data.doctor[0].specialty.map((item) => item.id).join(','))
            console.log(data.doctor[0].specialty.map((item) => item.parentId).join(','))

            $scope.saveSpecialty = {
                'classesIds': data.doctor[0].specialty.map((item) => item.id).join(',') || '', //类别id
                'diseaseIds': data.doctor[0].specialty.map((item) => item.parentId).join(',') || '', //慢病id
                'diseaseNames': data.doctor[0].specialty.map((item) => item.name).join(',') || '', //慢病name
                'specialtyList': data.doctor[0].specialty.map((item) => ({
                    name: item.name,
                    id: item.id,
                    parentId: item.parentId
                })) || []
            };
            console.log($scope.saveSpecialty)

            $scope.doctorInFo = {
                realname: data.doctor[0].realname || '',
                doctorType: '', //data.doctor[0].doctorType || ,
                districtName: '',
                hospitalAttributeName: '',
                hospitalName: data.doctor[0].hospitalName || '',
                department: data.doctor[0].department.name || '',
                specialty: data.doctor[0].specialty.map((item) => item.name) || '',
                schoolCityName: '',
                schoolName: data.doctor[0].schoolName || '',

            }
        });

        function getDataStore() {
            $scope.registerDictDefault.doctorTypeId = store.get('doctorTypeId');

            setTimeout(function() {
                $scope.doctorInFo.doctorType = store.get('my-identity-name') || '';
                $scope.doctorInFo.districtName = store.get('hos-region-name') || '';
                $scope.doctorInFo.hospitalAttributeName = store.get('hos-property-name') || '';
                $scope.doctorInFo.hospitalName = store.get('hos-name-name') || '';
                $scope.doctorInFo.department = store.get('hos-department-name') || '';
                // $scope.doctorInFo.specialty = store.get('hos-region-name') || '';
                $scope.doctorInFo.schoolCityName = store.get('academy-region-name') || '';
                $scope.doctorInFo.schoolName = store.get('byschool-name') || '';
                $scope.$apply();
            }, 100)
        }

        getDataAPI.getDoctorTypes().then(({ data }) => {
            // $scope.result = data.doctorTypeList.filter((item) => item.disable).map((item) => item.doctorTypeName);
            console.log(data)
            $scope.mydata = data //[data.doctorTypeList.map((item) => item.doctorTypeName)];
        });


        function checkDoctorType(obj) {
            $('.hide-content').hide();
            if (!obj.doctorType) {
                $.toast('请选择您的角色', 1000);
                return false;
            }
            return true;
        }

        function checkDistrictName(obj) {
            $('.hide-content').hide();
            if (!obj.districtName) {
                $.toast('请选择省市', 1000);
                return false;
            }
            return true;
        }

        function checkAttribute(obj) {
            $('.hide-content').hide();
            if (!obj.hospitalAttributeName) {
                $.toast('请选择医院属性', 1000);
                return false;
            }
            return true;
        }

        function checkHosName(obj) {
            $('.hide-content').hide();
            if (!obj.hospitalName) {
                $.toast('请选择医院名称', 1000);
                return false;
            }
            return true;
        }

        function checkDepartmentName(obj) {
            $('.hide-content').hide();
            if (!obj.departmentName) {
                $.toast('请选择科室', 1000);
                return false;
            }
            return true;
        }

        function checkSchoolCityName(obj) {
            $('.hide-content').hide();
            if (!obj.schoolCityName) {
                $.toast('请选择省市', 1000);
                return false;
            }
            return true;
        }

        function checkSchoolName(obj) {
            $('.hide-content').hide();
            if (!obj.schoolName) {
                $.toast('请选择院校名称', 1000);
                return false;
            }
            return true;
        }

        function isCheck(obj) {
            $('.hide-content').hide();

            // if (!obj.realname) {
            //     $.toast('请输入姓名', 1000);
            //     return false;
            // }
            if (!obj.specialty) {
                $.toast('请选择擅长', 1000);
                return false;
            }
            console.log(obj)
            return true;
        }

        $scope.isShowHos = false;
        $scope.isShowAcademy = false;
        $scope.isHideBasic = true;

        //医院地址
        $scope.showHos = function() {
            $scope.isShowHos = true;
            $scope.isHideBasic = false;
            getDataStore();
            $bridge.callMobile('changeTitle', { params: '医院' });
            $bridge.callMobile('isHospital');
            // $('#hos-region').html($scope.doctorInFo.districtName);
            // $scope.$apply();
        }

        // 毕业院校
        $scope.showAcademy = function() {
            getDataStore();
            $bridge.callMobile('changeTitle', { params: '毕业院校' });
            $bridge.callMobile('isHospital');
            $scope.isShowAcademy = true;
            $scope.isHideBasic = false;
        }

        //医院返回
        $bridge.RegisterFunction("hospitalBack");
        window.hospitalBack = $scope.hospitalBack = function() {
            setTimeout(function() {
                getDataStore();
                $scope.isShowHos = false;
                $scope.isShowAcademy = false;
                $scope.isHideBasic = true;
                $scope.$apply();
            }, 100)
        }

        //院校返回

        // $scope.academyBack = function() {
        //     $scope.isShowAcademy = false;
        //     $scope.isHideBasic = true;
        // }


        //信息保存
        $scope.saveRegisterInfo = function() {
            //院校信息: 登录cookie 科室id 医生类型 医院Id 用户真实姓名 学校id 擅长集合
            $scope.schoolInfoDefault = {
                userData: document.cookie,
                departmentId: 1050, //store.get('ids-2-hos-department') === "" ? store.get('ids-1-hos-department') : store.get('ids-2-hos-department'),
                schoolId: 75,
                realname: 'test', //$scope.doctorInFo.realname,
                specialtyList: '12' //$scope.saveSpecialty.classesIds
            }
            console.log($scope.schoolInfoDefault)
                // alert(document.cookie)
                // store.clear();
            $bridge.callMobile('routerGoToPage', { "saveNextRouter": 'router://Certificate?authText=%E5%85%A8%E7%A7%91%E5%8C%BB%E7%94%9F%E8%AE%A4%E8%AF%81%E7%85%A7%E7%89%87&frontPageUrl=http%3A%2F%2Fupyun.thedoc.cn%2Fcdn%2Fc_home_page%2Fbtn_yihushangmen.png&backPageUrl=http%3A%2F%2Fupyun.thedoc.cn%2Fcdn%2Fc_home_page%2Fimg_shaicha.png' })
                // isCheck($scope.doctorInFo);"nextPageRouter": "router://Certificate?authText=%E5%85%A8%E7%A7%91%E5%8C%BB%E7%94%9F%E8%AE%A4%E8%AF%81%E7%85%A7%E7%89%87&frontPageUrl=http%3A%2F%2Fupyun.thedoc.cn%2Fcdn%2Fc_home_page%2Fbtn_yihushangmen.png&backPageUrl=backPageUrl%3Dhttp%3A%2F%2Fupyun.thedoc.cn%2Fcdn%2Fc_home_page%2Fimg_shaicha.png"

            // getDataAPI.saveRegisterInfo($scope.HospitalDepartment, $scope.registerDictDefault, $scope.schoolInfoDefault).then(({ data }) => {
            //     alert(data.data.nextPageRouter)
            //     console.log(data.data.nextPageRouter)
            //     location.href = 'medipat://medishare/?' + data.data.nextPageRouter;
            //     // window.location.href = data.data.nextPageRouter;
            // });
        }

        //输入名称
        $scope.changeName = function(value) {
            console.log(value)
            $scope.doctorInFo.realname = value;
        }

        //我是
        $scope.myIdentity = function() {
            $('.hide-item-1').show();
            let showTime = setTimeout(function() {
                showMyIdentity($scope.mydata, 'my-identity');
                clearTimeout(showTime)
            }, 200);
        }


        //擅长
        $scope.registerDictDefault = {
            doctorTypeId: store.get('doctorTypeId')
        }


        $scope.registerDict = function(event) {
            event.stopPropagation();
            alert(222)
                // let ischenked = isCheck($scope.doctorInFo);
                // if (ischenked) {

            //android 格式

            //ios 格式
            // var thisJson = {
            //     'classesIds': $scope.saveSpecialty.classesIds || '', //类别id
            //     'diseaseIds': $scope.saveSpecialty.diseaseIds || '', //慢病id
            //     'diseaseNames': $scope.saveSpecialty.diseaseNames || '', //慢病name
            //     'specialtyList': $scope.saveSpecialty.specialtyList || ''
            // };
            alert(JSON.stringify($scope.saveSpecialty))
            $scope.doctorInFo.specialty = thisJson.diseaseNames;
            $bridge.callMobile("speciallyData", $scope.saveSpecialty);
            // }
        }
        $bridge.RegisterFunction("selectdefaultValue");
        window.selectdefaultValue = function(special) {
            alert(JSON.stringify(special))
            alert(special.diseaseNames)
            setTimeout(function() {
                $scope.doctorInFo.specialty = special.diseaseNames;
                let names = $scope.saveSpecialty.diseaseNames.split(',');
                let parentIds = $scope.saveSpecialty.diseaseIds.split(',');
                let specialtyList = $scope.saveSpecialty.classesIds.split(',').map((item, index) => ({
                    name: names[index],
                    parentId: parentIds[index],
                    id: item
                }))
                special.specialtyList = specialtyList
                alert(JSON.stringify(special.specialtyList))
                $scope.$apply();
            }, 100);
            $scope.saveSpecialty = special || {};
        }

        //医院地区
        $scope.hosRegion = function() {
            $('.hide-item-2').show();

            let showTime2 = setTimeout(function() {
                getDataStore();
                let ischenked = checkDoctorType($scope.doctorInFo)
                console.log(ischenked)

                if (ischenked) {
                    getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                        console.log(data)
                        $scope.getRegisterDictData = data;
                        getShowLinkage(data.provinceListWithCity, 'hos-region', 'cityList');
                    });
                    clearTimeout(showTime2)
                }
            }, 200);
        }

        //医院属性
        $scope.hosProperty = function(e) {
            e.preventDefault();
            $('.hide-item-3').show();
            getDataStore();
            let ischenked = checkDistrictName($scope.doctorInFo);
            if (ischenked) {
                getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                    console.log(data)
                    getShowNoLinkage([{
                        value: [
                            data.hospitalLevelList.map(item => item.hospitalLevelName),
                            data.hospitalAttributeList.map(item => item.hospitalAttributeName)
                        ],
                        ids: [
                            data.hospitalLevelList.map(item => item.hospitalLevelId),
                            data.hospitalAttributeList.map(item => item.hospitalAttributeId),
                        ]
                    }], 'hos-property');
                });
            }
        }


        //医院名称
        $scope.hosName = function() {
            // 医院名称参数：医院属性 医院所属城市 医院级别
            $scope.Hospital = {
                hospitalAttributeId: store.get('ids-2-hos-property'), //1,
                hospitalCityId: store.get('ids-2-hos-region'), //75, 
                hospitalLevelId: store.get('ids-1-hos-property') //1, 
            }
            $('.hide-item-3').show();
            getDataStore();
            let ischenked = checkAttribute($scope.doctorInFo);
            if (ischenked) {
                getDataAPI.getDoctorHospital($scope.registerDictDefault, $scope.Hospital).then(({ data }) => {
                    console.log(data)
                    if (data.list[0]) {
                        getShowNoLinkage([{
                            value: [
                                data.list.map(item => item.name || '')
                            ],
                            ids: [
                                data.list.map(item => item.id || '')
                            ]
                        }], 'hos-name');
                    } else {
                        $.toast('所属地区没有符合的医院', 1000);
                    }
                });
            }
        }


        //科室
        $scope.hosDepartment = function() {
            //科室 参数 医院的id
            $scope.HospitalDepartment = {
                hospitalId: 1050 //store.get('ids-1-hos-name') //1050
            }
            getDataStore();
            alert($scope.HospitalDepartment.hospitalId)
            let ischenked = checkHosName($scope.doctorInFo);
            if (ischenked) {
                getDataAPI.getHospitalDepartment($scope.registerDictDefault, $scope.HospitalDepartment).then(({ data }) => {
                    console.log(data);
                    if (data.departmentType === '0') {
                        $('.hide-item-2').show()
                        getShowLinkage(data.departmentList, 'hos-department', 'subDepartmentList');
                    } else {
                        $('.hide-item-3')
                        getShowNoLinkage([{
                            value: [
                                data.departmentList.map(item => item.name || '')
                            ],
                            ids: [
                                data.departmentList.map(item => item.id || '')
                            ]
                        }], 'hos-department');
                    }
                });
            }
        }

        //院校地区
        $scope.academyRegion = function(e) {
            $('.hide-item-2').show();
            e.preventDefault();
            getDataStore();
            let ischenked = checkDoctorType($scope.doctorInFo)
            if (ischenked) {
                getDataAPI.getRegisterDict($scope.registerDictDefault).then(({ data }) => {
                    console.log(data)
                    getShowLinkage(data.provinceListWithCity, 'academy-region', 'cityList');
                });
            }
        }


        //毕业院校
        $scope.graduateSchool = function() {
            $scope.schoolData = {
                cityId: store.get('ids-1-academy-region'), //75,
                provinceId: store.get('ids-2-academy-region'), //2
            }
            $('.hide-item-3').show();
            getDataStore();
            let ischenked = checkSchoolCityName($scope.doctorInFo);
            console.log($scope.schoolData)
            console.log(ischenked)
            if (ischenked) {
                getDataAPI.getSchoolByGeo($scope.schoolData).then(({ data }) => {
                    console.log(data);
                    if (data.list[0]) {
                        getShowNoLinkage([{
                            value: [
                                data.list.map(item => item.name)
                            ],
                            ids: [
                                data.list.map(item => item.id)
                            ]
                        }], 'byschool');
                    } else {
                        $.toast('所属地区没有符合的学校', 1000);
                    }
                });
            }
        }


        // 二级联动
        function getShowLinkage(raw, dom, subList) {
            //$('.hide-content').show();
            var cityList = function(data) {
                if (!data[subList]) return [""];
                return (data[subList].map(d => d.name));
            };

            var getCities = function(d) {
                for (var i = 0; i < raw.length; i++) {
                    if (raw[i].name === d) {
                        console.log(raw[i].id, d)
                        return cityList(raw[i]);
                    }
                }
                return [""];
            };

            var provinces = raw.map(function(d) {
                return d.name;
            });

            var idsList = {};
            var getCodeId = function({ values }) {
                    // return (function(values){
                    var thisIds = raw.filter(function(index) {
                        return index.name === values[0];
                    }).map(function(d) {
                        var aa;
                        aa = d[subList].filter(function(index) {
                            return index.name === values[1];
                        }).map(function(d) {
                            return d.id;
                        });
                        var temp = {
                            first: d.id,
                            two: aa[0]
                        }
                        return temp;
                    });
                    idsList = {
                        value: values,
                        firstId: thisIds[0].first,
                        twoId: thisIds[0].two
                    }
                    store.set('ids-1-' + dom, idsList.firstId);
                    store.set('ids-2-' + dom, idsList.twoId);
                    store.set(dom + '-name', values);
                    console.log(idsList)
                    return thisIds[0].first + ',' + thisIds[0].two;
                    // })
                }
                // console.log(getCodeId)

            //默认值
            var initCities = cityList(raw[0]);
            var currentProvince = provinces[0];

            var t;
            $("#" + dom).picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-left close-' + dom + '">取消</button>\
                <button class="button button-link pull-right conprim-' + dom + '">确定</button>\
                </header>',
                cssClass: "city-picker",
                rotateEffect: false, //为了性能
                onChange: function(picker, values, displayValues) {
                    var newProvince = picker.cols[0].value;
                    var res = getCodeId({ values });
                    if (newProvince !== currentProvince) {
                        // 如果Provinces变化，节流以提高reRender性能
                        clearTimeout(t);

                        t = setTimeout(function() {
                            $(picker.input).attr('temp', res)
                            console.log(values)
                            picker.cols[1].replaceValues(getCities(newProvince));
                            currentProvince = newProvince;
                            picker.updateValue();
                        }, 200);
                        return;
                    }
                },
                onClose: function() {
                    $('.hide-item-2').hide();
                },
                onOpen: function() {
                    $('.hide-item-2').show();
                },
                cols: [{
                        textAlign: 'center',
                        values: provinces,
                        cssClass: "col-province"
                    },
                    {
                        textAlign: 'center',
                        values: initCities,
                        cssClass: "col-city"
                    }
                ]
            });

            $(document).on("click", ".close-" + dom, function() {
                alert('close')
                $('#' + dom).picker('close');
            });

            $(document).on("click", ".conprim-" + dom, function() {
                alert(idsList.value)
                $('#' + dom).picker('close');
            });
            $('#' + dom).unbind('click').picker('open');
            setTimeout(function() {}, 200);
        }

        // 二级无联动
        function getShowNoLinkage(data, dom) {
            var colsData = data[0].value.map((item) => ({
                textAlign: 'center',
                values: item
            }));
            var indexX;
            var indexY;
            var time;
            var idsList;

            function getIds({ values }) {
                if (values.length === 2) {
                    indexX = data[0].ids[0][data[0].value[0].indexOf(values[0])] || "";
                    indexY = data[0].ids[1][data[0].value[1].indexOf(values[1])] || "";
                } else {
                    indexX = data[0].ids[0][data[0].value[0].indexOf(values[0])] || "";
                    indexY = '';
                }
                idsList = values + indexX + indexY;
                store.set('ids-1-' + dom, indexX);
                store.set('ids-2-' + dom, indexY);
                store.set(dom + '-name', values);
                console.log(values.length)
            }

            $("#" + dom).picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-left  close-' + dom + '">取消</button>\
                <button class="button button-link pull-right conprim-' + dom + '">确定</button>\
                </header>',
                toolbar: true,
                onChange: function(picker, values, displayValues) {
                    clearTimeout(time)
                    $(picker.input).attr('ids-1-' + dom, indexX || '');
                    $(picker.input).attr('ids-2-' + dom, indexY || '');
                    time = setTimeout(function() { getIds({ values }); }, 200);
                },
                onClose: function() {
                    $('.hide-item-3').hide();
                },
                onOpen: function() {
                    $('.hide-item-3').show();
                },
                cols: colsData
            });

            $(document).on("click", ".close-" + dom, function() {
                $('#' + dom).picker('close');
            });

            $(document).on("click", ".conprim-" + dom, function() {
                alert(idsList)
                $('#' + dom).picker('close');
            });
            $('#' + dom).unbind('click').picker('open');
            setTimeout(function() {
                // $('#' + dom).unbind('click').picker('open');
            }, 200);

        }

        //我是
        function showMyIdentity(data, dom) {
            var time;
            var indexX;
            var idsList;
            var data = data;


            $scope.result = data.doctorTypeList.map((item) => item.doctorTypeName);
            $scope.resultIds = data.doctorTypeList.map((item) => item.doctorTypeId);

            console.log(data)

            let colsRes = ([{
                textAlign: 'center',
                values: $scope.result
            }])

            function getIds({ values }) {
                if (values.length === 2) {
                    indexX = $scope.resultIds[$scope.result.indexOf(values[0])] || "";
                }
                var actionIndex = $('#' + dom).attr('activeindex');
                if (!data.doctorTypeList[actionIndex].disable) {
                    store("doctorTypeId", data.doctorTypeList[actionIndex].doctorTypeId);
                    // $('#' + dom).picker('close');
                }
                idsList = values + indexX;
                console.log(values.length, indexX, $scope.resultIds)
            }
            $('#' + dom).html(data.doctorTypeList.filter((item) => item.doctorTypeId === store.get('doctorTypeId')).map((item) => item.doctorTypeName)[0]);

            $('#' + dom).picker({
                toolbarTemplate: '<header class="bar bar-nav">' +
                    '<button class="button button-link pull-left close-' + dom + '">取消</button>' +
                    '<button class="button button-link pull-right conprim-' + dom + '">确定</button>\
                     </header>',
                onChange: function(picker, values, displayValues) {
                    store.set(dom + '-name', values[0])
                    clearTimeout(time)
                    $(picker.input).attr('ids-1-' + dom, indexX || '');
                    time = setTimeout(function() { getIds({ values }); }, 200);
                },
                onClose: function() {
                    $('.hide-item-1').hide();
                },
                onOpen: function() {
                    store.clear();
                    $('.hide-item-1').show();
                },
                cols: colsRes
            });

            //我是
            $(document).on("click", ".close-" + dom, function() {
                $('#' + dom).unbind('click').picker('close');
            });

            $(document).on("click", ".conprim-" + dom, function() {
                alert('11')
                var actionIndex = $('#' + dom).attr('activeindex');
                if (!data.doctorTypeList[actionIndex].disable) {
                    store("doctorTypeId", data.doctorTypeList[actionIndex].doctorTypeId);
                    $('#' + dom).unbind('click').picker('close');
                } else {
                    $.toast("暂未开放注册", 1000);
                }
            });

            $(document).on("click", ".picker-selected", function() {
                var zindex = $(this).attr('zindex');
                if (!data.doctorTypeList[zindex].disable) {
                    store("doctorTypeId", data.doctorTypeList[zindex].doctorTypeId);
                    $('#' + dom).unbind('click').picker('close');
                } else {
                    $.toast("暂未开放注册", 1000);
                }
            });
            $('#' + dom).unbind('click').picker('open');
            setTimeout(function() {}, 200);
        }
    }])
    .name;