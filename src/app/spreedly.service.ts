import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class SpreedlyService {

  static PAYMENT_COOKIE = 'PAYMENTCOOKIE'

  constructor(
    private cookieService: CookieService
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

  purchaseFlight(flightId: number) {

  }
}
