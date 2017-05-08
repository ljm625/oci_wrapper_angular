import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/dataservice";
import {QueryApi} from "../../services/api/api/QueryApi";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
declare var jQuery: any;

@Component({
    selector: 'dash-board',
    providers:[DataService,QueryApi],
    styleUrls: ['dashboard.component.css'],
    templateUrl: 'dashboard.component.html'
})
export class DashBoard implements AfterViewInit{
    selected: string = '';
    selectorList: Array<string> = [];
    selectorId: Array<number> = [];
    ngAfterViewInit(): void {
        let token=this.data_service.getToken();
        this.data_service.getRuleGroups().subscribe(resp=>{
           for(let ds of resp){
               console.log(ds);
               this.selectorList.push(ds.Name);
               this.selectorId.push(ds.id);
               console.log(this.selectorList)
           }
        });

    }
    showTable: boolean = false;
    dataComplete: boolean = true;
    table = {
        column: [],
        data: []
    };

    constructor(private data_service: DataService,private router:Router) {

    }

    onQuery() {
        if (this.selected == '') {
            return
        }
        let index = this.selected;
        this.dataComplete=false;

        //show sticky

        this.data_service.getReport(index).subscribe(resp=> {
            console.log(resp);
            this.showTable = true;
            this.dataComplete = true;
            this.table = resp;
        });

    }

}
