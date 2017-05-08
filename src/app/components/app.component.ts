import { Component } from '@angular/core';

import 'jquery';
import 'semantic';
import 'tablesort';

@Component({
    selector: 'my-app',
    templateUrl: ``,

})
export class AppComponent {
    visible: boolean = false;

    setVisibility(data: boolean) { this.visible = data; }
}
