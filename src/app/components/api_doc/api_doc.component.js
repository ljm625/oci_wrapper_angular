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
var ApiDoc = (function () {
    function ApiDoc() {
        this.swaggerObj = new SwaggerUi({
            url: "/assets/swagger.json",
            dom_id: "swagger-ui-container",
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            onComplete: function (swaggerApi, swaggerUi) {
            },
            onFailure: function (data) {
                console.log("Unable to Load SwaggerUI");
            },
            docExpansion: "none",
            jsonEditor: false,
            defaultModelRendering: 'schema',
            showRequestHeaders: false
        });
        this.swaggerObj.load();
    }
    ApiDoc = __decorate([
        core_1.Component({
            selector: 'api-doc',
            styleUrls: ['api_doc.component.css'],
            templateUrl: 'api_doc.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ApiDoc);
    return ApiDoc;
}());
exports.ApiDoc = ApiDoc;
//# sourceMappingURL=api_doc.component.js.map