import { Injectable } from '@angular/core';
import { FormStep } from '../model/form-step';

@Injectable({
  providedIn: 'root'
})
export class FormService {

constructor() { }

private steps: FormStep[] = [

  {
    step: 0,
    component: 'step-property-ownership',
    next: 1,
    back: null,
    hideNavigation: false,
    hideComponent: false,
  },
  {
    step: 1,
    component: 'step-house-type',
    next: 2,
    back: 0,
    hideNavigation: false,
    hideComponent: false,
  },
  {
    step: 2,
    component: 'step-roof-type',
    next: 3,
    back: 1,
    hideNavigation: false,
    hideComponent: false,
  },
  {
    step: 3,
    component: 'step-shading',
    next: 4,
    back: 2,
    hideNavigation: false,
    hideComponent: false,
  },
  {
    step: 4,
    component: 'step-annual-consumption',
    next: 5,
    back: 3,
    hideNavigation: true,
    hideComponent: false,
  },
  {
    step: 5,
    component: 'step-unit-rate',
    next: 6,
    back: 4,
    hideNavigation: true,
    hideComponent: false,
  },
  {
    step: 6,
    component: null,
    next: 7,
    back: 5,
    hideNavigation: true,
    hideComponent: true
  },

];

public getSteps() {
  return this.steps;
}


}
