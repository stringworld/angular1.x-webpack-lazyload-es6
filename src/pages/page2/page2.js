import page2Service from './page2.service';
import $ from './js/Zepto';
import './js/sm.js';
import './css/public.css';
import './css/sui.css';
import './css/sm.css';



export default angular.module('page2', [page2Service])
    // .service('getDataAPI', ['$http', function($http) {
    //     return {
    //         getDoctorTypes: function() {
    //             const config = { params: {} };
    //             return $http.get('http://192.168.10.213:8082/doctor/getDoctorTypes/', config)
    //         }
    //     }
    // }])
    .controller('test2', ['getDataAPI', '$scope', function(getDataAPI, $scope) {
        // getDataAPI.getDoctorTypes().then((data) => {
        //     console.log(data)
        // });
        console.log(getDataAPI.getDoctorTypes().then((response) => {

            console.log(response)

        }))
        setTimeout(function() { console.log($('#picker')) }, 1000)
        $("#picker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-left  close-picker">取消</button>\
              <button class="button button-link pull-right close-picker">确定</button>\
              </header>',
            cols: [{
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }, {
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }]
        });
    }])

.name;