import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Flight } from './flight';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SpreedlyService {

  static PAYMENT_COOKIE = 'PAYMENTCOOKIE'
  private purchaseUrl = 'http://airlinesapi:3000/purchase';  // URL to web api
  private passthroughUrl = 'http://airlinesapi:3000/passthrough';  // URL to web api
  private transactionUrl = 'http://airlinesapi:3000/transactions';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private cookieService: CookieService,
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  addCard(flightInfo?: Flight): void {
    if (!flightInfo) {
      return
    }
    // @ts-ignore
    SpreedlyExpress.init("F2XV4gIvmoLo4VSOnyhAHFzLUgB", {
      "amount": `${flightInfo.price}`,
    });

    // @ts-ignore
    SpreedlyExpress.onPaymentMethod((token: any, paymentMethod: any) => {
      this.cookieService.set(
        SpreedlyService.PAYMENT_COOKIE,
        JSON.stringify({ token: token, expiring: paymentMethod.year }),
        undefined,
        '/',
        undefined,
        true,
        'None'
      );

      window.location.reload()
      // SUBMIT TO BACKEND
    });

    // @ts-ignore
    SpreedlyExpress.openView()
  }

  private processResponse(data: any): void {
    this.messageService.add({ message: `Purchase ${data.success ? 'Succeeded' : 'Failed'}`, status: data.success })
  }

  purchaseFlight(token: string, flightId: number, keepCC?: boolean) {
    this.http.post(this.purchaseUrl, { token: token, flightId: flightId, keepCC: keepCC }, this.httpOptions)
      .pipe(
        tap(d => { 
          if(!keepCC) {
            this.cookieService.delete(SpreedlyService.PAYMENT_COOKIE, '/')
          }
          this.processResponse(d)
        }),
      ).subscribe()
  }
  purchaseFlightThirdParty(token: string, flightId: number) {
    this.http.post(this.passthroughUrl, { token: token, flightId: flightId }, this.httpOptions)
      .pipe(
        tap(d => { this.processResponse(d) }),
      ).subscribe()
  }

  getTransaction(): Observable<any[]> {
    return this.http.get<any[]>(this.transactionUrl)
  }
}
