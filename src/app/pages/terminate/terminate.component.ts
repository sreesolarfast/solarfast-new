import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-terminate',
    templateUrl: './terminate.component.html',
    styleUrls: ['./terminate.component.scss'],
})
export class TerminateComponent implements OnInit {
    reason: string;

    constructor(public router: Router, private locationStrategy: LocationStrategy) {}

    ngOnInit() {
        const state = this.locationStrategy.getState() as any;
        this.reason = state.reason;
        console.log(this.reason);
    }

    backButton() {
        this.router.navigate(['/solar']);
    }
}
