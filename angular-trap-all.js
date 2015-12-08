(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'module', 'angular' ], function (module, angular) {
            module.exports = factory(angular);
        });
    } else if (typeof module === 'object') {
        module.exports = factory(require('angular'));
    } else {
        if (!root.gui) {
            root.gui = {};
        }

        root.gui.trapAll = factory(root.angular);
    }
}(this, function (angular) {
    'use strict';

    return angular.module('gui.trapAll', []).directive('trapAll',trapAll);

    trapAll.$inject = ['$timeout']

    function trapAll($timeout) {

        return {
            restrict: 'AE',
            link: {
                pre: angular.noop,
                post: linkFunc
            }
        };

        function linkFunc($scope, $element, $attributes){

            var elem = $element[0];           
            var focusStart = elem.querySelector('[data-trap = "start"]');
            var focusEnd = elem.querySelector('[data-trap = "end"]');

             // $timeout(function() {
             //    $element.focus();
             // }, 0, true);

            angular.element(focusEnd).bind('keydown', tabHandler);
            angular.element(focusStart).bind('keydown', tabHandler);

            function tabHandler(e) {

                var evt = e || window.event;
                var keyCode = evt.which || evt.keyCode;

                var dataTrapValue = evt.currentTarget.attributes['data-trap'].value;

                if(keyCode === 9) { 

                    if(dataTrapValue === "end") {
                        if(!evt.shiftKey) { // TAB pressed without shift

                            if(evt.preventDefault) {
                                evt.preventDefault();
                            }
                            else {
                                evt.returnValue = false;
                            }                     
                            focusStart.focus();
                        }  
                    } else if (dataTrapValue === "start") {

                        if(evt.shiftKey) { // TAB pressed with shift
                            if(evt.preventDefault) {
                                evt.preventDefault();
                            } else {
                                evt.returnValue = false;
                            }
                            focusEnd.focus();
                        }  
                    }
                }                   
            }
            
        }

    };
}));
