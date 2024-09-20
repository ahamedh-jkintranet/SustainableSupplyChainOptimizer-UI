import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteOptimizationService {

    private apiUrl ='https://jkh-carbon-footprint-analysis-backend-h6fedubgeyczexdp.southeastasia-01.azurewebsites.net/GetRouteOptimizationList';
    
    constructor(private http: HttpClient) { }

    getRouteOptimizationProfile(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}