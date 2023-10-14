import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormStep } from '../../../../shared/model/form-step';
import { OnlineEnquiryService } from '../../../../shared/service/online-enquiry.service';

@Component({
  selector: 'step-shading',
  templateUrl: './shading.component.html',
  styleUrls: ['./shading.component.scss']
})
export class ShadingComponent implements OnInit {
  @Input() step: FormStep;
  @Output() newStep = new EventEmitter<number | null>();

    constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) { }

    ngOnInit() {
    }

    answerGiven(value: boolean, terminate: boolean = false) {
      this.onlineEnquiryService.result.shading = value;

      if (terminate) {
        this.router.navigate(['/terminate'], { state: { reason: 'Property Type' } });
        return;
      }

      this.newStep.emit(this.step.next);
    }

  }
