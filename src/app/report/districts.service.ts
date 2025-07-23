import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DistrictsService {
  private apiUrl = 'https://en-backend.onrender.com/api/v1/districts/';
  constructor(private http: HttpClient) {}

  getDistricts(): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkZW50aWZpZXIiOiJhbGV4QGVuLmluIiwiZXhwIjoxNzUzNDY1MzY4fQ.jXfik6ITlGNQvIjy6gxjnhMrNHSxosOxttK9IkBifgc';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}

