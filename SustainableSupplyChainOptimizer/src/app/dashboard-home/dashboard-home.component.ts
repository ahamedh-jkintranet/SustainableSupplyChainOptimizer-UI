import { AfterViewInit, Component } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardHome } from './models/dashboard-home.model';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChartDB } from 'src/app/fack-db/chartData';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardSustainability } from './models/dashboard-sustainability.model';
import {DashboardCarbonEmission} from './models/dashboard-carbon.model';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [NgApexchartsModule,NgbModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})

export class DashboardHomeComponent {
  profiles: DashboardHome[] = [];
  carbonEmission: number = 0;
  sustainabilityGoalProgress : number = 0;

  line1CAC!: ApexOptions;
  bar1CAC!: ApexOptions;
  radialBar1CAC!: ApexOptions;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
   
    //Gauge 

    this.dashboardService.getDashboardTrendLineChart().subscribe(
      (data: number) => {
        this.carbonEmission = data;
    
        this.radialBar1CAC = {
          chart: {
            height: 350,
            type: 'radialBar'
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%'
              }
            }
          },
          colors: ['#20b566'],
          series: [data], 
          labels: ['Carbon Emission']
        };
    
      },
      (error) => console.error('Error fetching dashboard profiles:', error),
  );

    this.dashboardService.getDashboardSustainabilityChart().subscribe(
      (data: number) => {
          this.sustainabilityGoalProgress = data; 
      },
      (error) => console.error('Error fetching dashboard profiles:', error),
  );

    // TrendLine of Carbon Emission & Cost Analysis Chart : 1 API : GetDashboardDataList

    this.dashboardService.getDashboardProfile().subscribe(
      (data: DashboardHome[]) => {
        this.profiles = data;
        if (this.profiles.length > 0) {
          this.line1CAC.series = [
            {
              name: 'Carbon Emission',
              data: this.profiles.map((s) => s.totalEmission),
            },
          ];

          this.line1CAC.xaxis = {
            categories: this.profiles.map((s) => s.firstMonth),
          };


          this.bar1CAC.series = [
            {
              name: 'Cost',
              data: this.profiles.map((s) => s.totalCostSaving),
            },
          ];

          this.bar1CAC.xaxis = {
            categories: this.profiles.map((s) => s.firstMonth),
          };
        
        }
      },
      (error) => console.error('Error fetching dashboard profiles:', error),
    );

    this.line1CAC = {
      chart: {
        height: 450,
        type: 'line',
        zoom: {
          enabled: true,
        },
      },
      dataLabels: {
        enabled: false,
        //width: 2
      },
      stroke: {
        curve: 'straight',
      },
      colors: ['#4099ff'],
      series: [
        {
          name: 'Carbon Emission',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148,10,10,10],
        },
      ],
      title: {
        text: '',
        align: 'center',
      },
      grid: {
        row: {
          colors: ['#f3f6ff', 'transparent'], 
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

    this.bar1CAC = {
      chart: {
        height: 450,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#0e9e4a', '#4099ff', '#FF5370'],
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [
        {
          name: 'Cost',
          data: [44, 55, 57, 56, 61, 58, 63]
        },
      ],
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      yaxis: {
        title: {
          text: 'Cost'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {

      }
    };


    // this.radialBar1CAC = {
    //   chart: {
    //     height: 350,
    //     type: 'radialBar'
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       hollow: {
    //         size: '70%'
    //       }
    //     }
    //   },
    //   colors: ['#4099ff'],
    //   series: [70],
    //   labels: ['Cricket']
    // };
    
  }

  
}
