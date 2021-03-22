import { Injectable } from '@angular/core';
import { Flight } from './flight';
import { FLIGHTS } from './seed-flights';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class FlightService {

  constructor(private messageService: MessageService) { }

  // getFlights(): Flight[] {
  //   return FLIGHTS;
  // }

  getFlights(): Observable<Flight[]> {
    const flights = of(FLIGHTS);
    this.messageService.add('flightService: fetched flights');
    return flights;
  }

  getFlight(id: number): Observable<Flight> {
    // Error handling will be added in the next step of the tutorial.
    const flight = FLIGHTS.find(h => h.id === id) as Flight;
    this.messageService.add(`FlightService: fetched flight id=${id}`);
    return of(flight);
  }

}