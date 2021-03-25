import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component'
import { CheckoutComponent } from './checkout/checkout.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';

const routes: Routes = [
  { path: 'flights', component: FlightsComponent },
  { path: 'detail/:id', component: FlightDetailComponent },
  { path: 'checkout/:id', component: CheckoutComponent },
  { path: 'purchases', component: PurchaseListComponent },
  { path: '', redirectTo: '/flights', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }