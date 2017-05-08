import {Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild, OnChanges} from '@angular/core';
declare var jQuery: any;

@Component({
    selector:'ui-select',
    templateUrl: 'ui.select.html'
})
export class MultiSelect implements AfterViewInit{
    @Input() label: string;
    @Input() choices: Array<string>=[];
    @Input() selected:Array<string>=[];
    @ViewChild('multiselect') selectRef;
    result=[];
    // choices=['Test1','test2','test3'];
    options=[];
    @Output() selectedChange = new EventEmitter();
    constructor(private elementRef: ElementRef){
    }
    printOption(){
        console.log(this.options)
    }

    public updateSelectList(){
        let selected=this.selected;
        jQuery(this.selectRef.nativeElement)
            .dropdown('clear');
        let options = this.selectRef.nativeElement.options;
        for (let i=0;i<options.length;i++) {
            options[i].selected = selected.indexOf(options[i].value) > -1;
            console.log("Updating select section!")
            console.log(options[i].value);
            console.log(options[i].selected);
        }
        setTimeout(() => {
            this.selected = selected;
            jQuery(this.selectRef.nativeElement)
                .dropdown('set selected', selected);
            this.selectedChange.emit(this.selected);
        }, 150);


        this.selectedChange.emit(this.selected);
    }
    ngAfterViewInit(): void {
        jQuery(this.selectRef.nativeElement)
            .dropdown();

    }

    change(options){
        console.log(options);
        this.selected = Array.apply(null,options)
            .filter(option=>option.selected)
            .map(option=>option.value);
        console.log(this.selected);
        this.selectedChange.emit(this.selected);
    }


}
