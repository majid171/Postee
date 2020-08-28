import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(form: String): Observable<any>{

    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });

    return this.http.post<any>('http://localhost:5000/auth/login', form, {
      headers: headers,
      observe: 'response',
      withCredentials: true
    });
  }

  register(form: String): Observable<any>{

    const headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
    });

    return this.http.post<any>('http://localhost:5000/auth/register', form, {
      headers: headers,
      observe: 'response',
      withCredentials: true
    });
  }
}
