import angular from 'angular';
import $$ from 'jquery';
import $ from './js/Zepto';
import './js/sm.js';
// import './js/sm-city-picker.js'
// import './js/sm-depat-picker.js'
import './css/public.css';
import './css/sui.css';
// import './css/sm.css';
import store from 'storejs';
export default angular.module("picKer", [])
    .directive('picKer', ['$compile', function($compile) {

        return {
            restrict: 'AE',
            scope: { showdata: '=', getchangedata: '&', closepicker: '&' },
            template: require('./picKer.html'),
            replace: false,
            link: function(scope, element, attrs) {
                scope.$watch('showdata.list', function() {
                    if (scope.showdata.list.length) {

                        if (scope.showdata.type === 'oneCols') {
                            scope.temp = ([{
                                textAlign: 'center',
                                values: scope.showdata.list.map((item) => item.name) || ''
                            }])
                        }

                        console.log(scope.temp)
                        var selectValue = '';
                        var $element = $(element[0]);
                        var date = new Date;
                        var hash = (date.getTime() + '').slice(3, 10);
                        window.confirm = {};
                        window.confirm[hash] = scope.confirm = function() {

                            scope.getchangedata({
                                id: scope.showdata.list.filter((item) => item.name === selectValue[0]).map((item) => item.id)[0],
                                name: selectValue[0]
                            })
                            scope.closepicker();
                            $element.picker('close');
                        }

                        var template = `<header class="bar bar-nav">
                                <button class="button button-link pull-left  close-picker">取消</button>
                                <button class="button button-link pull-right" onclick="confirm[${hash}]()">确定</button>
                                </header>`;

                        $element.picker({
                            toolbarTemplate: template,
                            onChange: function(picker, values, displayValues) {
                                selectValue = values;
                            },
                            onOpen: function() {},
                            onClose: function() {
                                scope.closepicker();
                                $element.picker('close');
                                console.log(scope.showdata)
                            },
                            cols: scope.temp
                        });

                        $element.picker('open');

                        setTimeout(function() {}, 200)
                    } else {
                        console.log('false')
                    }

                })
            }
        };
    }])
    .name;