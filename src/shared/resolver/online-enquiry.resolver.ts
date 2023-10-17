import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineEnquiryService } from './../service/online-enquiry.service';
import { OnlineEnquiryDto } from '../dto/online-enquiry-dto';


@Injectable({
  providedIn: 'root',
})
export class OnlineEnquiryResolver implements Resolve<OnlineEnquiryDto> {
  /**
   * Constructor
   */
  constructor(private onlineEnquiryService: OnlineEnquiryService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<OnlineEnquiryDto>  {
      const id = route.paramMap.get('id');
      return this.onlineEnquiryService.getByUniqueReference(id);
  }
}



@Injectable({
  providedIn: 'root',
})
export class OnlineEnquiryAddResolver implements Resolve<OnlineEnquiryDto> {
  /**
   * Constructor
   */
  constructor(private onlineEnquiryService: OnlineEnquiryService, private route: ActivatedRoute) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<OnlineEnquiryDto>  {

    if (this.onlineEnquiryService.result != null)  return this.onlineEnquiryService.result$;

    const postcode = this.route.snapshot.queryParamMap.get('postcode');
    const companyId = this.route.snapshot.queryParamMap.get('companyId');
    const repId = this.route.snapshot.queryParamMap.get('repId');

    let dto = {postcode: postcode} as OnlineEnquiryDto;
    if (companyId != null)
      dto.companyId = +companyId;
      if (repId != null)
      dto.repId = repId;

    this.onlineEnquiryService.manage(dto).subscribe({
      next: (x) => {
        return x
      }
    });

    return null;

  }
}
