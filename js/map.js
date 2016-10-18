(function ($) {
    // $.imap = function () {
    //     var imap = this.map = {};
    //     this.get = function (key) {
    //         var val = eval("imap." + key);
    //         return (typeof val === undefined) ? null : val;
    //     };
    //     this.set = function (key, value) {
    //         eval("imap." + key + "=value");
    //     };
    // };
    $.Map = function () {
        this.mapArr = {};
        this.arrlength = 0;

        //假如有重复key，则不存入  
        this.set = function (key, value) {
            if (!this.containsKey(key)) {
                this.mapArr[key] = value;
                this.arrlength = this.arrlength + 1;
            }
        }
        this.get = function (key) {
            return this.mapArr[key];
        }

        //传入的参数必须为Map结构  
        this.putAll = function (map) {
            if (Map.isMap(map)) {
                var innermap = this;
                map.each(function (key, value) {
                    innermap.set(key, value);
                })
            } else {
                alert("传入的非Map结构");
            }
        }
        this.remove = function (key) {
            delete this.mapArr[key];
            this.arrlength = this.arrlength - 1;
        }
        this.size = function () {
            return this.arrlength;
        }

        //判断是否包含key  
        this.containsKey = function (key) {
            return (key in this.mapArr);
        }
        //判断是否包含value  
        this.containsValue = function (value) {
            for (var p in this.mapArr) {
                if (this.mapArr[p] == value) {
                    return true;
                }
            }
            return false;
        }
        //得到所有key 返回数组  
        this.keys = function () {
            var keysArr = [];
            for (var p in this.mapArr) {
                keysArr[keysArr.length] = p;
            }
            return keysArr;
        }
        //得到所有value 返回数组  
        this.values = function () {
            var valuesArr = [];
            for (var p in this.mapArr) {
                valuesArr[valuesArr.length] = this.mapArr[p];
            }
            return valuesArr;
        }

        this.isEmpty = function () {
            if (this.size() == 0) {
                return false;
            }
            return true;
        }
        this.clear = function () {
            this.mapArr = {};
            this.arrlength = 0;
        }
        //循环  
        this.each = function (callback) {
            for (var p in this.mapArr) {
                callback(p, this.mapArr[p]);
            }
        }
    }
    //判断是否是map对象  
    $.Map.isMap = function (map) {
        return (map instanceof Map);
    }
})(window);

