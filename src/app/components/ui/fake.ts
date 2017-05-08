import {Directive} from '@angular/core';
@Directive({
    selector:'modal-content'
})
export class FakeContent{}

@Directive({
    selector:'modal-actions'
})
export class FakeAction{}

@Directive({
    selector:'accordion-title'
})
export class FakeAccordition{}
@Directive({
    selector:'accordion-content'
})
export class FakeAccorditionContent{}
