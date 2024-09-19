import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsvParserService {
  constructor(private http: HttpClient) {}

  public getCsvData(filePath: string): Observable<any[]> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map((csvData) => {
        let parsedData: any[] = [];
        Papa.parse(csvData, {
          complete: (result) => {
            parsedData = result.data;
          },
          header: true, // Assuming the CSV has headers
        });
        return parsedData;
      })
    );
  }
}