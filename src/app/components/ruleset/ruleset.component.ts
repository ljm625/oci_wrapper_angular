import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/dataservice";
import {QueryApi} from "../../services/api/api/QueryApi";
import {FormControl} from "@angular/forms";

@Component({
    selector : 'ruleset',
    providers:[DataService,QueryApi],
    styleUrls: ['ruleset.component.css'],
    templateUrl: 'ruleset.component.html'
})
export class RuleSet implements OnInit {
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

    fieldBuilder(datasourceList,thresholdList) {
        this.field = [
            {name: 'Name', fieldtype: 'input'},
            {name: 'Description', fieldtype: 'input'},
            {name: 'Type', fieldtype: 'select', choices: ['Display', 'Threshold']},
            {name: 'Thresholds', fieldtype: 'multiselect', choices: thresholdList},
            {name: 'DataSources', fieldtype: 'multiselect', choices: datasourceList},
            {name: 'id', fieldtype: 'hidden'}];
        this.field_dependencies = [
            {
            name: 'Type', control: [{choice: 'Display', field: ['DataSources']},
                {choice: 'Threshold', field: ['Thresholds']}]
        }
        ]
    }

    constructor(private query: QueryApi, private data_service: DataService) {

    }

    ngOnInit() {
        let token=this.data_service.getToken();
        let datasourceList:Array<string>=[];
        this.query.datasourceGet().subscribe(resp=>{
            for (let ds of resp){
                datasourceList.push(ds.Name);
            }
        });
        let thresholdList:Array<string>=[];
        this.query.thresholdGet().subscribe(resp=>{
            for (let ds of resp){
                thresholdList.push(ds.Name);
            }
        });
        this.fieldBuilder(datasourceList,thresholdList);
        this.query.rulesetGet().subscribe(resp=> {
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
            this.data_service.getRulesetTable().subscribe(resp=> {
                console.log(resp);
                this.showTable = true;
                this.table = resp;
            });
        }
        else {
            this.data_service.getRulesetIdTable(index).subscribe(resp=> {
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
        this.data_service.updateRuleset(this.data_service.generatePayload(this.field,data)).subscribe(resp=>{
            console.log(resp);
            this.onQuery();
        });
    }
    deleteEvent(id: number) {
        this.modalRef.deleteModal(id);
    }

    onDelete(id) {
        let data = this.table.data[id];
        this.data_service.deleteRuleset(data[0]).subscribe(data=>{
            console.log(data);
            console.log('Deleted');
            this.table.data = [];
        })
    }
}
