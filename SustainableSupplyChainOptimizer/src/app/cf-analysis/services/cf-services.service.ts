import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CfServicesService {

  constructor(private httpClient: HttpClient) { }

  getAllCFAnalysis() {
    return this.httpClient.get(environment.apiUrl + "/GetCarbonFootprintAnalysisList")
  }

}
