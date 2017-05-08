import { Injectable } from '@angular/core';
import {QueryApi} from "./api/api/QueryApi";
import {AddApi} from "./api/api/AddApi";
import {ModifyApi} from "./api/api/ModifyApi";
import {DeleteApi} from "./api/api/DeleteApi";
import {FormControl} from "@angular/forms";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Router} from "@angular/router";
@Injectable()
export class DataService {
    // So basically, what this service is doing is it try to simplify the stuffs you need to do in frontend.
    constructor(private query: QueryApi,private add: AddApi,private del: DeleteApi,private modify: ModifyApi,private cookie: CookieService,private router:Router) {}
    // The first part is to generate a table for the data.
    generateTable(data){
        var table={column:[],data:[]};
        let nameList=this.generateName(data);
            table.column=nameList;
            for(let obj of data) {
                let dataList = [];
                for (let name of nameList) {
                    if (obj.hasOwnProperty(name)) {
                        dataList.push(obj[name])
                    } else {
                        dataList.push('');
                    }
                }
                table.data.push(dataList);
            }
        return table;
    }

    getToken(){
        let result=this.cookie.get('oci_session');
        if (result==undefined){
            this.router.navigateByUrl('/login')
        }
        else{
            return result
        }
    }

    getReport(name){
        let body={Name:name};
        return this.query.reportPost(body).map(data=>{
            return this.generateReportTable(data)
        })
    }

    generateReportTable(data){
        var table={column:[],data:[]};
        let nameList=[];
        for (var name in data[0]){
            // if(typeof(data[0][name])=="object"){
            //     nameList.push(name+'.'+'error');
            //     nameList.push(name+'.'+'warn');
            // }
            // else{
                nameList.push(name);
            // }
        }
        if(nameList.indexOf('Name')!=-1){
            nameList[nameList.indexOf('Name')]=nameList[0];
            nameList[0]='Name';
        }
        table.column=nameList;
        for (let obj of data){
            let tmpdata=[];
            for(let name of nameList){
                // if(name.indexOf('.')==-1){
                //     tmpdata.push(obj[name])
                // }
                // else{
                //     tmpdata.push(obj[name.split('.')[0]][name.split('.')[1]]);
                // }

                if (typeof obj[name]==='object' && obj[name]!=null){
                    console.log(obj[name]);
                    console.log(typeof obj[name]);
                    if(obj[name]['warn']==false && obj[name]['error']==false )
                    {
                        tmpdata.push('Good')
                    }
                    else if(obj[name]['warn']==true && obj[name]['error']==false){
                        tmpdata.push('Warn')
                    }
                    else if(obj[name]['error']==true){
                        tmpdata.push('Critical')
                    }
                    else{
                        tmpdata.push(obj[name])
                    }
                }
                else{
                    tmpdata.push(obj[name])
                }
            }
            table.data.push(tmpdata);
        }
        return table;
    }
    generateName(data):Array<string> {
        let nameList: Array<string>=[];
        for(let obj of data){
            for(var name in obj){
                if(nameList.indexOf(name)==-1 && name!='_id' && name!='self'){
                    nameList.push(name)
                }
            }
        }
        if(nameList.indexOf('Name')!=-1 && nameList.indexOf('id')!=-1){
            nameList[nameList.indexOf('Name')]=nameList[1];
            nameList[1]='Name';
            nameList[nameList.indexOf('id')]=nameList[0];
            nameList[0]='id';
        }
        else if (nameList.indexOf('Name')!=-1){
                nameList[nameList.indexOf('Name')]=nameList[0];
                nameList[0]='Name';
            }
        return nameList;
    }
    getDatasourceTable(){
       return this.query.datasourceGet().map(data=>{return this.generateTable(data)});
    }
    getDatasourceIdTable(id:number){
        return this.query.datasourceIdGet(id).map(data=>{
            return this.generateTable([data]);
        })
    }
    getThresholdDefTable(){
        return this.query.thresholdDefGet().map(data=>{return this.generateTable(data)});
    }
    getThresholdDefIdTable(id:number){
        return this.query.thresholdDefIdGet(id).map(data=>{
            return this.generateTable([data]);
        })
    }
    getThresholdTable(){
        return this.query.thresholdGet().map(data=>{return this.generateTable(data)})
    }
    getThresholdIdTable(id:number){
        return this.query.thresholdIdGet(id).map(data=>{
            return this.generateTable([data]);
        })
    }
    getRulesetTable(){
        return this.query.rulesetGet().map(data=>{
            return this.generateTable(data);
        })
    }
    getRulegroupTable(){
        return this.query.rulegroupGet().map(data=>{
            return this.generateTable(data);
        })
    }
    getRulesetIdTable(id:number){
        return this.query.rulesetIdGet(id).map(data=>{
            return this.generateTable([data]);
        })
    }
    getRulegroupIdTable(id:number){
        return this.query.rulegroupIdGet(id).map(data=>{
            return this.generateTable([data]);
        })
    }

    parseInfo(){
    }

    queryData(){
        return this.query.datasourceGet()
    }
    getRuleGroups(){
        return this.query.rulegroupGet()
    }
    getDataSources()
    {
        return this.query.datasourceGet()
    }

    generateBlankValue(fields){
        let values=[];
        for(let field of fields){
            if(field.fieldtype=='multiselect'){
                values.push([]);
            }
            else if(field.fieldtype=='select'){
                values.push(field.choices[0])
            }
            else if(field.fieldtype=='check'){
                values.push(new FormControl(false));
            }
            else if(field.fieldtype=='popup'){
                values.push([]);
            }
            else{
                values.push('');
            }
        }
        console.log(values);
        return values
    }
    generatePayload(fields,data){
        let payload={};
        let index=0;
        for(let field of fields){
            if(field.name.indexOf('.')!=-1){
                let nameList=field.name.split('.');
                if(payload[nameList[0]]==undefined){
                    payload[nameList[0]]={};
                }
                if(field.fieldtype=='check'){
                    payload[nameList[0]][nameList[1]]=data[index].value;
                }
                else{
                    payload[nameList[0]][nameList[1]]=data[index];
                }
            }
            else if(field.fieldtype=='check'){
                payload[field.name]=data[index].value;
            }
            else{
                if(data[index]!=='' && data[index]!==[]){
                    payload[field.name]=data[index];
                }
            }
            index=index+1;
        }
        console.log(payload);
        return payload;
    }
    updateDatasource(payload){
        if(payload['Filter']['Value']==''){
            delete payload['Filter'];
        }
        if(typeof(payload['id'])==='number'){
            let id = payload['id'];
            delete payload['id'];
            return this.modify.datasourceIdPost(id,payload);
        }
        else{
            delete payload['id'];
            return this.add.datasourcePut(payload);
        }
    }
    updateThresholdDef(payload){
        if(typeof(payload['id'])==='number'){
            let id = payload['id'];
            delete payload['id'];
            return this.modify.thresholdDefIdPost(id,payload);
        }
        else{
            delete payload['id'];
            return this.add.thresholdDefPut(payload);
        }
    }
    updateThreshold(payload){
        if(typeof(payload['id'])==='number'){
            let id = payload['id'];
            delete payload['id'];
            return this.modify.thresholdIdPost(id,payload);
        }
        else{
            delete payload['id'];
            return this.add.thresholdPut(payload);
        }
    }
    updateRuleset(payload){
        if(typeof(payload['id'])==='number'){
            let id = payload['id'];
            delete payload['id'];
            return this.modify.rulesetIdPost(id,payload);
        }
        else{
            delete payload['id'];
            return this.add.rulesetPut(payload);
        }
    }
    updateRulegroup(payload){
        if(typeof(payload['id'])==='number'){
            let id = payload['id'];
            delete payload['id'];
            return this.modify.rulegroupIdPost(id,payload);
        }
        else{
            delete payload['id'];
            return this.add.rulegroupPut(payload);
        }
    }
    deleteDatasource(id){
        return this.del.datasourceIdDelete(id);
    }

    deleteThreshold(id){
        return this.del.thresholdIdDelete(id);
    }
    deleteThresholdDef(id){
        return this.del.thresholdDefIdDelete(id)
    }
    deleteRuleset(id){
        return this.del.rulesetIdDelete(id);
    }
    deleteRulegroup(id){
        return this.del.rulegroupIdDelete(id);
    }
}