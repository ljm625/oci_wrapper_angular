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
var dataservice_1 = require("../../services/dataservice");
var QueryApi_1 = require("../../services/api/api/QueryApi");
var forms_1 = require("@angular/forms");
var ThresholdDef = (function () {
    function ThresholdDef(query, data_service) {
        this.query = query;
        this.data_service = data_service;
        this.showTable = false;
        this.values = null;
        this.table = {
            column: [],
            data: []
        };
        this.selected = '';
        this.selectorList = ['All'];
        this.selectorId = [99999];
        this.field = [];
        this.field_dependencies = [];
        this.rulesfield = [];
    }
    ThresholdDef.prototype.fieldBuilder = function (rulegroupList) {
        this.rulesfield = [
            { name: 'Name', fieldtype: 'input' },
            { name: 'RuleGroup', fieldtype: 'select', choices: rulegroupList },
            { name: 'Value', fieldtype: 'input' },
        ];
        this.field = [
            { name: 'Name', fieldtype: 'input' },
            { name: 'Description', fieldtype: 'input' },
            { name: 'Value', fieldtype: 'input' },
            { name: 'Rules', fieldtype: 'popup', content: this.rulesfield },
            { name: 'id', fieldtype: 'hidden' }];
        this.field_dependencies = [];
    };
    ThresholdDef.prototype.ngOnInit = function () {
        var _this = this;
        var token = this.data_service.getToken();
        var rulegroupList = [];
        this.query.rulegroupGet().subscribe(function (resp) {
            for (var _i = 0, resp_1 = resp; _i < resp_1.length; _i++) {
                var ds = resp_1[_i];
                rulegroupList.push(ds.Name);
            }
        });
        this.fieldBuilder(rulegroupList);
        this.query.thresholdDefGet().subscribe(function (resp) {
            for (var _i = 0, resp_2 = resp; _i < resp_2.length; _i++) {
                var th = resp_2[_i];
                console.log(th);
                _this.selectorList.push(th.Name);
                _this.selectorId.push(th.id);
                console.log(_this.selectorList);
            }
        });
    };
    ThresholdDef.prototype.modifyEvent = function (id) {
        var column = this.table.column;
        var data = this.table.data[id];
        var modal_col = [];
        for (var _i = 0, _a = this.field; _i < _a.length; _i++) {
            var field = _a[_i];
            modal_col.push(field.name);
        }
        var blankValue = this.data_service.generateBlankValue(this.field);
        for (var _b = 0, column_1 = column; _b < column_1.length; _b++) {
            var col = column_1[_b];
            if (typeof (data[column.indexOf(col)]) === "boolean") {
                blankValue[modal_col.indexOf(col)] = new forms_1.FormControl(data[column.indexOf(col)]);
            }
            else {
                blankValue[modal_col.indexOf(col)] = data[column.indexOf(col)];
            }
        }
        this.values = blankValue;
        console.log(this.values);
        this.modalRef.show();
    };
    ThresholdDef.prototype.onQuery = function () {
        var _this = this;
        // Here we need to query the given threshold def.
        if (this.selected == '') {
            return;
        }
        var index = this.selectorId[this.selectorList.indexOf(this.selected)];
        if (index == 99999) {
            this.data_service.getThresholdDefTable().subscribe(function (resp) {
                console.log(resp);
                _this.showTable = true;
                _this.table = resp;
            });
        }
        else {
            this.data_service.getThresholdDefIdTable(index).subscribe(function (resp) {
                console.log(resp);
                _this.showTable = true;
                _this.table = resp;
            });
        }
    };
    ThresholdDef.prototype.onBlankCreate = function () {
        this.modalRef.show();
        this.values = this.data_service.generateBlankValue(this.field);
    };
    ThresholdDef.prototype.onSubmit = function (data) {
        var _this = this;
        // Starting here, we are going to do the actual work.
        this.data_service.updateThresholdDef(this.data_service.generatePayload(this.field, data)).subscribe(function (resp) {
            console.log(resp);
            _this.onQuery();
        });
    };
    ThresholdDef.prototype.deleteEvent = function (id) {
        this.modalRef.deleteModal(id);
    };
    ThresholdDef.prototype.onDelete = function (id) {
        var _this = this;
        var data = this.table.data[id];
        this.data_service.deleteThresholdDef(data[0]).subscribe(function (data) {
            console.log(data);
            console.log('Deleted');
            _this.table.data = [];
        });
    };
    __decorate([
        core_1.ViewChild('modalBase'), 
        __metadata('design:type', Object)
    ], ThresholdDef.prototype, "modalRef", void 0);
    ThresholdDef = __decorate([
        core_1.Component({
            selector: 'threshold_def',
            styleUrls: ['threshold_def.component.css'],
            templateUrl: 'threshold_def.component.html'
        }), 
        __metadata('design:paramtypes', [QueryApi_1.QueryApi, dataservice_1.DataService])
    ], ThresholdDef);
    return ThresholdDef;
}());
exports.ThresholdDef = ThresholdDef;
//# sourceMappingURL=threshold_def.component.js.map