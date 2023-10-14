import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormStep } from '../../../../shared/model/form-step';
import { OnlineEnquiryService } from '../../../../shared/service/online-enquiry.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'step-unit-rate',
  templateUrl: './unit-rate.component.html',
  styleUrls: ['./unit-rate.component.scss']
})
export class UnitRateComponent implements OnInit {
  @Input() step: FormStep;
  @Output() newStep = new EventEmitter<number | null>();
  controlDay = new FormControl(null);
  controlNight = new FormControl(null);
  dayAndNight = false;

    constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) { }

    ngOnInit() {
      this.controlDay.setValue(this.onlineEnquiryService.result.unitRate);

      if (this.onlineEnquiryService.result.nightRate != null) {
      this.dayAndNight = true;
      this.controlDay.setValue(this.onlineEnquiryService.result.dayRate);
      this.controlNight.setValue(this.onlineEnquiryService.result.nightRate);
      }
    }

    answerGiven() {
      if (this.dayAndNight) {
        this.onlineEnquiryService.result.dayRate = this.controlDay.value;
        this.onlineEnquiryService.result.nightRate = this.controlDay.value;
      }
      else
      this.onlineEnquiryService.result.unitRate = this.controlDay.value;

      this.newStep.emit(this.step.next);
    }

  }
