import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './flights/flights.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component'

const routes: Routes = [
  { path: 'flights', component: FlightsComponent },
  { path: 'detail/:id', component: FlightDetailComponent },
  { path: '', redirectTo: '/flights', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }