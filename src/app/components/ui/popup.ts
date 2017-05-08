import {Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
declare var jQuery: any;

@Component({
    selector:'ui-popup',
    templateUrl: 'ui.popup.html'
})
export class Popup implements AfterViewInit,OnInit{
    constructor(private elementRef: ElementRef){
    }
    @Input() label: string;
    @Input() dataList=[];
    @Input() fields: Array<any> = []; //like some dict inside, for example {type:input,name:blablabla,choices:bla bla bla}
    values: Array<any> = null;
    @Output() dataListChange= new EventEmitter();
    fieldName: Array<string>=[];
    initValues(){
        this.values=[];
        for(let field of this.fields){
            if(field.fieldtype=='multiselect'){
                this.values.push([]);
            }
            else if(field.fieldtype=='check'){
                this.values.push(new FormControl(false));
            }
            else if (field.fieldtype == 'select') {
                this.values.push(field.choices[0])
            }
            else{
                this.values.push('');
            }
            this.fieldName.push(field.name);
        }
    }

    ngOnInit(){
        if(this.values==null){
           this.initValues();
        }
    }

    public initPopup(){
      jQuery(this.elementRef.nativeElement).find('#Test').popup({
            inline     : true,
            hoverable  : true,
            position   : 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
      jQuery(this.elementRef.nativeElement).find('.blue.label').popup({
            inline     : true,
            hoverable  : true,
            position   : 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
        this.initValues();
    }

    ngAfterViewInit(){
      jQuery(this.elementRef.nativeElement).find('#Test').popup({
            inline     : true,
            hoverable  : true,
            position   : 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
      jQuery(this.elementRef.nativeElement).find('.blue.label').popup({
            inline     : true,
            hoverable  : true,
            position   : 'bottom left',
            delay: {
                show: 300,
                hide: 800
            }
        });
    }
    hide(){
      jQuery(this.elementRef.nativeElement).find('#Test').popup('hide');
    }
    show(){
      jQuery(this.elementRef.nativeElement).find('#Test').popup('show');
    }

    addElement(){
        let tempList={};
        for(let name of this.fieldName){
            tempList[name]=this.values[this.fieldName.indexOf(name)];
        }
        this.dataList.push(tempList);
        this.initValues();
        this.hide();
        setTimeout(()=>{
          jQuery(this.elementRef.nativeElement).find('.blue.label').popup({
                inline     : true,
                hoverable  : true,
                position   : 'bottom left',
                delay: {
                    show: 300,
                    hide: 800
                }
            });
        }, 100);
        this.onChange()

    }
    delElement(i){
        this.dataList.splice(i,1);
    }

    getType(input){
        // console.log(input);
        return input.fieldtype;
    }
    modElement(i){
        console.log(this.dataList[i])
    }
    onChange(){
        this.dataListChange.emit(this.dataList);
    }
}
