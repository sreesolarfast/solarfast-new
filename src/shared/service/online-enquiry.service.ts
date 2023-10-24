import { Injectable } from '@angular/core';
import { OnlineEnquiryDto } from '../dto/online-enquiry-dto';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OnlineEnquiryService {
  private _result: BehaviorSubject<OnlineEnquiryDto | null> =
    new BehaviorSubject(null);

  get result$(): Observable<OnlineEnquiryDto | null> {
    var value = this._result.value;
    if (value != null) return this._result.asObservable();

    return of(this.getOnlineEnquiry());
  }

  get result() : OnlineEnquiryDto | null {
    var value = this._result.value;
    if (value != null) return value;

    return this.getOnlineEnquiry();
  }

  set result(dto: OnlineEnquiryDto) {
    this._result.next(dto);
  }

  private _step: BehaviorSubject<number> =
  new BehaviorSubject(0);

  get step$(): Observable<number> {
    var value = this._step.value;
    if (value != 0) return this._step.asObservable();

    return of(this.getStep());
  }

  get step() : number {
    var value = this._step.value;
    if (value != 0) return value;

    return this.getStep();
  }

  set step(value: number) {
    this._step.next(value);
  }

  constructor(private http: HttpClient) {}

  public manage(dto: OnlineEnquiryDto): Observable<OnlineEnquiryDto> {
    return this.http
      .post<OnlineEnquiryDto>(`${environment.apiUrl}/onlineenquiry`, dto, {withCredentials: false, responseType: 'json'})
      .pipe(
        map((result) => {
          this._result.next(result);
          this.setOnlineEnquiry(result);
          return result;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  public createOrder(dto: OnlineEnquiryDto): Observable<OnlineEnquiryDto> {
    return this.http
      .post<OnlineEnquiryDto>(`${environment.apiUrl}/onlineenquiry/order`, dto, {withCredentials: false, responseType: 'json'})
      .pipe(
        map((result) => {
          this._result.next(result);
          this.setOnlineEnquiry(result);
          return result;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  public getByUniqueReference(id: string): Observable<OnlineEnquiryDto> {
    if (id == null) return null;

    return this.http
    .get<OnlineEnquiryDto>(`${environment.apiUrl}/onlineenquiry/${id}`)
    .pipe(
        tap((result) => {
          this._result.next(result);
          this.setOnlineEnquiry(result);
          return result;
        })
    );
  }

  public setOnlineEnquiry(onlineEnquiry: OnlineEnquiryDto) {
    if (onlineEnquiry == null) {
      // todo identify where has called a null object
      alert('null online enquiry');
      return;
    }
    this._result.next(onlineEnquiry);
    localStorage.setItem('onlineEnquiry', JSON.stringify(onlineEnquiry));
  }

  public getOnlineEnquiry(): OnlineEnquiryDto {
    const result = localStorage.getItem('onlineEnquiry') as string;
    return JSON.parse(result) as OnlineEnquiryDto;
  }

  public setStep(value: number) {
    localStorage.setItem('step', JSON.stringify(value));
    this._step.next(value);
  }

  public getStep(): number {
    const result = localStorage.getItem('step') ?? '0';
    return +result;
  }

  public getEnumValueFromString(enumObj: any, strValue: string): any {
    for (const key of Object.keys(enumObj)) {
      if (enumObj[key] === strValue) {
        return enumObj[key];
      }
    }
  }
}
