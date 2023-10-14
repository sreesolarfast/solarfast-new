import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private router: Router) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Clone the request object
        let newReq = req.clone();

        // Request
        newReq = req.clone({
          headers: req.headers
          .set(
              'x-api-key',
              '4236b238-f546-4f0a-a9ee-90f1cbb37ecc'
          )
          .set('x-api-user', 'c9ec7efb-c7de-4437-93d1-876e4a94b4bd')
          .set('x-api-role', '2ca26c36-1d4a-4769-8ee7-27afb1dfa363'),
      });

        // Response
        return next.handle(newReq).pipe(
            catchError((error) => {
                // Catch "401 Unauthorized" responses
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                  // todo create an app offline page
                  // if we hit this then the api is down and we should redirect to an offline page
                    this.router.navigate(['/offline']);

                    // // Reload the app
                    // location.reload();
                }

                return throwError(error);
            })
        );
    }
}
