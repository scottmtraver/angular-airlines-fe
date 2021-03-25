import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../flight';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FlightService } from '../flight.service';
import { CookieService } from 'ngx-cookie-service';
import { SpreedlyService } from '../spreedly.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.less']
})
export class CheckoutComponent implements OnInit {

  @Input() flight?: Flight;

  expiring$: Observable<any>
  existingPaymentObj: any

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private location: Location,
    private cookieService: CookieService,
    private spreedlyService: SpreedlyService
  ) {
    this.expiring$ = of(null)
  }

  ngOnInit(): void {
    this.getFlight();
    const cookieObj = this.cookieService.get(SpreedlyService.PAYMENT_COOKIE)
    if(cookieObj) {
      this.expiring$ = of(JSON.parse(cookieObj).expiring)
      this.existingPaymentObj = JSON.parse(cookieObj)
    }
  }
  
  getFlight(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
    this.flightService.getFlight(id)
      .subscribe(flight => this.flight = flight);
  }

  purchaseFlight(): void {
    if(!this.flight) {
      console.warn('no flight selected')
      return
    }
    if(this.existingPaymentObj) {
      console.log('we have a payment method')
      this.spreedlyService.purchaseFlight(this.existingPaymentObj.token, this.flight.id)
      return
    }

    // add new card and cookie then purchase
    this.spreedlyService.addCard(this.flight)
  }

  addNewCard(): void {
    this.spreedlyService.addCard(this.flight)
  }
}
