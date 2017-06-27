/**
 * Created by jiaminli on 2017/6/22.
 */



import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
import { DataService } from "../../services/dataservice";
import { QueryApi } from "../../services/api/api/QueryApi";
import {DragulaService} from "ng2-dragula";
import {ModifyApi} from "../../services/api/api/ModifyApi";
import {Router} from "@angular/router";

@Component({
  selector: 'orderconfig',
  providers: [DataService, QueryApi,DragulaService, ModifyApi],
  styleUrls: ['orderconfig.component.css'],
  templateUrl: 'orderconfig.component.html'
})
export class OrderConfig implements OnInit {
  Order_list=[];
  dataComplete: boolean = true;
  constructor(private dragulaService: DragulaService,private queryApi: QueryApi, private modifyApi: ModifyApi, private dataService: DataService,private router:Router) {
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      console.log(`drop: ${value[1]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });

  }

  ngOnInit() {
    let token = this.dataService.getToken();
    let orderList: Array<string> = [];
    this.queryApi.orderGet().subscribe(resp => {
      for (let order of resp) {
        this.Order_list.push(order);
      }
    });
  }

  checkList(){
    console.log(this.Order_list);
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    console.log(el);
    console.log(e.innerText);
    this.addClass(e, 'ex-moved');
    let length=el.innerText.split('\n').length;
    this.Order_list=el.innerText.split('\n').splice(0,length-1);
    console.log(this.Order_list)
  }
  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }


  private submit(){
    let payload={};
    payload['Order']=this.Order_list;
    this.dataComplete=false;
    this.modifyApi.orderConfigPost(payload).subscribe(resp => {
      this.dataComplete=true;
    });
  }



}
