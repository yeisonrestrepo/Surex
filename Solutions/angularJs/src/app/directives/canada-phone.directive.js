(function () {
    "use strict";
    angular
        .module('surex')
        .directive("canadaPhone", function () {
            return {
                restrict: 'EA',
                require: 'ngModel',
                link: function (scope, element, attributes, ngModel) {

                    let keyPressed;
                    const BACKSPACECODE = 8;

                    document.onkeydown = function(e){
                        keyPressed = e.keyCode;
                        if (ngModel.$viewValue === '' && (keyPressed === 49 || keyPressed === 97)) {
                            e.preventDefault();
                        }
                    }

                    const removeFormat = function (value, isModelValue = false) {
                        const numbersOnly = value.replace(/\D/g, '');
                        if (isModelValue) {
                            if (numbersOnly.length === 10) {
                                return numbersOnly;
                            }
                            return ''
                        }
                        return numbersOnly;
                    }

                    const addFormat = function (value) {
                        if (typeof (value) == typeof (undefined))
                            return value;

                        let numbersOnly = removeFormat(value).substring(0, 10);

                        // Regular expressions to match the number format each stage
                        const areaCodeRegExp = /^(\d{1,3})$/g;
                        const midPhoneRegExp = /^(\d{1,3})(\d{1,3})$/g;
                        const midExpectedRegExp = /^\((\d{1,3})\)(\s)(\d{1,3})-$/g;
                        const phoneRegExp = /^(\d{1,3})(\d{1,3})(\d{1,4})$/g;
                        const phoneExpectedRegExp = /^\((\d{1,3})\)(\s)(\d{1,3})-(\d{1,4})$/g;

                        let parsedValue = '';

                        if(keyPressed === BACKSPACECODE && numbersOnly.length > 0) {
                            parsedValue = value.slice(0, value.length);
                        }else if (numbersOnly.length > 0 && numbersOnly.length <= 3) {
                            parsedValue = numbersOnly.replace(areaCodeRegExp, '($1) ');
                        } else if (numbersOnly.length > 3 && numbersOnly.length <= 6) {
                            const formatted = numbersOnly.replace(midPhoneRegExp, '($1) $2-')
                            if (midExpectedRegExp.test(formatted)) {
                                parsedValue = formatted;
                            } else {
                                parsedValue = numbersOnly
                            }
                        } else if (numbersOnly.length > 6 && numbersOnly.length <= 10) {
                            const formatted = numbersOnly.replace(phoneRegExp, '($1) $2-$3');
                            if (phoneExpectedRegExp.test(formatted)) {
                                parsedValue = formatted;
                            }
                        }
                        
                        return parsedValue;
                    }

                    const parsePhoneValue = function (value) {
                        let viewValue = addFormat(value);
                        ngModel.$viewValue = viewValue;
                        ngModel.$render();

                        // Set validity based on the modelValue
                        const modelValue = removeFormat(viewValue, true);
                        if (modelValue !== '') {
                            ngModel.$setValidity('format', true);
                        } else {
                            ngModel.$setValidity('format', false);
                        }
                        
                        // Return what we want the model value to be
                        return modelValue;
                    }

                    ngModel.$parsers.push(parsePhoneValue);
                }
            };
        });
})();