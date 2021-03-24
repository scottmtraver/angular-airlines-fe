import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class SpreedlyService {

  static PAYMENT_COOKIE = 'PAYMENTCOOKIE'
  private purchaseUrl = 'http://airlinesapi:3000/purchase';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ) { }

  addCard(flightInfo?: Flight): void {
    if(!flightInfo) {
      return
    }
// @ts-ignore
SpreedlyExpress.init("F2XV4gIvmoLo4VSOnyhAHFzLUgB", {
  "amount": `${flightInfo.price}`,
  // "company_name": `${flightInfo.source}`
});

// @ts-ignore
SpreedlyExpress.onPaymentMethod((token: any, paymentMethod: any) => {
  this.cookieService.set(SpreedlyService.PAYMENT_COOKIE, token)
  // SUBMIT TO BACKEND
});

// @ts-ignore
SpreedlyExpress.openView()
  }

  purchaseFlight(token: string, flightId: number) {
    const response =  this.http.post(this.purchaseUrl, { token: token, flightId: flightId }, this.httpOptions)
    .pipe(
      tap(_ => console.log('Purchased flighg')),
      catchError(this.handleError<Flight>('purchaseFlight'))
    ).subscribe()
    debugger

    console.log('buying')

  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
