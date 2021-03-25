import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsComponent } from './flights/flights.component';
import { FormsModule } from '@angular/forms';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { CookieService } from 'ngx-cookie-service';

import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    FlightDetailComponent,
    MessagesComponent,
    CheckoutComponent,
    PurchaseListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
