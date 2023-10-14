import { OnlineEnquiryService } from '../../shared/service/online-enquiry.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../shared/service/form.service';
import { FormStep } from '../../shared/model/form-step';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  loading = true;
  steps: FormStep[];
  stepIndex = 0;
  activeStep: FormStep;

  constructor(
    private route: ActivatedRoute,
    private onlineEnquiryService: OnlineEnquiryService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.steps = this.formService.getSteps();
    this.getActiveStep();

    // get online enquiry from param if applicable
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null)
      this.onlineEnquiryService.getByUniqueReference(id).subscribe({
        next: (x) => {
          this.loading = false;
        },
      });
    else this.loading = false;

    this.onlineEnquiryService.step$.subscribe({
      next: (x) => {
        if (x != null)
        this.stepChange(x);
      },
    });
  }

  public getActiveStep() {
    this.activeStep = this.steps.filter((x) => x.step == this.stepIndex)[0];
    return this.activeStep;
  }

  stepChange(event) {
    // set the next active step
    this.activeStep = this.steps.filter((x) => x.step == event)[0];

    // conditionally set the peristed step
    if (event != this.onlineEnquiryService.step)
      this.onlineEnquiryService.setStep(event);

    // set online enquiry
    this.onlineEnquiryService
      .manage(this.onlineEnquiryService.result)
      .subscribe({
        next: (x) => {
          console.info('online enquiry managed', x);
        },
      });
  }

  next() {
    this.stepChange(this.activeStep.next);
  }

  back() {
    this.stepChange(this.activeStep.back);
  }
}
