import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubmissionsEvaluationService {
  private apiUrl = 'https://en-backend.onrender.com/api/v1/reports/partner-submission-evaluation-stats/';

  constructor(private http: HttpClient) {}

  /**
   * Get overall submissions, optionally filtered by district.
   * @param districtId Optional district ID for filtering.
   */
  getEvaluation(districtId?: string | null): Observable<any> {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkZW50aWZpZXIiOiJhbGV4QGVuLmluIiwiZXhwIjoxNzUzNDA5MzA5fQ.Ex55WTvI0fL5GqFLP1LJEYot5L-98XSKi3vNTYHw0GM";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams();
    if (districtId) {
      params = params.set('district_id', districtId);
    }

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
