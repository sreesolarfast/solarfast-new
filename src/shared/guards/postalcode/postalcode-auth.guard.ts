import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineEnquiryService } from '../../../shared/service/online-enquiry.service';
import { environment } from '../../../environments/environment';

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

        const url = environment.originUrl;
        window.location.href = url;
        // this.router.navigate(['/postcode'], { queryParams: { returnUrl: state.url } }).then();
        return false;
    }
}
