/**
 * OCI Wrapper API
 * Make it possible to query, modify and delete rules and rulegroups
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/Rx');
var globals = require('../../../config.global');
/* tslint:disable:no-unused-variable member-ordering */
'use strict';
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var QueryApi = (function () {
    function QueryApi(http, basePath, cookie) {
        this.http = http;
        this.cookie = cookie;
        this.basePath = globals.OCI_URL + '/api/v1';
        this.defaultHeaders = new http_1.Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        if (basePath) {
            this.basePath = basePath;
        }
    }
    /**
     *
     */
    QueryApi.prototype.login = function (username, password, extraHttpRequestParams) {
        var path = this.basePath + '/login';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = new http_1.Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        });
        headerParams.append("Authorization", "Basic " + btoa(username + ":" + password));
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            console.log(response.status);
            if (response.status === 204) {
                return undefined;
            }
            else if (response.status === 401) {
                return 401;
            }
            else {
                return response.json();
            }
        }).catch(function (err) {
            if (err.status === 401) {
                console.log('Unauthorized');
                return Observable_1.Observable.throw('Unauthorized');
            }
        });
    };
    QueryApi.prototype.headerParser = function (header) {
        if (header.get('Authorization') != undefined) {
            header.set('Authorization', "Basic " + this.cookie.get('oci_session'));
            return header;
        }
        else {
            header.append('Authorization', "Basic " + this.cookie.get('oci_session'));
            return header;
        }
    };
    /**
     * Get all the defined DataSources.
     * The API offer the ability to get the datasource and check the detail of it.
     */
    QueryApi.prototype.datasourceGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/datasource';
        console.log(path);
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            console.log(response.status);
            console.log(response.json());
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
        * Get all the defined DataCenters.
        * The API offer the ability to get the datasource and check the detail of it.
        */
    QueryApi.prototype.datacenterGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/query/datacenter';
        console.log(path);
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            console.log(response.status);
            console.log(response.json());
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get a datasource
     * a detailed datasource
     * @param id the id for the datasource.
     */
    QueryApi.prototype.datasourceIdGet = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/datasource/{id}'
            .replace('{' + 'id' + '}', String(id));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling datasourceIdGet.');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get all RuleGroup Report
     * a detailed RuleGroup
     */
    QueryApi.prototype.reportGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/report';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * A certain RuleGroup report.
     * get a certain report
     * @param body the RuleGroup Name.
     */
    QueryApi.prototype.reportPost = function (body, extraHttpRequestParams) {
        var path = this.basePath + '/report';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling reportPost.');
        }
        var requestOptions = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(body);
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get all the defined RuleGroup.
     * The API offer the ability to get the RuleGroup and check the detail of it.
     */
    QueryApi.prototype.rulegroupGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/rulegroup';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get a RuleGroup
     * a detailed RuleGroup
     * @param id the id for the RuleGroup.
     */
    QueryApi.prototype.rulegroupIdGet = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/rulegroup/{id}'
            .replace('{' + 'id' + '}', String(id));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling rulegroupIdGet.');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get all the defined RuleSet.
     * The API offer the ability to get the RuleSet and check the detail of it.
     */
    QueryApi.prototype.rulesetGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/ruleset';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get a RuleSet
     * a detailed RuleSet
     * @param id the id for the RuleSet.
     */
    QueryApi.prototype.rulesetIdGet = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/ruleset/{id}'
            .replace('{' + 'id' + '}', String(id));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling rulesetIdGet.');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get all the defined ThresholdDef.
     * The API offer the ability to get the ThresholdDef and check the detail of it.
     */
    QueryApi.prototype.thresholdDefGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/threshold_def';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get a ThresholdDef
     * a detailed ThresholdDef
     * @param id the id for the ThresholdDef.
     */
    QueryApi.prototype.thresholdDefIdGet = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/threshold_def/{id}'
            .replace('{' + 'id' + '}', String(id));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling thresholdDefIdGet.');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get all the defined Threshold.
     * The API offer the ability to get the Threshold and check the detail of it.
     */
    QueryApi.prototype.thresholdGet = function (extraHttpRequestParams) {
        var path = this.basePath + '/threshold';
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    /**
     * Get a Threshold
     * a detailed Threshold
     * @param id the id for the Threshold.
     */
    QueryApi.prototype.thresholdIdGet = function (id, extraHttpRequestParams) {
        var path = this.basePath + '/threshold/{id}'
            .replace('{' + 'id' + '}', String(id));
        var queryParameters = new http_1.URLSearchParams();
        var headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling thresholdIdGet.');
        }
        var requestOptions = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        return this.http.request(path, requestOptions)
            .map(function (response) {
            if (response.status === 204) {
                return undefined;
            }
            else {
                return response.json();
            }
        });
    };
    QueryApi = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [http_1.Http, String, cookies_service_1.CookieService])
    ], QueryApi);
    return QueryApi;
}());
exports.QueryApi = QueryApi;
//# sourceMappingURL=QueryApi.js.map