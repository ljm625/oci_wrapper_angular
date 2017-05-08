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
var Threshold = (function () {
    function Threshold(query, data_service) {
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
    }
    Threshold.prototype.fieldBuilder = function (threshold, datasource) {
        this.field = [
            { name: 'Name', fieldtype: 'input' },
            { name: 'Description', fieldtype: 'input' },
            { name: 'ErrorOperator', fieldtype: 'select', choices: ['>', '<', '=', '>=', '<=', '<>', 'in', 'equal', 'contain', 'exclude', 'unequal', 'regex'] },
            { name: 'ErrorThreshold', fieldtype: 'select', choices: threshold },
            { name: 'ErrorDataSource', fieldtype: 'select', choices: datasource },
            { name: 'WarnOperator', fieldtype: 'select', choices: ['>', '<', '=', '>=', '<=', '<>', 'in', 'equal', 'contain', 'exclude', 'unequal', 'regex'] },
            { name: 'WarnThreshold', fieldtype: 'select', choices: threshold },
            { name: 'WarnDataSource', fieldtype: 'select', choices: datasource },
            { name: 'id', fieldtype: 'hidden' }];
        this.field_dependencies = [];
    };
    Threshold.prototype.ngOnInit = function () {
        var _this = this;
        var token = this.data_service.getToken();
        var thresholdList = [];
        var datasourceList = [];
        this.query.thresholdDefGet().subscribe(function (resp) {
            for (var _i = 0, resp_1 = resp; _i < resp_1.length; _i++) {
                var td = resp_1[_i];
                thresholdList.push(td.Name);
            }
        });
        this.query.datasourceGet().subscribe(function (resp) {
            for (var _i = 0, resp_2 = resp; _i < resp_2.length; _i++) {
                var ds = resp_2[_i];
                datasourceList.push(ds.Name);
            }
        });
        this.fieldBuilder(thresholdList, datasourceList);
        this.query.thresholdGet().subscribe(function (resp) {
            for (var _i = 0, resp_3 = resp; _i < resp_3.length; _i++) {
                var ds = resp_3[_i];
                console.log(ds);
                _this.selectorList.push(ds.Name);
                _this.selectorId.push(ds.id);
                console.log(_this.selectorList);
            }
        });
    };
    Threshold.prototype.modifyEvent = function (id) {
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
    Threshold.prototype.onQuery = function () {
        var _this = this;
        // Here we need to query the given datasource.
        if (this.selected == '') {
            return;
        }
        var index = this.selectorId[this.selectorList.indexOf(this.selected)];
        if (index == 99999) {
            this.data_service.getThresholdTable().subscribe(function (resp) {
                console.log(resp);
                _this.showTable = true;
                _this.table = resp;
            });
        }
        else {
            this.data_service.getThresholdIdTable(index).subscribe(function (resp) {
                console.log(resp);
                _this.showTable = true;
                _this.table = resp;
            });
        }
    };
    Threshold.prototype.onBlankCreate = function () {
        this.modalRef.show();
        this.values = this.data_service.generateBlankValue(this.field);
    };
    Threshold.prototype.onSubmit = function (data) {
        var _this = this;
        // Starting here, we are going to do the actual work.
        this.data_service.updateThreshold(this.data_service.generatePayload(this.field, data)).subscribe(function (resp) {
            console.log(resp);
            _this.onQuery();
        });
    };
    Threshold.prototype.deleteEvent = function (id) {
        this.modalRef.deleteModal(id);
    };
    Threshold.prototype.onDelete = function (id) {
        var _this = this;
        var data = this.table.data[id];
        this.data_service.deleteThreshold(data[0]).subscribe(function (data) {
            console.log(data);
            console.log('Deleted');
            _this.table.data = [];
        });
    };
    __decorate([
        core_1.ViewChild('modalBase'), 
        __metadata('design:type', Object)
    ], Threshold.prototype, "modalRef", void 0);
    Threshold = __decorate([
        core_1.Component({
            selector: 'threshold',
            styleUrls: ['threshold.component.css'],
            templateUrl: 'threshold.component.html'
        }), 
        __metadata('design:paramtypes', [QueryApi_1.QueryApi, dataservice_1.DataService])
    ], Threshold);
    return Threshold;
}());
exports.Threshold = Threshold;
//# sourceMappingURL=threshold.component.js.map