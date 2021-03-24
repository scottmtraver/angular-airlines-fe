import { Injectable } from '@angular/core';
import { Flight } from './flight';
import { Observable, of } from 'rxjs';
import { find, tap } from 'rxjs/operators'
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightService {

  private flightsUrl = 'http://airlinesapi:3000/flights';  // URL to web api
  private flightsCache: Flight[] = []

  constructor(
    private http: HttpClient,
    ) { }

  getFlights(): Observable<Flight[]> {
    const observe =  this.http.get<Flight[]>(this.flightsUrl).pipe(tap(arr => this.flightsCache = arr))
    return observe
  }

  getFlight(id: number): Observable<Flight | undefined> {
    return of(this.flightsCache.find(x => x.id == id))
  }
}