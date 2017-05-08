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
var MultiSelect = (function () {
    function MultiSelect(elementRef) {
        this.elementRef = elementRef;
        this.choices = [];
        this.selected = [];
        this.result = [];
        // choices=['Test1','test2','test3'];
        this.options = [];
        this.selectedChange = new core_1.EventEmitter();
    }
    MultiSelect.prototype.printOption = function () {
        console.log(this.options);
    };
    MultiSelect.prototype.updateSelectList = function () {
        var _this = this;
        var selected = this.selected;
        jQuery(this.selectRef.nativeElement)
            .dropdown('clear');
        var options = this.selectRef.nativeElement.options;
        for (var i = 0; i < options.length; i++) {
            options[i].selected = selected.indexOf(options[i].value) > -1;
            console.log("Updating select section!");
            console.log(options[i].value);
            console.log(options[i].selected);
        }
        setTimeout(function () {
            _this.selected = selected;
            jQuery(_this.selectRef.nativeElement)
                .dropdown('set selected', selected);
            _this.selectedChange.emit(_this.selected);
        }, 150);
        this.selectedChange.emit(this.selected);
    };
    MultiSelect.prototype.ngAfterViewInit = function () {
        jQuery(this.selectRef.nativeElement)
            .dropdown();
    };
    MultiSelect.prototype.change = function (options) {
        console.log(options);
        this.selected = Array.apply(null, options)
            .filter(function (option) { return option.selected; })
            .map(function (option) { return option.value; });
        console.log(this.selected);
        this.selectedChange.emit(this.selected);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultiSelect.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MultiSelect.prototype, "choices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MultiSelect.prototype, "selected", void 0);
    __decorate([
        core_1.ViewChild('multiselect'), 
        __metadata('design:type', Object)
    ], MultiSelect.prototype, "selectRef", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultiSelect.prototype, "selectedChange", void 0);
    MultiSelect = __decorate([
        core_1.Component({
            selector: 'ui-select',
            templateUrl: 'ui.select.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MultiSelect);
    return MultiSelect;
}());
exports.MultiSelect = MultiSelect;
//# sourceMappingURL=selector.js.map