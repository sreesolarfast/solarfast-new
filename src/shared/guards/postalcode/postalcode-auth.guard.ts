import { OnlineEnquiryDto } from './../../../shared/dto/online-enquiry-dto';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EnteredPostalCodeService } from '../../../shared/service/enteredpostalcode.service';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';

@Injectable({
    providedIn: 'root',
})
export class PostalCodeGuard implements CanActivate {
    constructor(private onlineEnquiryService: OnlineEnquiryService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (route.queryParamMap.get('postcode') != null || this.onlineEnquiryService?.result?.postcode != null) return true;

        this.router.navigate(['/postcode'], { queryParams: { returnUrl: state.url } }).then();
        return false;
    }
}
