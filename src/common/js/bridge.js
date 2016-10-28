(function( window) {
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

var and = browser.versions.android;
var ios = browser.versions.ios;




var win = window;
var ua = win.navigator.userAgent;
var JS_BRIDGE_PROTOCOL_SCHEMA = "rainbow";
var increase = 1;
var RainbowBridge = win.RainbowBridge || (win.RainbowBridge = {});

var ExposeMethod = win.ExposeMethod = {
    callMethod: function (clazz, method, param, callback) {
        var port = PrivateMethod.generatePort();
        if (typeof callback !== 'function') {
            callback = null;
        }
        PrivateMethod.registerCallback(port, callback);
        PrivateMethod.callNativeMethod(clazz, port, method, param);
    }

};

var PrivateMethod = {
    callbacks: {},
    registerCallback: function (port, callback) {
        if (callback) {
            PrivateMethod.callbacks[port] = callback;
        }
    },
    getCallback: function (port) {
        var call = {};
        if (PrivateMethod.callbacks[port]) {
            call.callback = PrivateMethod.callbacks[port];
        } else {
            call.callback = null;
        }
        return call;
    },
    unRegisterCallback: function (port) {
        if (PrivateMethod.callbacks[port]) {
            delete PrivateMethod.callbacks[port];
        }
    },
    onNativeComplete: function (port, result) {
        var resultJson = PrivateMethod.str2Json(result);
        var callback = PrivateMethod.getCallback(port).callback;
        PrivateMethod.unRegisterCallback(port);
        if (callback) {
            //CALLBACK
            callback && callback(resultJson);
        }
    },
    generatePort: function () {
        return Math.floor(Math.random() * (1 << 50)) + '' + increase++;
    },
    str2Json: function (str) {
        if (str && typeof str === 'string') {
            try {
                return JSON.parse(str);
            } catch (e) {
                return {
                    status: {
                        code: 1,
                        msg: 'params parse error!'
                    }
                };
            }
        } else {
            return str || {};
        }
    },
    json2Str: function (param) {
        if (param && typeof param === 'object') {
            return JSON.stringify(param);
        } else {
            return param || '';
        }
    },
    callNativeMethod: function (clazz, port, method, param) {
        if (PrivateMethod.isAndroid()) {
            var jsonStr = PrivateMethod.json2Str(param);
            var uri = JS_BRIDGE_PROTOCOL_SCHEMA + "://" + clazz + ":" + port + "/" + method + "?" + jsonStr;
            win.prompt(uri, "");
        }
    },
    isAndroid: function () {
        var tmp = ua.toLowerCase();
        var android = tmp.indexOf("android") > -1;
        return !!android;
    },
    isIos: function () {
        var tmp = ua.toLowerCase();
        var ios = tmp.indexOf("iphone") > -1;
        return !!ios;
    },
    extend: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
};
PrivateMethod.extend(RainbowBridge, ExposeMethod);

function connectWebViewJavascriptBridge(callback, androidWay) {
    if (ios) {      
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge)
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        else {
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)


        }
    }
    else {
        androidWay();
    }
}

function RegisterFunction(functionName) {
    connectWebViewJavascriptBridge(
        function (bridge) {
            bridge.registerHandler(functionName, function (data, responseCallback) {
                eval(functionName + "(" + data + ")")
                responseCallback(true)

            })
        },

        function () {
            ExposeMethod[functionName] = function (port, result) {
                var result = JSON.stringify(result);
                eval(functionName + "(" + result + ")")
            }
            PrivateMethod.extend(RainbowBridge, ExposeMethod);
            console.log(RainbowBridge)
        }
    )
}

function callMobile(functionName, params) {
    connectWebViewJavascriptBridge(
        function (bridge) {
            bridge.callHandler(functionName, params, function (response) { })
        },
        function () {
            RainbowBridge.callMethod('JsInvokeJavaScope', functionName, params, function () { });
        }
    )
}

var $bridge={
    RegisterFunction:function(functionName){
        RegisterFunction(functionName);
       
    },
    callMobile:function(functionName, params){
        callMobile(functionName, params);
    }
}


if ( typeof module === "object" && module && typeof module.exports === "object" ) {
  // Expose  as module.exports in loaders that implement the Node
  // module pattern (including browserify). Do not create the global, since
  // the user will be storing it themselves locally, and globals are frowned
  // upon in the Node module world.
  module.exports = $bridge;
} else {
  // Register as a named AMD module, since  can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase is used because AMD module names are
  // derived from file names, and is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants

  if ( typeof define === "function" && define.amd ) {
    define(function () { return $bridge; } );
  }
}

// If there is a window object, that at least has a document property,

if ( typeof window === "object" && typeof window.document === "object" ) {
  window.$bridge = window.$bridge = $bridge;
}

})( window );




