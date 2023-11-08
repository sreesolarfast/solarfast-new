import { OnlineEnquiryService } from '../../shared/service/online-enquiry.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../shared/service/form.service';
import { FormStep } from '../../shared/model/form-step';
import { OnlineEnquiryDto } from '../../shared/dto/online-enquiry-dto';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })), // Initial state (invisible)
      transition(':enter', [animate('100ms')]), // Transition to visible when added to the DOM
    ]),
  ],
})
export class FormComponent implements OnInit {
  loading = true;
  steps: FormStep[];
  activeStep: FormStep;

  constructor(
    private route: ActivatedRoute,
    private onlineEnquiryService: OnlineEnquiryService,
    public formService: FormService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    this.steps = this.formService.getSteps();

    this.formService.activeStep$.subscribe({
      next: (x) => {
        if (x != null) this.activeStep = x;
      },
    });

    // get online enquiry from param if applicable
    const id = this.route.snapshot.paramMap.get('id');

    if (id != null)
      this.onlineEnquiryService.getByUniqueReference(id).subscribe({
        next: (x) => {
          this.loading = false;
        },
      });

    this.onlineEnquiryService.result$.subscribe({
      next: (x) => {
        const psotalCodeObj = this.getDtoFromQueryStringParams();
        const postCode = psotalCodeObj.postcode? psotalCodeObj.postcode.replace(/\s/g, ''):null;
        let prevPostCode = null;
        let postalCodeValid = false;

        if (x !== null) {
          prevPostCode = x.postcode;
          postalCodeValid = (prevPostCode === postCode);
          if(!postCode){
            postalCodeValid = true
          }
        }
        if (x == null || !postalCodeValid) {
          const dto = this.getDtoFromQueryStringParams();
          const step = +this.route.snapshot.queryParamMap.get('step') ?? 0;

          this.onlineEnquiryService.manage(dto).subscribe({
            next: (x) => {
              this.location.replaceState('/');
              this.loading = false;
              this.formService.stepChange(step);

              if (x?.latitude == null && x?.longitude == null)
                this.router.navigate(['/pages/invalid-postcode']);
            },
          });
        } else {
          this.location.replaceState('/');
          this.loading = false;
        }
      },
    });

    if (!this.loading)
      this.onlineEnquiryService.step$.subscribe({
        next: (x) => {
          if (x != null) {
            this.formService.stepChange(x);
            // this.activeStep = this.formService.getSteps().filter(s => s.step == x)[0];
          }
        },
      });

    // check if we have a result yet or not
    const psotalCodeObj = this.getDtoFromQueryStringParams();
    const postCode = psotalCodeObj.postcode? psotalCodeObj.postcode.replace(/\s/g, ''):null;
    let prevPostCode = null;
    let postalCodeValid = false;

    if (this.onlineEnquiryService.result !== null) {
      prevPostCode = this.onlineEnquiryService.result.postcode;
      postalCodeValid = (prevPostCode === postCode);
      if(!postCode){
        postalCodeValid = true
      }
    }
    if (this.onlineEnquiryService.result == null || !postalCodeValid) {
      const dto = this.getDtoFromQueryStringParams();
      this.onlineEnquiryService.manage(dto).subscribe({
        next: (x) => {
          // we should have a lat and long
          if (x?.latitude == null && x?.longitude == null) {
            this.router.navigate(['/pages/invalid-postcode']);
          }
        },
      });
    }
  }

  backButton() {
    if (this.activeStep?.step == 0) {
      // this.onlineEnquiryService.removeOnlineEnquiry();
      window.location.href = environment.originUrl;
      return;
    }

    this.formService.back();
  }

  private getDtoFromQueryStringParams(): OnlineEnquiryDto {
    const postcode = this.route.snapshot.queryParamMap.get('postcode');
    const companyId = this.route.snapshot.queryParamMap.get('companyid');
    const repId = this.route.snapshot.queryParamMap.get('repid');

    let dto = { postcode: postcode } as OnlineEnquiryDto;
    if (companyId != null) dto.companyId = +companyId;
    if (repId != null) dto.repId = repId;

    return dto;
  }

  onTransitionEnd(event: TransitionEvent) {
    if (
      event.propertyName === 'opacity' &&
      event.target === event.currentTarget
    ) {
      console.log('The fadeIn animation has completed.');
      // You can add your code to handle the animation completion here.
    }
  }
}
