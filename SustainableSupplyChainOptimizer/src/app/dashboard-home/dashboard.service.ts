import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardHome } from './models/dashboard-home.model';
import { HttpClient } from '@angular/common/http';
import { DashboardSustainability } from './models/dashboard-sustainability.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  //Local
  //private apiUrl = 'https://localhost:44367/GetDashboardChartDataList';
  //private carbonEmissionApiUrl = 'https://localhost:44367/GetAverageCarbonEmission';
  //private sustainabilityApiUrl = 'https://localhost:44367/GetAverageCarbonEmission/GetSustainabilityGoalProgress';

   private apiUrl ='https://jkh-carbon-footprint-analysis-backend-h6fedubgeyczexdp.southeastasia-01.azurewebsites.net/GetDashboardChartDataList';
   private carbonEmissionApiUrl = 'https://jkh-carbon-footprint-analysis-backend-h6fedubgeyczexdp.southeastasia-01.azurewebsites.net/GetAverageCarbonEmission';
   private sustainabilityApiUrl = 'https://jkh-carbon-footprint-analysis-backend-h6fedubgeyczexdp.southeastasia-01.azurewebsites.net/GetSustainabilityGoalProgress';

  constructor(private http: HttpClient) {}

   //Line Charts
  getDashboardProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 
  //Gauge
   getDashboardTrendLineChart(): Observable<number> {
    return this.http.get<number>(this.carbonEmissionApiUrl);
  }

  //Progressbar
  getDashboardSustainabilityChart(): Observable<number> {
    return this.http.get<number>(this.sustainabilityApiUrl);
}
}
