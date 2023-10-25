import { OnlineEnquiryService } from '../../shared/service/online-enquiry.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../shared/service/form.service';
import { FormStep } from '../../shared/model/form-step';
import { OnlineEnquiryDto } from '../../shared/dto/online-enquiry-dto';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
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
            next: x => {
                if (x != null) this.activeStep = x;
            },
        });

        // get online enquiry from param if applicable
        const id = this.route.snapshot.paramMap.get('id');

        if (id != null)
            this.onlineEnquiryService.getByUniqueReference(id).subscribe({
                next: x => {
                    this.loading = false;
                },
            });

        this.onlineEnquiryService.result$.subscribe({
            next: x => {
                if (x == null) {
                    const dto = this.getDtoFromQueryStringParams();
                    const step = +this.route.snapshot.queryParamMap.get('step') ?? 0;

                    this.onlineEnquiryService.manage(dto).subscribe({
                        next: x => {
                            this.location.replaceState('/solar');
                            this.loading = false;
                            this.formService.stepChange(step);
                        },
                    });
                } else {
                    this.location.replaceState('/solar');
                    this.loading = false;
                }
            },
        });

        if (!this.loading)
            this.onlineEnquiryService.step$.subscribe({
                next: x => {
                    if (x != null) {
                        this.formService.stepChange(x);
                        // this.activeStep = this.formService.getSteps().filter(s => s.step == x)[0];
                    }
                },
            });
    }

    backButton() {

        if(this.activeStep?.step == 0 ) {

            window.location.href = environment.originUrl;
            return;
        }

        this.formService.back();
    }

    private getDtoFromQueryStringParams(): OnlineEnquiryDto {
        const postcode = this.route.snapshot.queryParamMap.get('postcode');
        const companyId = this.route.snapshot.queryParamMap.get('companyId');
        const repId = this.route.snapshot.queryParamMap.get('repId');

        let dto = { postcode: postcode } as OnlineEnquiryDto;
        if (companyId != null) dto.companyId = +companyId;
        if (repId != null) dto.repId = repId;

        return dto;
    }
}
