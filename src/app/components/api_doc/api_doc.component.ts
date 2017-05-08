import {Component} from '@angular/core';

declare var SwaggerUi :any;

@Component({
    selector:'api-doc',
    styleUrls: ['api_doc.component.css'],
    templateUrl: 'api_doc.component.html'
})
export class ApiDoc{
    swaggerObj:any;
    constructor(){
        this.swaggerObj=new SwaggerUi({
            url: "/assets/swagger.json",
            dom_id: "swagger-ui-container",
            supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
            onComplete: function(swaggerApi, swaggerUi){

            },
            onFailure: function(data) {
                console.log("Unable to Load SwaggerUI");
            },
            docExpansion: "none",
            jsonEditor: false,
            defaultModelRendering: 'schema',
            showRequestHeaders: false
        });
        this.swaggerObj.load();
    }
}
