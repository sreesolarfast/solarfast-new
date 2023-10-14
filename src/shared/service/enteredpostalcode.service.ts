import { OnlineEnquiryDto } from '../dto/online-enquiry-dto';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnteredPostalCodeService {
    returnUrl!: string;
    authState$ = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,) {
    }

    // todo set all the form fields
    initializeForm(): FormGroup {
      return this.fb.group(
        {
          postcode: [
            'LS25 6LR',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
              this.ukPostalCodeValidator
            ],
          ],
          latitude: [null],
          longitude: [null],
        }
      );
    }

    ukPostalCodeValidator(control: AbstractControl): ValidationErrors | null {
      const ukPostalCodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i; // Case-insensitive
      const isValid = ukPostalCodeRegex.test(control.value);
      return isValid ? null : { ukPostalCode: true };
    }



    // setOnlineEnquiry(onlineEnquiry: OnlineEnquiryDto) {
    //   console.log('setOnlineEnquiry');
    //     this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    //     if (!this.currentAuthState) {

    //         if (onlineEnquiry !== null) {

    //             this.currentAuthState = true;
    //             this.authState$.next(this.currentAuthState);
    //             this.router.navigate([this.returnUrl ?? '/solar']).then();


    //         } else {
    //             this.currentAuthState = false;
    //             this.authState$.next(this.currentAuthState);
    //         }

    //     } else {
    //         this.router.navigateByUrl('/').then();
    //         return;
    //     }
    // }

    closetheWindow() {
        this.router.navigateByUrl('/').then();
    }

}
