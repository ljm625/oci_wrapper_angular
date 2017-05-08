import {
    Input, Output, Component, OnInit, ElementRef, AfterViewInit, ViewChild, EventEmitter,
    OnChanges, ViewChildren, QueryList
} from '@angular/core';
import { SEMANTIC_COMPONENTS, SEMANTIC_DIRECTIVES } from "ng-semantic";
import { FormControl } from "@angular/forms";
import {MultiSelect} from "./selector";


declare var jQuery: any;

@Component({
  selector:'ui-modal',
  templateUrl: 'ui.modal.html',
})
export class DataModal implements OnInit,OnChanges {
  @ViewChild('myModal') modalRef;
  @ViewChild('deleteModal') delmodalRef;
  @ViewChild('popup') popupRef;
  @ViewChildren(MultiSelect) multiRef:QueryList<MultiSelect>;
  @Input() title: string='Default Title';
  @Input() Name: string='';
  @Input() fields: Array<any> = []; //like some dict inside, for example {type:input,name:blablabla,choices:bla bla bla}
  @Input() values: Array<any> = null;
  @Output() valuesChange = new EventEmitter();
  @Input() dependencies: Array<any>=[];
  @Output() submitChange= new EventEmitter();
  @Output() deleteConfirm = new EventEmitter();
  origHidden: Array<string>=[];
  hiddenList: Array<string>=[];
  controllerList: Array<string>=[];
  deleteId:number;
  ngOnChanges(){
    console.log(this.values);
    for(let controller of this.controllerList){
      var index=0;
      for(let field of this.fields){
        if(field.name==controller){
          break;
        }
        index=index+1;
      }
      if(this.values.length>index){
        this.checkControl(controller,this.values[index]);
      }
    }
    // this.delay(10000).then(this.modalRef.hide());

  }

  public show(){

    this.modalRef.show();
    setTimeout(()=>{
      console.log('Current Value for the modal:');
      console.log(this.values);
      if (this.popupRef!=null){
        this.popupRef.initPopup();
      }
      if(this.multiRef!=null){
        this.multiRef.forEach(function(element){
          element.updateSelectList();
        });
      }
    }, 200);
  }
  public deleteModal(delNum:number){
    this.deleteId=delNum;
    this.delmodalRef.show();
  }
  doDelete(){
    this.deleteConfirm.emit(this.deleteId);
  }

  constructor(private elementRef: ElementRef){
  }

  initValueList(values){
    let output=[];
    for(let field of this.fields){
      if(field.fieldtype=='multiselect'){
        output.push([]);
      }
      else if(field.fieldtype=='check'){
        output.push(new FormControl(false));
      }
      else{
        output.push('');
      }
    }
    return output;
  }

  ngOnInit() {
    if(this.values==null){
      this.values=[];
      for(let field of this.fields){
        if(field.fieldtype=='multiselect'){
          this.values.push([]);
        }
        else if(field.fieldtype=='check'){
          this.values.push(new FormControl(false));
        }
        else if(field.fieldtype=='popup'){
          this.values.push([]);
        }
        else{
          this.values.push('');
        }
      }
      this.valuesChange.emit(this.values);
    }
    this.initHiddenList()
  }
  getType(input){
    // console.log(input);
    return input.fieldtype;
  }
  getValues(){
    this.submitChange.emit(this.values);
    console.log(this.values);
    // console.log(this.origHidden)
  }
  // for the dependencies, what you need to do is to check the value change and then map it.
  // {name:Type, control=[{'choice:, field}]}
  checkControl(name,value){
    if (this.controllerList.indexOf(name)!=-1){
      this.hiddenList=this.origHidden.slice();
      let obj=this.dependencies[this.controllerList.indexOf(name)];
      for(let rule of obj.control){
        if(rule.choice==value){
          for(let name of rule.field){
            let index=this.hiddenList.indexOf(name);
            this.hiddenList.splice(index,1);
          }
        }
      }
    }
    setTimeout(()=>{
      this.modalRef.refresh();
    }, 200);

  }
  initHiddenList(){
    for(let obj of this.dependencies){
      this.controllerList.push(obj.name);
      for (let rule of obj.control){
        for(let name of rule.field){
          if(this.hiddenList.indexOf(name)==-1){
            this.hiddenList.push(name);
          }
        }
      }
    }
    this.origHidden=this.hiddenList.slice();
  }

  isHidden(name){

    if (this.hiddenList.indexOf(name)!=-1){
      return true;
    }
    else return false
  }


}
