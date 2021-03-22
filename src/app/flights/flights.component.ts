import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.less']
})
export class FlightsComponent implements OnInit {

  flights: Flight[] = [];

  selectedFlight?: Flight;
  onSelect(flight: Flight): void {
    this.selectedFlight = flight;
  }

  constructor(private flightService: FlightService) { }

  getFlights(): void {
    this.flightService.getFlights()
        .subscribe(flights => this.flights = flights);
  }

  ngOnInit(): void {
    this.getFlights()
  }

}
