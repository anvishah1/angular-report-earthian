import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TargetInsightsService {
  private apiUrl = 'https://en-backend.onrender.com/api/v1/reports/partner-target-vs-actual-submissions/';
  constructor(private http: HttpClient) {}

  getTargetInsights(): Observable<any> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkZW50aWZpZXIiOiJhbGV4QGVuLmluIiwiZXhwIjoxNzUzNDA5MzA5fQ.Ex55WTvI0fL5GqFLP1LJEYot5L-98XSKi3vNTYHw0GM"
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
