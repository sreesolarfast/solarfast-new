import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoofType } from '../../../../shared/enum/roof-type.enum';
import { Router } from '@angular/router';
import { FormStep } from '../../../../shared/model/form-step';
import { OnlineEnquiryService } from '../../../../shared/service/online-enquiry.service';

@Component({
  selector: 'step-roof-type',
  templateUrl: './roof-type.component.html',
  styleUrls: ['./roof-type.component.scss']
})
export class RoofTypeComponent implements OnInit {
  @Input() step: FormStep;
  @Output() newStep = new EventEmitter<number | null>();

    constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) { }

    ngOnInit() {
    }

    answerGiven(value: string, terminate: boolean = false) {
      const answer: RoofType = this.onlineEnquiryService.getEnumValueFromString(RoofType, value);
      this.onlineEnquiryService.result.roofType = answer;

      if (terminate) {
        this.router.navigate(['/pages/terminate'], { state: { reason: 'Roof Type' } });
        return;
      }

      this.newStep.emit(this.step.next);
    }

  }
