import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'page-footer',
    templateUrl: 'page-footer.component.html',
    styleUrls: ['page-footer.component.scss']

})
export class PageFooterComponent {

    environment = environment;

    constructor() { }

    ngOnInit() {}


}
