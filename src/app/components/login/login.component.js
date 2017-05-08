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
var QueryApi_1 = require("../../services/api/api/QueryApi");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(query, cookie, router) {
        this.query = query;
        this.cookie = cookie;
        this.router = router;
        this.username = '';
        this.password = '';
        this.loginFailed = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.show = function () {
        this.modalRef.show();
    };
    LoginComponent.prototype.validate = function () {
        var _this = this;
        console.log(this.cookie.getAll());
        this.query.login(this.username, this.password).subscribe(function (resp) {
            console.log(resp);
            if (resp === 401) {
                console.log("Login Failed");
            }
            else {
                _this.cookieSave();
                console.log(_this.cookie.getAll());
                _this.router.navigateByUrl('/');
            }
        }, function (err) {
            if (err === 'Unauthorized') {
                console.log("Front End Knew that it is unauthorized");
                _this.loginFailed = true;
                _this.password = '';
            }
        });
    };
    LoginComponent.prototype.cookieSave = function () {
        this.cookie.put('oci_session', btoa(this.username + ':' + this.password));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LoginComponent.prototype, "username", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LoginComponent.prototype, "password", void 0);
    __decorate([
        core_1.ViewChild('myModal'), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "modalRef", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'login.component.html'
        }), 
        __metadata('design:paramtypes', [QueryApi_1.QueryApi, cookies_service_1.CookieService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map