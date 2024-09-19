import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardHome } from './models/dashboard-home.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  //Local
  //private apiUrl = 'https://localhost:44367/GetDashboardChartDataList';
  //private carbonEmissionApiUrl = 'https://localhost:44367/GetAverageCarbonEmission';
  //private sustainabilityApiUrl = 'https://localhost:44367/GetAverageCarbonEmission/GetSustainabilityGoalProgress';

   private apiUrl ='https://demoapi-dyfcgegfcafjaph7.southeastasia-01.azurewebsites.net/GetDashboardDataList';
   private carbonEmissionApiUrl = 'https://demoapi-dyfcgegfcafjaph7.southeastasia-01.azurewebsites.net/GetAverageCarbonEmission';
   private sustainabilityApiUrl = 'https://demoapi-dyfcgegfcafjaph7.southeastasia-01.azurewebsites.net/GetSustainabilityGoalProgress';

  constructor(private http: HttpClient) {}

  //Gauge
  getDashboardProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 
  //Line Charts
   getDashboardTrendLineChart(): Observable<any> {
    return this.http.get<any>(this.carbonEmissionApiUrl);
  }

  //Progress Bar Charts
  getDashboardSustainabilityChart(): Observable<any> {
    return this.http.get<any>(this.sustainabilityApiUrl);
  }
}
