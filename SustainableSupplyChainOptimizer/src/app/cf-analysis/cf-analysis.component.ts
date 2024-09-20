import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ApexAxisChartSeries, ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../theme/shared/shared.module';
import { SlMapComponent } from './sl-map/sl-map.component';
import { CfServicesService } from './services/cf-services.service';

@Component({
  selector: 'app-cf-analysis',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule, SlMapComponent],
  templateUrl: './cf-analysis.component.html',
  styleUrl: './cf-analysis.component.scss'

})
export class CfAnalysisComponent {
  barChart: ApexOptions;
  pieChart: ApexOptions;

  constructor(private cfService: CfServicesService) { }

  ngOnInit() {
    this.barChart = {
      chart: {
        height: 350,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: true
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      series: [
        {
          name: 'Manufacturing',
          data: []
        },
        {
          name: 'Transportation',
          data: []
        },
        {
          name: 'Warehousing',
          data: []
        },
      ],
      xaxis: {
        type: 'category',
        categories: []
      },
      legend: {
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    }


    this.pieChart = {
      chart: {
        height: 320,
        type: 'pie'
      },
      labels: [],
      series: [],
      // colors: ['#4099ff', '#0e9e4a', '#00acc1', '#FFB64D', '#FF5370'],
      legend: {
        show: true,
        position: 'right'
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  ngAfterViewInit() {
    this.cfService.getAllCFAnalysis().subscribe((res: any[]) => {
      console.log(res)

      let seriesData: any[] = this.barChart.series

      res.forEach(dt => {

        this.barChart.xaxis.categories.push(dt.company)

        let groupedByCategory = dt.companyDataList.reduce((acc, current) => {
          let category = current.category;

          if (!acc[category]) {
            acc[category] = { category, emission: 0 };
          }

          acc[category].emission += current.emissions;
          return acc;
        }, {});

        let result: any[] = Object.values(groupedByCategory);
        seriesData.find(s => s.name == 'Manufacturing').data.push(Number(result.find(x => x.category == 'Manufacturing').emission.toFixed(2)))
        seriesData.find(s => s.name == 'Transportation').data.push(Number(result.find(x => x.category == 'Transportation').emission.toFixed(2)))
        seriesData.find(s => s.name == 'Warehousing').data.push(Number(result.find(x => x.category == 'Warehousing').emission.toFixed(2)))


        this.pieChart.labels.push(dt.company)
        this.pieChart.series.push(dt.companyDataList.reduce((sum, currentItem) => sum + currentItem.emissions, 0))
      })

    })
  }


}
