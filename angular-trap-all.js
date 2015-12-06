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

    return angular.module('gui.trapAll', []).directive('trapAll', [ function () {

        return {
            restrict: 'AE',
            template: '<div ng-transclude></div>',
            transclude: true,
            link: linkFunc
        };
        function linkFunc($scope, $element, $attributes){

                    var focusLeader = document.querySelector('[data-trap = "start"]');
                    var focusTrailer = document.querySelector('[data-trap = "end"]');

                    focusLeader.focus();
                    $element.css('position', 'relative');

                    function tabForwardHandler(e) {
                        var evt = e || window.event;
                        var keyCode = evt.which || evt.keyCode;

                        if(keyCode === 9) { 
                            if(!evt.shiftKey) { // TAB pressed without shift
                                if(evt.preventDefault) {
                                    evt.preventDefault();
                                }
                                else {
                                    evt.returnValue = false;
                                } 

                                focusLeader.focus();
                            }                  
                        }
                    }
                    angular.element(focusTrailer).bind('keydown', tabForwardHandler);

                    function tabBackwardHandler(e) {
                        var evt = e || window.event;
                        var keyCode = evt.which || evt.keyCode;

                        if(keyCode === 9) { 
                            if(evt.shiftKey) { // TAB pressed with shift
                                if(evt.preventDefault) {
                                    evt.preventDefault();
                                }
                                else {
                                    evt.returnValue = false;
                                } 

                                focusTrailer.focus();
                            }                       
                        }
                    }

                    angular.element(focusLeader).bind('keydown', tabBackwardHandler);
        }

    }]);
}));
