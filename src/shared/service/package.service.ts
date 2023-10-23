import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PackageDto } from '../dto/package-dto';
import { environment } from '../../environments/environment';
import { Observable, tap, filter, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
    private _listResult: BehaviorSubject<PackageDto[] | null> =
    new BehaviorSubject(null);

    private _result: BehaviorSubject<PackageDto | null> =
    new BehaviorSubject(null);

    get listResult$(): Observable<PackageDto[]> {
        return this._listResult.asObservable();
    }

    get result$(): Observable<PackageDto> {
        return this._result.asObservable();
    }

constructor(private http: HttpClient) { }


public getAll(): Observable<PackageDto[]> {
    return this.http
        .post<PackageDto[]>(`${environment.apiUrl}/package`, { includeDeleted: true})
        .pipe(
            tap((result) => {
                this._listResult.next(result);
            })
        );
}

public getById(packageId: number): Observable<PackageDto> {
    // todo throw an exception
    if (isNaN(packageId)) return null;

    return this.http
        .get<PackageDto>(`${environment.apiUrl}/package/${packageId}`)
        .pipe(
            tap((result) => {
                this._result.next(result);
            })
        );
}

}
