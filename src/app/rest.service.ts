import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConfigService } from './appconfig.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient, private config: AppConfigService) { }

  getCurrencies(): Observable<any> {
    const baseUrl = this.config.currencyApiBaseUrl;
    //const baseUrl = (Math.random() > 0.2) ? this.config.currencyApiBaseUrl : "";
    const endpoint = baseUrl + 'currency';
    
    return this.http.get(endpoint).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private extractData(res: Response) {
    return res || { };
  }

  private handleError(err: HttpErrorResponse) {
    let error: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      error = 'An error occurred: ' + err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      error = `Rest returned code ${err.status}` + ` body was: ${err.message}`;
    }

    return of({ 'error': error });
  }
}
