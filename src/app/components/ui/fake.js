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
var FakeContent = (function () {
    function FakeContent() {
    }
    FakeContent = __decorate([
        core_1.Directive({
            selector: 'modal-content'
        }), 
        __metadata('design:paramtypes', [])
    ], FakeContent);
    return FakeContent;
}());
exports.FakeContent = FakeContent;
var FakeAction = (function () {
    function FakeAction() {
    }
    FakeAction = __decorate([
        core_1.Directive({
            selector: 'modal-actions'
        }), 
        __metadata('design:paramtypes', [])
    ], FakeAction);
    return FakeAction;
}());
exports.FakeAction = FakeAction;
var FakeAccordition = (function () {
    function FakeAccordition() {
    }
    FakeAccordition = __decorate([
        core_1.Directive({
            selector: 'accordion-title'
        }), 
        __metadata('design:paramtypes', [])
    ], FakeAccordition);
    return FakeAccordition;
}());
exports.FakeAccordition = FakeAccordition;
var FakeAccorditionContent = (function () {
    function FakeAccorditionContent() {
    }
    FakeAccorditionContent = __decorate([
        core_1.Directive({
            selector: 'accordion-content'
        }), 
        __metadata('design:paramtypes', [])
    ], FakeAccorditionContent);
    return FakeAccorditionContent;
}());
exports.FakeAccorditionContent = FakeAccorditionContent;
//# sourceMappingURL=fake.js.map