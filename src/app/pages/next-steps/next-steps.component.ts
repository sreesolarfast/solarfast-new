import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { FormService } from 'src/shared/service/form.service';

@Component({
  selector: 'app-next-steps',
  templateUrl: './next-steps.component.html',
  styleUrls: ['./next-steps.component.scss']
})


export class NextStepsComponent {

    constructor(
        private formService: FormService,
    ) {}

    ngOnInit(): void {
        const step = this.formService.getSteps().filter(x => x.component == 'page-install-date')[0];
        if (step != this.formService.activeStep) {
          this.formService.redirectToCorrectStep();
        }
    }

    backButton() {
        console.log("back button clicked");
        this.formService.back();
    }

}
