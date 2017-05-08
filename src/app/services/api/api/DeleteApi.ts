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

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from '../model/models';
import 'rxjs/Rx';
import * as globals from '../../../config.global'

/* tslint:disable:no-unused-variable member-ordering */

'use strict';
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()
export class DeleteApi {
    protected basePath = globals.OCI_URL+'/api/v1';
    public defaultHeaders : Headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    });

    constructor(protected http: Http, @Optional() basePath: string,private cookie:CookieService) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    headerParser(header:Headers){
        if (header.get('Authorization')!=undefined){
            header.set('Authorization',"Basic " + this.cookie.get('oci_session'));
            return header;
        }
        else {
            header.append('Authorization',"Basic " + this.cookie.get('oci_session'));
            return header;
        }
    }


    /**
     * delete a datasource
     * a detailed datasource
     * @param id the id for the datasource.
     */
    public datasourceIdDelete (id: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/datasource/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling datasourceIdDelete.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * delete a RuleGroup
     * a detailed RuleGroup
     * @param id the id for the RuleGroup.
     */
    public rulegroupIdDelete (id: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/rulegroup/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling rulegroupIdDelete.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * delete a RuleSet
     * a detailed RuleSet
     * @param id the id for the RuleSet.
     */
    public rulesetIdDelete (id: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/ruleset/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling rulesetIdDelete.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * delete a ThresholdDef
     * a detailed ThresholdDef
     * @param id the id for the ThresholdDef.
     */
    public thresholdDefIdDelete (id: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/threshold_def/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling thresholdDefIdDelete.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

    /**
     * delete a Threshold
     * a detailed Threshold
     * @param id the id for the Threshold.
     */
    public thresholdIdDelete (id: number, extraHttpRequestParams?: any ) : Observable<{}> {
        const path = this.basePath + '/threshold/{id}'
            .replace('{' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headerParams = this.headerParser(this.defaultHeaders);
        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling thresholdIdDelete.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'DELETE',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }

}