import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/shared/service/form.service';

@Component({
    selector: 'progression-bar-top',
    templateUrl: './progression-bar-top.component.html',
    styleUrls: ['./progression-bar-top.component.scss']
})
export class ProgressionBarTopComponent implements OnInit {

    private progressionPercentage: number;
    public progress: string;

    constructor(
        public formService: FormService,

    ) { }

    ngOnInit(): void {

        this.formService.activeStep$.subscribe({
            next: (x) => {
                this.progressionPercentage = x?.step != null ? ((x.step + 1) / this.formService.getSteps().length) * 100 : 100;
                this.progress = `${this.progressionPercentage}%`;

            }
        });

    }

}
