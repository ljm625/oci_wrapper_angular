import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from "../../services/dataservice";
import { QueryApi } from "../../services/api/api/QueryApi";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'ruleset',
    providers: [DataService, QueryApi],
    styleUrls: ['rulegroup.component.css'],
    templateUrl: 'rulegroup.component.html'
})
export class RuleGroup implements OnInit {
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
    rulesfield = [];
    fieldBuilder(rulesetList, datasourceList,datacenterList) {
        this.rulesfield = [
            { name: 'Name', fieldtype: 'input' },
            { name: 'DataSource', fieldtype: 'select', choices: datasourceList },
            { name: 'Operator', fieldtype: 'select', choices: ['>', '<', '=', '>=', '<=', '<>', 'in', 'equal', 'contain', 'exclude', 'unequal', 'regex'] },
            { name: 'Value', fieldtype: 'input' },
        ];
        this.field = [
            { name: 'Name', fieldtype: 'input' },
            { name: 'Description', fieldtype: 'input' },
            { name: 'BaseDataSource', fieldtype: 'select', choices: datasourceList },
            { name: 'RuleSets', fieldtype: 'multiselect', choices: rulesetList },
            { name: 'DataCenters', fieldtype: 'multiselect', choices: datacenterList },
            { name: 'Rules', fieldtype: 'popup', content: this.rulesfield },
            { name: 'id', fieldtype: 'hidden' }];
    }

    constructor(private query: QueryApi, private data_service: DataService) {

    }

    ngOnInit() {
        let token = this.data_service.getToken();
        let rulesetList: Array<string> = [];
        this.query.rulesetGet().subscribe(resp => {
            for (let ds of resp) {
                rulesetList.push(ds.Name);
            }
        });
        let datasourceList: Array<string> = [];
        this.query.datasourceGet().subscribe(resp => {
            for (let ds of resp) {
                datasourceList.push(ds.Name);
            }
        });
        let datacenterList: Array<string> = [];
        this.query.datacenterGet().subscribe(resp => {
            for (let dc of resp) {
                datacenterList.push(dc);
            }
        });
        this.fieldBuilder(rulesetList, datasourceList,datacenterList);
        this.query.rulegroupGet().subscribe(resp => {
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
            if (typeof (data[column.indexOf(col)]) === "boolean") {
                blankValue[modal_col.indexOf(col)] = new FormControl(data[column.indexOf(col)])
            }
            else {
                blankValue[modal_col.indexOf(col)] = data[column.indexOf(col)]
            }
        }
        console.log(blankValue);
        this.values = blankValue;
        console.log(this.values);
        this.modalRef.show();
        //this.modalRef.display();
    }

    onQuery() {
        // Here we need to query the given datasource.
        if (this.selected == '') {
            return
        }
        let index = this.selectorId[this.selectorList.indexOf(this.selected)];
        if (index == 99999) {
            this.data_service.getRulegroupTable().subscribe(resp => {
                console.log(resp);
                this.showTable = true;
                this.table = resp;
            });
        }
        else {
            this.data_service.getRulegroupIdTable(index).subscribe(resp => {
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
    onBlankCreate() {
        this.modalRef.show();
        this.values = this.data_service.generateBlankValue(this.field)
    }

    onSubmit(data) {
        // Starting here, we are going to do the actual work.
        this.data_service.updateRulegroup(this.data_service.generatePayload(this.field, data)).subscribe(resp => {
            console.log(resp);
            this.onQuery();
        });
    }
    deleteEvent(id: number) {
        this.modalRef.deleteModal(id);
    }

    onDelete(id) {
        let data = this.table.data[id];
        console.log(data);
        this.data_service.deleteRulegroup(data[0]).subscribe(data => {
            console.log(data);
            console.log('Deleted');
            this.table.data = [];
        })
    }
}
