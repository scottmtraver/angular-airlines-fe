import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../flight';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FlightService } from '../flight.service';
import { CookieService } from 'ngx-cookie-service';
import { SpreedlyService } from '../spreedly.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.less']
})
export class FlightDetailComponent implements OnInit {

  @Input() flight?: Flight;

  private existingPayment = ''

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private location: Location,
    private cookieService: CookieService,
    private spreedlyService: SpreedlyService
  ) {}

  ngOnInit(): void {
    this.getFlight();
    this.existingPayment = this.cookieService.get(SpreedlyService.PAYMENT_COOKIE)
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
    const paymentToken = this.cookieService.get(SpreedlyService.PAYMENT_COOKIE)
    if(paymentToken) {
      console.log('we have a payment method')
      this.spreedlyService.purchaseFlight(paymentToken, this.flight.id)
      return
    }

    // add new card and cookie then purchase
    this.spreedlyService.addCard(this.flight)
  }

  purchaseThirdParty(): void {
    if(!this.flight) {
      console.warn('no flight selected')
      return
    }
    const paymentToken = this.cookieService.get(SpreedlyService.PAYMENT_COOKIE)
    if(paymentToken) {
      console.log('we have a payment method')
      this.spreedlyService.purchaseFlightThirdParty(paymentToken, this.flight.id)
      return
    }
  }

  addNewCard(): void {
    this.spreedlyService.addCard(this.flight)
  }
}
