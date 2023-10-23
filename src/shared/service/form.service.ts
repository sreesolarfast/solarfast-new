import { OnlineEnquiryService } from './online-enquiry.service';
import { Injectable } from '@angular/core';
import { FormStep } from '../model/form-step';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  stepIndex = 0;

  private _activeStep: BehaviorSubject<FormStep> =
  new BehaviorSubject(null);

  get activeStep$(): Observable<FormStep> {
    return this._activeStep.asObservable();
  }

 public activeStep: FormStep;

constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) { }

private steps: FormStep[] = [

  {
    step: 0,
    component: 'step-property-ownership',
    next: 1,
    back: null,
    hideNavigation: false,
    hideComponent: false,
    route: '/solar'
  },
  {
    step: 1,
    component: 'step-house-type',
    next: 2,
    back: 0,
    hideNavigation: false,
    hideComponent: false,
    route: '/solar'
  },
  {
    step: 2,
    component: 'step-roof-type',
    next: 3,
    back: 1,
    hideNavigation: false,
    hideComponent: false,
    route: '/solar'
  },
  {
    step: 3,
    component: 'step-shading',
    next: 4,
    back: 2,
    hideNavigation: false,
    hideComponent: false,
    route: '/solar'
  },
  {
    step: 4,
    component: 'step-annual-consumption',
    next: 5,
    back: 3,
    hideNavigation: false,
    hideComponent: false,
    route: '/solar'
  },
  {
    step: 5,
    component: 'step-unit-rate',
    next: 6,
    back: 4,
    hideNavigation: false,
    hideComponent: false,
    route: '/solar'
  },
  {
    step: 6,
    component: 'page-map',
    next: 7,
    back: 5,
    hideNavigation: true,
    hideComponent: true,
    route: '/pages/map'
  },
  {
    step: 7,
    component: 'page-package-selection',
    next: 8,
    back: 6,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/package-selection'
  },
  {
    step: 8,
    component: 'page-package-selected',
    next: 9,
    back: 7,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/package-selected'
  },
  {
    step: 9,
    component: 'page-install-date',
    next: 10,
    back: 8,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/install-date'
  },
  {
    step:10,
    component: 'page-confirm-order',
    next: 11,
    back: 9,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/confirm-order'
  },
  {
    step: 11,
    component: 'page-next-steps',
    next: 12,
    back: 10,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/next-steps'
  },
  {
    step: 12,
    component: 'photo-upload',
    next: 13,
    back: 11,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/photo-upload'
  },
  {
    step: 13,
    component: 'thank-you',
    next: 14,
    back: 12,
    hideNavigation: true,
    hideComponent: false,
    route: '/pages/thank-you'
  },


];

public getSteps() {
  return this.steps;
}


public stepChange(event) {
  // set the next active step
  this.activeStep = this.steps.filter((x) => x.step == event)[0];

  // conditionally set the peristed step
  if (event != this.onlineEnquiryService.step)
    this.onlineEnquiryService.setStep(event);

    if (this.activeStep.route != null)
    this.router.navigate([this.activeStep.route])

    this._activeStep.next(this.activeStep);

  // set online enquiry
  this.onlineEnquiryService
    .manage(this.onlineEnquiryService.result)
    .subscribe({
      next: (x) => {
        console.info('online enquiry managed', x);
      },
    });


}

public next() {
  this.stepChange(this.activeStep.next);
}

public back() {
  this.stepChange(this.activeStep.back);
}

public redirectToCorrectStep() {

  if (this.getActiveStep().route == null) {
    this.router.navigate(['/solar']);
  }
   else
   this.router.navigate([this.activeStep.route]);
}

public getActiveStep() {
  this.activeStep = this.steps.filter((x) => x.step == this.onlineEnquiryService.step)[0];
  return this.activeStep;
}


}
