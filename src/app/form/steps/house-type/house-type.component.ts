import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyOwnership } from '../../../../shared/enum/property-ownership.enum';
import { FormStep } from '../../../../shared/model/form-step';
import { OnlineEnquiryService } from '../../../../shared/service/online-enquiry.service';
import { PropertyType } from '../../../../shared/enum/property-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'step-house-type',
  templateUrl: './house-type.component.html',
  styleUrls: ['./house-type.component.scss']
})
export class HouseTypeComponent implements OnInit {
  @Input() step: FormStep;
  @Output() newStep = new EventEmitter<number | null>();

    constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) { }

    ngOnInit() {
    }

    answerGiven(value: string, terminate: boolean = false) {
      const answer: PropertyType = this.onlineEnquiryService.getEnumValueFromString(PropertyType, value);
      this.onlineEnquiryService.result.propertyType = answer;

      if (terminate) {
        this.router.navigate(['/pages/terminate'], { state: { reason: 'Property Type' } });
        return;
      }

      this.newStep.emit(this.step.next);
    }

  }
