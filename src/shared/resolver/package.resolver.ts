import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PackageService } from '../service/package.service';

export const packageResolver: ResolveFn<any> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const id = route.paramMap.get('id');
      return inject(PackageService).getById(+id);
    };
