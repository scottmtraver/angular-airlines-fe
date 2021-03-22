import { Component, OnInit, Input } from '@angular/core';
import { Flight } from '../flight';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.less']
})
export class FlightDetailComponent implements OnInit {

  @Input() flight?: Flight;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getFlight();
  }
  
  getFlight(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 1;
    this.flightService.getFlight(id)
      .subscribe(flight => this.flight = flight);
  }

}
