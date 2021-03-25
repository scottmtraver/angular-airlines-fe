import { Injectable } from '@angular/core';
import { Flight } from './flight';
import { Observable, of } from 'rxjs';
import { filter, find, first, map, take, tap } from 'rxjs/operators'
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightService {

  private flightsUrl = 'http://airlinesapi:3000/flights';  // URL to web api

  constructor(
    private http: HttpClient,
    ) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl)
  }

  getFlight(id: number): Observable<Flight | undefined> {
    return this.http.get<Flight>(`${this.flightsUrl}/${id}`)
  }
}