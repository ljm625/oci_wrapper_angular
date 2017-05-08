import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/dataservice";
import {QueryApi} from "../../services/api/api/QueryApi";
import {FormControl} from "@angular/forms";

@Component({
    selector : 'threshold',
    styleUrls: ['threshold.component.css'],
    templateUrl: 'threshold.component.html'
})
export class Threshold implements OnInit {
    @ViewChild('modalBase') modalRef;
    showTable: boolean = false;
    values = null;
    table = {
        column: [],
        data: []
    };
    selected: string = '';
    selectorList: Array<string> = ['All'];
    selectorId: Array<number> = [99999];
    field = [];
    field_dependencies = [];

    fieldBuilder(threshold,datasource) {
        this.field = [
            {name: 'Name', fieldtype: 'input'},
            {name: 'Description', fieldtype: 'input'},
            {name: 'ErrorOperator', fieldtype: 'select', choices: ['>', '<', '=', '>=', '<=', '<>', 'in','equal','contain','exclude','unequal','regex']},
            {name: 'ErrorThreshold', fieldtype: 'select', choices: threshold},
            {name: 'ErrorDataSource', fieldtype: 'select', choices: datasource},
            {name: 'WarnOperator', fieldtype: 'select', choices: ['>', '<', '=', '>=', '<=', '<>', 'in','equal','contain','exclude','unequal','regex']},
            {name: 'WarnThreshold', fieldtype: 'select', choices: threshold},
            {name: 'WarnDataSource', fieldtype: 'select', choices: datasource},
            {name: 'id', fieldtype: 'hidden'}];
        this.field_dependencies = []
    }

    constructor(private query: QueryApi, private data_service: DataService) {

    }

    ngOnInit() {
        let token=this.data_service.getToken();

        let thresholdList:Array<string>=[];
        let datasourceList:Array<string>=[];
        this.query.thresholdDefGet().subscribe((resp)=>{
            for (let td of resp){
              thresholdList.push(td.Name);
            }
        });
        this.query.datasourceGet().subscribe(resp=>{
           for (let ds of resp){
               datasourceList.push(ds.Name);
           }
        });
        this.fieldBuilder(thresholdList,datasourceList);
        this.query.thresholdGet().subscribe(resp=> {
            for (let ds of resp) {
                console.log(ds);
                this.selectorList.push(ds.Name);
                this.selectorId.push(ds.id);
                console.log(this.selectorList);
            }
        });
    }

    modifyEvent(id: number) {
        let column = this.table.column;
        let data = this.table.data[id];
        let modal_col: Array<string> = [];
        for (let field of this.field) {
            modal_col.push(field.name);
        }
        let blankValue = this.data_service.generateBlankValue(this.field);
        for (let col of column) {
            if (typeof(data[column.indexOf(col)]) === "boolean") {
                blankValue[modal_col.indexOf(col)] = new FormControl(data[column.indexOf(col)])
            }
            else {
                blankValue[modal_col.indexOf(col)] = data[column.indexOf(col)]
            }
        }
        this.values = blankValue;
        console.log(this.values);
        this.modalRef.show();
    }

    onQuery() {
        // Here we need to query the given datasource.
        if (this.selected == '') {
            return
        }
        let index = this.selectorId[this.selectorList.indexOf(this.selected)];
        if (index == 99999) {
            this.data_service.getThresholdTable().subscribe(resp=> {
                console.log(resp);
                this.showTable = true;
                this.table = resp;
            });
        }
        else {
            this.data_service.getThresholdIdTable(index).subscribe(resp=> {
                console.log(resp);
                this.showTable = true;
                this.table = resp;
            });

            // this.table={
            //   column:['Name',"Value1","Value2","Value3"],
            //   data:[[1,3,4,5],[1,3,4,5]]
            // };
        }
    }
    onBlankCreate()
    {
        this.modalRef.show();
        this.values = this.data_service.generateBlankValue(this.field)
    }

    onSubmit(data){
        // Starting here, we are going to do the actual work.
        this.data_service.updateThreshold(this.data_service.generatePayload(this.field,data)).subscribe(resp=>{
            console.log(resp);
            this.onQuery();
        });
    }

    deleteEvent(id: number) {
        this.modalRef.deleteModal(id);
    }

    onDelete(id) {
        let data = this.table.data[id];
        this.data_service.deleteThreshold(data[0]).subscribe(data=>{
            console.log(data);
            console.log('Deleted');
            this.table.data = [];
        })
    }
}
