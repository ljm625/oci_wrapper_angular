"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var Popup = (function () {
    function Popup(elementRef) {
        this.elementRef = elementRef;
        this.dataList = [];
        this.fields = []; //like some dict inside, for example {type:input,name:blablabla,choices:bla bla bla}
        this.values = null;
        this.dataListChange = new core_1.EventEmitter();
        this.fieldName = [];
    }
    Popup.prototype.initValues = function () {
        this.values = [];
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.fieldtype == 'multiselect') {
                this.values.push([]);
            }
            else if (field.fieldtype == 'check') {
                this.values.push(new forms_1.FormControl(false));
            }
            else if (field.fieldtype == 'select') {
                this.values.push(field.choices[0]);
            }
            else {
                this.values.push('');
            }
            this.fieldName.push(field.name);
        }
    };
    Popup.prototype.ngOnInit = function () {
        if (this.values == null) {
            this.initValues();
        }
    };
    Popup.prototype.initPopup = function () {
        jQuery(this.elementRef.nativeElement).find('#Test').popup({
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        jQuery(this.elementRef.nativeElement).find('.blue.label').popup({
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        this.initValues();
    };
    Popup.prototype.ngAfterViewInit = function () {
        jQuery(this.elementRef.nativeElement).find('#Test').popup({
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        jQuery(this.elementRef.nativeElement).find('.blue.label').popup({
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
    };
    Popup.prototype.hide = function () {
        jQuery(this.elementRef.nativeElement).find('#Test').popup('hide');
    };
    Popup.prototype.show = function () {
        jQuery(this.elementRef.nativeElement).find('#Test').popup('show');
    };
    Popup.prototype.addElement = function () {
        var _this = this;
        var tempList = {};
        for (var _i = 0, _a = this.fieldName; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            tempList[name_1] = this.values[this.fieldName.indexOf(name_1)];
        }
        this.dataList.push(tempList);
        this.initValues();
        this.hide();
        setTimeout(function () {
            jQuery(_this.elementRef.nativeElement).find('.blue.label').popup({
                inline: true,
                hoverable: true,
                position: 'bottom left',
                delay: {
                    show: 300,
                    hide: 800
                }
            });
        }, 100);
        this.onChange();
    };
    Popup.prototype.delElement = function (i) {
        this.dataList.splice(i, 1);
    };
    Popup.prototype.getType = function (input) {
        // console.log(input);
        return input.fieldtype;
    };
    Popup.prototype.modElement = function (i) {
        console.log(this.dataList[i]);
    };
    Popup.prototype.onChange = function () {
        this.dataListChange.emit(this.dataList);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Popup.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Popup.prototype, "dataList", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Popup.prototype, "fields", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Popup.prototype, "dataListChange", void 0);
    Popup = __decorate([
        core_1.Component({
            selector: 'ui-popup',
            templateUrl: 'ui.popup.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Popup);
    return Popup;
}());
exports.Popup = Popup;
//# sourceMappingURL=popup.js.map