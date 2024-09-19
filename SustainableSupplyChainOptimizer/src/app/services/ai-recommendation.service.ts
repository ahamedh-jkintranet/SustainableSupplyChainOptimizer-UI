import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiRecommendationService {

  private apiUrl = 'http://104.43.94.148:8080/api/prompt';

  constructor(private http: HttpClient) { }

  // Method to send the request body via POST
  sendPrompt(promptData: { prompt: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, promptData, { headers });
  }
}