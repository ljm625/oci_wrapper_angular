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
var QueryApi_1 = require("./api/api/QueryApi");
var AddApi_1 = require("./api/api/AddApi");
var ModifyApi_1 = require("./api/api/ModifyApi");
var DeleteApi_1 = require("./api/api/DeleteApi");
var forms_1 = require("@angular/forms");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var router_1 = require("@angular/router");
var DataService = (function () {
    // So basically, what this service is doing is it try to simplify the stuffs you need to do in frontend.
    function DataService(query, add, del, modify, cookie, router) {
        this.query = query;
        this.add = add;
        this.del = del;
        this.modify = modify;
        this.cookie = cookie;
        this.router = router;
    }
    // The first part is to generate a table for the data.
    DataService.prototype.generateTable = function (data) {
        var table = { column: [], data: [] };
        var nameList = this.generateName(data);
        table.column = nameList;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            var dataList = [];
            for (var _a = 0, nameList_1 = nameList; _a < nameList_1.length; _a++) {
                var name_1 = nameList_1[_a];
                if (obj.hasOwnProperty(name_1)) {
                    dataList.push(obj[name_1]);
                }
                else {
                    dataList.push('');
                }
            }
            table.data.push(dataList);
        }
        return table;
    };
    DataService.prototype.getToken = function () {
        var result = this.cookie.get('oci_session');
        if (result == undefined) {
            this.router.navigateByUrl('/login');
        }
        else {
            return result;
        }
    };
    DataService.prototype.getReport = function (name) {
        var _this = this;
        var body = { Name: name };
        return this.query.reportPost(body).map(function (data) {
            return _this.generateReportTable(data);
        });
    };
    DataService.prototype.generateReportTable = function (data) {
        var table = { column: [], data: [] };
        var nameList = [];
        for (var name in data[0]) {
            // if(typeof(data[0][name])=="object"){
            //     nameList.push(name+'.'+'error');
            //     nameList.push(name+'.'+'warn');
            // }
            // else{
            nameList.push(name);
        }
        if (nameList.indexOf('Name') != -1) {
            nameList[nameList.indexOf('Name')] = nameList[0];
            nameList[0] = 'Name';
        }
        table.column = nameList;
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var obj = data_2[_i];
            var tmpdata = [];
            for (var _a = 0, nameList_2 = nameList; _a < nameList_2.length; _a++) {
                var name_2 = nameList_2[_a];
                // if(name.indexOf('.')==-1){
                //     tmpdata.push(obj[name])
                // }
                // else{
                //     tmpdata.push(obj[name.split('.')[0]][name.split('.')[1]]);
                // }
                if (typeof obj[name_2] === 'object' && obj[name_2] != null) {
                    console.log(obj[name_2]);
                    console.log(typeof obj[name_2]);
                    if (obj[name_2]['warn'] == false && obj[name_2]['error'] == false) {
                        tmpdata.push('Good');
                    }
                    else if (obj[name_2]['warn'] == true && obj[name_2]['error'] == false) {
                        tmpdata.push('Warn');
                    }
                    else if (obj[name_2]['error'] == true) {
                        tmpdata.push('Critical');
                    }
                    else {
                        tmpdata.push(obj[name_2]);
                    }
                }
                else {
                    tmpdata.push(obj[name_2]);
                }
            }
            table.data.push(tmpdata);
        }
        return table;
    };
    DataService.prototype.generateName = function (data) {
        var nameList = [];
        for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
            var obj = data_3[_i];
            for (var name in obj) {
                if (nameList.indexOf(name) == -1 && name != '_id' && name != 'self') {
                    nameList.push(name);
                }
            }
        }
        if (nameList.indexOf('Name') != -1 && nameList.indexOf('id') != -1) {
            nameList[nameList.indexOf('Name')] = nameList[1];
            nameList[1] = 'Name';
            nameList[nameList.indexOf('id')] = nameList[0];
            nameList[0] = 'id';
        }
        else if (nameList.indexOf('Name') != -1) {
            nameList[nameList.indexOf('Name')] = nameList[0];
            nameList[0] = 'Name';
        }
        return nameList;
    };
    DataService.prototype.getDatasourceTable = function () {
        var _this = this;
        return this.query.datasourceGet().map(function (data) { return _this.generateTable(data); });
    };
    DataService.prototype.getDatasourceIdTable = function (id) {
        var _this = this;
        return this.query.datasourceIdGet(id).map(function (data) {
            return _this.generateTable([data]);
        });
    };
    DataService.prototype.getThresholdDefTable = function () {
        var _this = this;
        return this.query.thresholdDefGet().map(function (data) { return _this.generateTable(data); });
    };
    DataService.prototype.getThresholdDefIdTable = function (id) {
        var _this = this;
        return this.query.thresholdDefIdGet(id).map(function (data) {
            return _this.generateTable([data]);
        });
    };
    DataService.prototype.getThresholdTable = function () {
        var _this = this;
        return this.query.thresholdGet().map(function (data) { return _this.generateTable(data); });
    };
    DataService.prototype.getThresholdIdTable = function (id) {
        var _this = this;
        return this.query.thresholdIdGet(id).map(function (data) {
            return _this.generateTable([data]);
        });
    };
    DataService.prototype.getRulesetTable = function () {
        var _this = this;
        return this.query.rulesetGet().map(function (data) {
            return _this.generateTable(data);
        });
    };
    DataService.prototype.getRulegroupTable = function () {
        var _this = this;
        return this.query.rulegroupGet().map(function (data) {
            return _this.generateTable(data);
        });
    };
    DataService.prototype.getRulesetIdTable = function (id) {
        var _this = this;
        return this.query.rulesetIdGet(id).map(function (data) {
            return _this.generateTable([data]);
        });
    };
    DataService.prototype.getRulegroupIdTable = function (id) {
        var _this = this;
        return this.query.rulegroupIdGet(id).map(function (data) {
            return _this.generateTable([data]);
        });
    };
    DataService.prototype.parseInfo = function () {
    };
    DataService.prototype.queryData = function () {
        return this.query.datasourceGet();
    };
    DataService.prototype.getRuleGroups = function () {
        return this.query.rulegroupGet();
    };
    DataService.prototype.getDataSources = function () {
        return this.query.datasourceGet();
    };
    DataService.prototype.generateBlankValue = function (fields) {
        var values = [];
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            if (field.fieldtype == 'multiselect') {
                values.push([]);
            }
            else if (field.fieldtype == 'select') {
                values.push(field.choices[0]);
            }
            else if (field.fieldtype == 'check') {
                values.push(new forms_1.FormControl(false));
            }
            else if (field.fieldtype == 'popup') {
                values.push([]);
            }
            else {
                values.push('');
            }
        }
        console.log(values);
        return values;
    };
    DataService.prototype.generatePayload = function (fields, data) {
        var payload = {};
        var index = 0;
        for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
            var field = fields_2[_i];
            if (field.name.indexOf('.') != -1) {
                var nameList = field.name.split('.');
                if (payload[nameList[0]] == undefined) {
                    payload[nameList[0]] = {};
                }
                if (field.fieldtype == 'check') {
                    payload[nameList[0]][nameList[1]] = data[index].value;
                }
                else {
                    payload[nameList[0]][nameList[1]] = data[index];
                }
            }
            else if (field.fieldtype == 'check') {
                payload[field.name] = data[index].value;
            }
            else {
                if (data[index] !== '' && data[index] !== []) {
                    payload[field.name] = data[index];
                }
            }
            index = index + 1;
        }
        console.log(payload);
        return payload;
    };
    DataService.prototype.updateDatasource = function (payload) {
        if (payload['Filter']['Value'] == '') {
            delete payload['Filter'];
        }
        if (typeof (payload['id']) === 'number') {
            var id = payload['id'];
            delete payload['id'];
            return this.modify.datasourceIdPost(id, payload);
        }
        else {
            delete payload['id'];
            return this.add.datasourcePut(payload);
        }
    };
    DataService.prototype.updateThresholdDef = function (payload) {
        if (typeof (payload['id']) === 'number') {
            var id = payload['id'];
            delete payload['id'];
            return this.modify.thresholdDefIdPost(id, payload);
        }
        else {
            delete payload['id'];
            return this.add.thresholdDefPut(payload);
        }
    };
    DataService.prototype.updateThreshold = function (payload) {
        if (typeof (payload['id']) === 'number') {
            var id = payload['id'];
            delete payload['id'];
            return this.modify.thresholdIdPost(id, payload);
        }
        else {
            delete payload['id'];
            return this.add.thresholdPut(payload);
        }
    };
    DataService.prototype.updateRuleset = function (payload) {
        if (typeof (payload['id']) === 'number') {
            var id = payload['id'];
            delete payload['id'];
            return this.modify.rulesetIdPost(id, payload);
        }
        else {
            delete payload['id'];
            return this.add.rulesetPut(payload);
        }
    };
    DataService.prototype.updateRulegroup = function (payload) {
        if (typeof (payload['id']) === 'number') {
            var id = payload['id'];
            delete payload['id'];
            return this.modify.rulegroupIdPost(id, payload);
        }
        else {
            delete payload['id'];
            return this.add.rulegroupPut(payload);
        }
    };
    DataService.prototype.deleteDatasource = function (id) {
        return this.del.datasourceIdDelete(id);
    };
    DataService.prototype.deleteThreshold = function (id) {
        return this.del.thresholdIdDelete(id);
    };
    DataService.prototype.deleteThresholdDef = function (id) {
        return this.del.thresholdDefIdDelete(id);
    };
    DataService.prototype.deleteRuleset = function (id) {
        return this.del.rulesetIdDelete(id);
    };
    DataService.prototype.deleteRulegroup = function (id) {
        return this.del.rulegroupIdDelete(id);
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [QueryApi_1.QueryApi, AddApi_1.AddApi, DeleteApi_1.DeleteApi, ModifyApi_1.ModifyApi, cookies_service_1.CookieService, router_1.Router])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=dataservice.js.map