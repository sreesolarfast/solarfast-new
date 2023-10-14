import { Router } from '@angular/router';
import { PropertyOwnership } from '../../../../shared/enum/property-ownership.enum';
import { FormStep } from '../../../../shared/model/form-step';
import { OnlineEnquiryService } from './../../../../shared/service/online-enquiry.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'step-property-ownership',
  templateUrl: './property-ownership.component.html',
  styleUrls: ['./property-ownership.component.scss']
})
export class PropertyOwnershipComponent implements OnInit {
@Input() step: FormStep;
@Output() newStep = new EventEmitter<number | null>();

  constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) { }

  ngOnInit() {
  }

  answerGiven(value: string, terminate: boolean = false) {
    const answer: PropertyOwnership = this.onlineEnquiryService.getEnumValueFromString(PropertyOwnership, value);
    this.onlineEnquiryService.result.propertyOwnership = answer;

    if (terminate) {
      this.router.navigate(['/terminate'], { state: { reason: 'Property Ownership' } });
      return;
    }

    this.newStep.emit(this.step.next);
  }

}
