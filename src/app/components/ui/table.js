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
var DataTable = (function () {
    function DataTable() {
        this.table = {};
        this.editable = false;
        this.buttonAction = new core_1.EventEmitter();
        this.deleteAction = new core_1.EventEmitter();
    }
    DataTable.prototype.onQuery = function (i) {
        this.buttonAction.emit(i);
        console.log('Clicked');
        console.log(i);
    };
    DataTable.prototype.onDelete = function (i) {
        this.deleteAction.emit(i);
        console.log('Clicked');
        console.log(i);
    };
    DataTable.prototype.isThreshold = function (i) {
        if (i == 'Good' || i == 'Warn' || i == 'Critical') {
            return true;
        }
        return false;
    };
    DataTable.prototype.isList = function (i) {
        // Fixed a serious bug
        if (i != null && i.constructor == Array) {
            return true;
        }
        else {
            return false;
        }
    };
    DataTable.prototype.fixNumbers = function (i) {
        if (typeof i === 'number' && i % 1 !== 0) {
            return i.toFixed(3);
        }
        return i;
    };
    DataTable.prototype.ngAfterViewInit = function () {
        jQuery(this.tableRef.nativeElement).tablesort();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "table", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTable.prototype, "editable", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "buttonAction", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "deleteAction", void 0);
    __decorate([
        core_1.ViewChild('UITable'), 
        __metadata('design:type', Object)
    ], DataTable.prototype, "tableRef", void 0);
    DataTable = __decorate([
        core_1.Component({
            selector: 'ui-table',
            templateUrl: 'ui.table.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DataTable);
    return DataTable;
}());
exports.DataTable = DataTable;
//# sourceMappingURL=table.js.map