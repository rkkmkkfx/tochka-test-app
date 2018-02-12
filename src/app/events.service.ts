import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

const EVENTS_API = '/events';

@Injectable()
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any []> {
    return this.http
      .get(EVENTS_API)
      .map(resp => resp)
      .catch((error: any) => Observable.throw(error.json()));
  }
  postEvent(eventData): Observable<any> {
    return this.http
      .post(EVENTS_API, eventData, httpOptions);
  }

  deleteEvent(eventID): Observable<any> {
    return this.http
      .delete(EVENTS_API + '/' + eventID, httpOptions);
  }

  updateEvent(data) {
    return this.http
      .put(EVENTS_API + '/' + data.id, data, httpOptions);
  }
}
