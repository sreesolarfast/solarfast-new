import { Component } from '@angular/core';
export class FormStep {
  step: number;
  next: number | null;
  back: number | null;
  component: string;
  hideNavigation: boolean;
  hideComponent: boolean | null;
  route: string | null;
}
