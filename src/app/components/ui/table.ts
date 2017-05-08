import {Component, Input, Output, EventEmitter, ViewChild, AfterViewInit} from '@angular/core';
declare var jQuery: any;

@Component({
  selector:'ui-table',
  templateUrl: 'ui.table.html',

})
export class DataTable implements AfterViewInit{

@Input() table={};
@Input() editable : boolean=false;
@Output() buttonAction= new EventEmitter();
@Output() deleteAction= new EventEmitter();
@ViewChild('UITable') tableRef;
  onQuery(i){
    this.buttonAction.emit(i);
    console.log('Clicked');
    console.log(i)
  }
  onDelete(i){
    this.deleteAction.emit(i);
    console.log('Clicked');
    console.log(i)
  }
  isThreshold(i){
    if (i=='Good' || i=='Warn' || i=='Critical'){
      return true;
    }
    return false;
  }
  isList(i){
    // Fixed a serious bug
    if (i!=null && i.constructor==Array){
      return true;
    }
    else{
      return false;
    }
  }
  fixNumbers(i){
    if(typeof i==='number' && i % 1 !== 0){
      return i.toFixed(3);
    }
    return i;
  }
  ngAfterViewInit(): void {
    jQuery(this.tableRef.nativeElement).tablesort();
  }

}
