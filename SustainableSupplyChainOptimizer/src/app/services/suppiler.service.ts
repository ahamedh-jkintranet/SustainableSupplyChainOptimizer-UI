import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

    private apiUrl ='https://jkh-carbon-footprint-analysis-backend-h6fedubgeyczexdp.southeastasia-01.azurewebsites.net/GetSupplierEvaluationList';
    
    constructor(private http: HttpClient) { }

    getSupplierEvaluationProfile(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}