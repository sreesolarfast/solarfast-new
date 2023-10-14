import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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
