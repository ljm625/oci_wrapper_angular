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
var router_1 = require("@angular/router");
var DashBoard = (function () {
    function DashBoard(data_service, router) {
        this.data_service = data_service;
        this.router = router;
        this.selected = '';
        this.selectorList = [];
        this.selectorId = [];
        this.showTable = false;
        this.dataComplete = true;
        this.table = {
            column: [],
            data: []
        };
    }
    DashBoard.prototype.ngAfterViewInit = function () {
        var _this = this;
        var token = this.data_service.getToken();
        this.data_service.getRuleGroups().subscribe(function (resp) {
            for (var _i = 0, resp_1 = resp; _i < resp_1.length; _i++) {
                var ds = resp_1[_i];
                console.log(ds);
                _this.selectorList.push(ds.Name);
                _this.selectorId.push(ds.id);
                console.log(_this.selectorList);
            }
        });
    };
    DashBoard.prototype.onQuery = function () {
        var _this = this;
        if (this.selected == '') {
            return;
        }
        var index = this.selected;
        this.dataComplete = false;
        //show sticky
        this.data_service.getReport(index).subscribe(function (resp) {
            console.log(resp);
            _this.showTable = true;
            _this.dataComplete = true;
            _this.table = resp;
        });
    };
    DashBoard = __decorate([
        core_1.Component({
            selector: 'dash-board',
            providers: [dataservice_1.DataService, QueryApi_1.QueryApi],
            styleUrls: ['dashboard.component.css'],
            templateUrl: 'dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [dataservice_1.DataService, router_1.Router])
    ], DashBoard);
    return DashBoard;
}());
exports.DashBoard = DashBoard;
//# sourceMappingURL=dashboard.component.js.map