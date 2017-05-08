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
var selector_1 = require("./selector");
var DataModal = (function () {
    function DataModal(elementRef) {
        this.elementRef = elementRef;
        this.title = 'Default Title';
        this.Name = '';
        this.fields = []; //like some dict inside, for example {type:input,name:blablabla,choices:bla bla bla}
        this.values = null;
        this.valuesChange = new core_1.EventEmitter();
        this.dependencies = [];
        this.submitChange = new core_1.EventEmitter();
        this.deleteConfirm = new core_1.EventEmitter();
        this.origHidden = [];
        this.hiddenList = [];
        this.controllerList = [];
    }
    DataModal.prototype.ngOnChanges = function () {
        console.log(this.values);
        for (var _i = 0, _a = this.controllerList; _i < _a.length; _i++) {
            var controller = _a[_i];
            var index = 0;
            for (var _b = 0, _c = this.fields; _b < _c.length; _b++) {
                var field = _c[_b];
                if (field.name == controller) {
                    break;
                }
                index = index + 1;
            }
            if (this.values.length > index) {
                this.checkControl(controller, this.values[index]);
            }
        }
        // this.delay(10000).then(this.modalRef.hide());
    };
    DataModal.prototype.show = function () {
        var _this = this;
        this.modalRef.show();
        setTimeout(function () {
            console.log('Current Value for the modal:');
            console.log(_this.values);
            if (_this.popupRef != null) {
                _this.popupRef.initPopup();
            }
            if (_this.multiRef != null) {
                _this.multiRef.forEach(function (element) {
                    element.updateSelectList();
                });
            }
        }, 200);
    };
    DataModal.prototype.deleteModal = function (delNum) {
        this.deleteId = delNum;
        this.delmodalRef.show();
    };
    DataModal.prototype.doDelete = function () {
        this.deleteConfirm.emit(this.deleteId);
    };
    DataModal.prototype.initValueList = function (values) {
        var output = [];
        for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.fieldtype == 'multiselect') {
                output.push([]);
            }
            else if (field.fieldtype == 'check') {
                output.push(new forms_1.FormControl(false));
            }
            else {
                output.push('');
            }
        }
        return output;
    };
    DataModal.prototype.ngOnInit = function () {
        if (this.values == null) {
            this.values = [];
            for (var _i = 0, _a = this.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                if (field.fieldtype == 'multiselect') {
                    this.values.push([]);
                }
                else if (field.fieldtype == 'check') {
                    this.values.push(new forms_1.FormControl(false));
                }
                else if (field.fieldtype == 'popup') {
                    this.values.push([]);
                }
                else {
                    this.values.push('');
                }
            }
            this.valuesChange.emit(this.values);
        }
        this.initHiddenList();
    };
    DataModal.prototype.getType = function (input) {
        // console.log(input);
        return input.fieldtype;
    };
    DataModal.prototype.getValues = function () {
        this.submitChange.emit(this.values);
        console.log(this.values);
        // console.log(this.origHidden)
    };
    // for the dependencies, what you need to do is to check the value change and then map it.
    // {name:Type, control=[{'choice:, field}]}
    DataModal.prototype.checkControl = function (name, value) {
        var _this = this;
        if (this.controllerList.indexOf(name) != -1) {
            this.hiddenList = this.origHidden.slice();
            var obj = this.dependencies[this.controllerList.indexOf(name)];
            for (var _i = 0, _a = obj.control; _i < _a.length; _i++) {
                var rule = _a[_i];
                if (rule.choice == value) {
                    for (var _b = 0, _c = rule.field; _b < _c.length; _b++) {
                        var name_1 = _c[_b];
                        var index = this.hiddenList.indexOf(name_1);
                        this.hiddenList.splice(index, 1);
                    }
                }
            }
        }
        setTimeout(function () {
            _this.modalRef.refresh();
        }, 200);
    };
    DataModal.prototype.initHiddenList = function () {
        for (var _i = 0, _a = this.dependencies; _i < _a.length; _i++) {
            var obj = _a[_i];
            this.controllerList.push(obj.name);
            for (var _b = 0, _c = obj.control; _b < _c.length; _b++) {
                var rule = _c[_b];
                for (var _d = 0, _e = rule.field; _d < _e.length; _d++) {
                    var name_2 = _e[_d];
                    if (this.hiddenList.indexOf(name_2) == -1) {
                        this.hiddenList.push(name_2);
                    }
                }
            }
        }
        this.origHidden = this.hiddenList.slice();
    };
    DataModal.prototype.isHidden = function (name) {
        if (this.hiddenList.indexOf(name) != -1) {
            return true;
        }
        else
            return false;
    };
    __decorate([
        core_1.ViewChild('myModal'), 
        __metadata('design:type', Object)
    ], DataModal.prototype, "modalRef", void 0);
    __decorate([
        core_1.ViewChild('deleteModal'), 
        __metadata('design:type', Object)
    ], DataModal.prototype, "delmodalRef", void 0);
    __decorate([
        core_1.ViewChild('popup'), 
        __metadata('design:type', Object)
    ], DataModal.prototype, "popupRef", void 0);
    __decorate([
        core_1.ViewChildren(selector_1.MultiSelect), 
        __metadata('design:type', core_1.QueryList)
    ], DataModal.prototype, "multiRef", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataModal.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataModal.prototype, "Name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataModal.prototype, "fields", void 0);
    __decorate([
        //like some dict inside, for example {type:input,name:blablabla,choices:bla bla bla}
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataModal.prototype, "values", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataModal.prototype, "valuesChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataModal.prototype, "dependencies", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataModal.prototype, "submitChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataModal.prototype, "deleteConfirm", void 0);
    DataModal = __decorate([
        core_1.Component({
            selector: 'ui-modal',
            templateUrl: 'ui.modal.html',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DataModal);
    return DataModal;
}());
exports.DataModal = DataModal;
//# sourceMappingURL=modal.js.map