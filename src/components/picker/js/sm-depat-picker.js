/*!
 * =====================================================
 * SUI Mobile - http://m.sui.taobao.org/
 *
 * =====================================================
 */
// jshint ignore: start
+ function(Zepto) {

    Zepto.ajax({
        type: 'get',
        url: 'http://192.168.10.213:8082/doctor/getHospitalDepartment/',
        data: { doctorTypeId: 2, hospitalId: 1050 },
        async: false,
        success: function({ data }) {
            console.log(data)
            if (data.departmentType) {
                Zepto.smConfig.rawCitiesData = data.departmentList;
            }
        }
    })

    "use strict";
    var format = function(data) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            if (d.name === "请选择") continue;
            result.push(d.name);
        }
        if (result.length) return result;
        return [""];
    };

    var subDepartmentList = function(data) {
        if (!data.subDepartmentList) return [""];
        return format(data.subDepartmentList);
    };

    var getCities = function(d) {
        for (var i = 0; i < raw.length; i++) {
            if (raw[i].name === d) return subDepartmentList(raw[i]);
        }
        return [""];
    };

    var getDistricts = function(p, c) {
        for (var i = 0; i < raw.length; i++) {
            if (raw[i].name === p) {
                for (var j = 0; j < raw[i].subDepartmentList.length; j++) {
                    if (raw[i].subDepartmentList[j].name === c) {
                        return subDepartmentList(raw[i].subDepartmentList[j]);
                    }
                }
            }
        }
        return [""];
    };

    var raw = Zepto.smConfig.rawCitiesData;
    var provinces = raw.map(function(d) {
        return d.name;
    });
    var initCities = subDepartmentList(raw[0]);
    var initDistricts = [""];

    var currentProvince = provinces[0];
    var currentCity = initCities[0];
    var currentDistrict = initDistricts[0];

    var t;
    var defaults = {

        cssClass: "hos-department",
        rotateEffect: false, //为了性能

        onChange: function(picker, values, displayValues) {
            var newProvince = picker.cols[0].value;
            var newCity;
            if (newProvince !== currentProvince) {
                // 如果Province变化，节流以提高reRender性能
                clearTimeout(t);

                t = setTimeout(function() {
                    var newCities = getCities(newProvince);
                    newCity = newCities[0];
                    var newDistricts = getDistricts(newProvince, newCity);
                    picker.cols[1].replaceValues(newCities);
                    currentProvince = newProvince;
                    currentCity = newCity;
                    picker.updateValue();
                }, 200);
                return;
            }
            // Zepto(this).getCode({ values });
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
    };

    Zepto.fn.departPicker = function(params) {
        return this.each(function() {
            if (!this) return;
            var p = Zepto.extend(defaults, params);
            //计算value
            if (p.value) {
                Zepto(this).val(p.value.join(' '));
            } else {
                var val = Zepto(this).val();
                val && (p.value = val.split(' '));
            }

            if (p.value) {
                if (p.value[0]) {
                    currentProvince = p.value[0];
                    p.cols[1].values = getCities(p.value[0]);
                }
            }
            Zepto(this).picker(p);
        });
    };
    // Zepto.fn.getCode = function({ values }) {
    //     // return (function(values){
    //     var mm = raw.filter(function(index) {
    //         return index.name === values[0];
    //     }).map(function(d) {
    //         var aa = d.subDepartmentList.filter(function(index) {
    //             return index.name === values[1];
    //         }).map(function(d) {
    //             return d.id;
    //         });
    //         var temp = {
    //             first: d.id,
    //             two: aa[0]
    //         }
    //         return temp;
    //     });
    //     var tem = {
    //         res: values + mm[0].first + mm[0].two
    //     }
    //     console.log(tem)
    // }
}(Zepto);