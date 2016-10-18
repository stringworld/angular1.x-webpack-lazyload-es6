function get_label_width($$dom){
    var content_list_label=$($$dom); //页面的所有的父元素的个数
    var content_list_label_width=content_list_label.eq(0).outerWidth(true)|0;//总宽度
    var content_list_label_arr=[];	//页面所有子元素的宽度

    // console.log(content_list_label.length)
    for(var k=0;k<content_list_label.length;k++){
        var content_list_label_span=content_list_label.eq(k).children();	//获取当前元素的所有子元素
        var tempWidth=[];
        for(var i=0;i<content_list_label_span.length;i++){
            tempWidth.push(content_list_label_span.eq(i).outerWidth(true)|0);
        }
        content_list_label_arr.push(tempWidth);
    }

    show_label_width(content_list_label_arr,content_list_label_width);

    function show_label_width(content_list_label_arr,content_list_label_width){
        for(var key in content_list_label_arr){
            var maxWidth=0;     //初始值，当前子元素的第一个span的宽度
            for(var key_ in content_list_label_arr[key]){
                maxWidth+=content_list_label_arr[key][key_];
                if(maxWidth>content_list_label_width){
                    maxValue(content_list_label_arr,maxWidth,key,key_,content_list_label_width);
                    maxWidth=0;
                }
            }
        }
        function maxValue(content_list_label_arr,maxWidth,key,key_,maxNum){
            var redundant=maxWidth-maxNum; //多余的
            var result=content_list_label_arr[key][key_]-redundant-30;   //临界值 - 多余的 = maxNum
            // console.log(maxWidth,key,key_,redundant,content_list_label_arr[key][key_])
            content_list_label.eq(key).find('span').eq(key_).css('max-width',(result)+'px');//添加样式
        }
    }
}

function GetUrlValue(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
}


var browser = {
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') == -1
        };
    } (),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


/*方法三：  不能去重hash对象  //25ms */
// Array.prototype.unique = function(){
//     var newArr = []; //一个新的临时数组
//     for(var i = 0,len=this.length; i < len; i++){        
//         if (newArr.indexOf(this[i]) == -1){    //如果当前数组的第i已经保存进了临时数组，那么跳过,否则把当前项push到临时数组里面
//             newArr.push(this[i]);
//         }
//     }
//     return newArr;
// }

// window.this_url='http://192.168.0.7/h5';
window.this_url='http://192.168.0.215';
window.this_get_url='http://192.168.0.215:8082';
// window.this_get_url='http://192.168.0.20:8082';

//线上测试 预发布环境
//window.this_url='';
//window.this_get_url=''; //http://p.thedoc.cn

