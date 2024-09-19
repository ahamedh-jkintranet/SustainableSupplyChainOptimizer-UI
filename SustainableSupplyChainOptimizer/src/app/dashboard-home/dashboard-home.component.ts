import { AfterViewInit, Component } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { DashboardService } from './dashboard.service';
import { DashboardHome } from './models/dashboard-home.model';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChartDB } from 'src/app/fack-db/chartData';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [NgxGaugeModule, NgApexchartsModule],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  profiles: DashboardHome[] = [];
  carbonEmission: number = 0;

  line1CAC!: ApexOptions;
  bar1CAC!: ApexOptions;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
   
    //Gauge - Need to change.This is a incorrect API

    // this.dashboardService.getDashboardProfile().subscribe(
    //   (data: DashboardHome[]) => {
    //     console.log(data);
    //     this.profiles = data;
    //     if (this.profiles.length > 0) {
    //       this.carbonEmission = -50; //this.profiles[this.profiles.length - 1].sustainabilityGoalProgress;
    //     }
    //   },
    //   error => console.error('Error fetching dashboard profiles:', error)
    // );

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

          /////////////////////////////////
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
        height: 500,
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
        text: 'Trend Line of Carbon Emission',
        align: 'center',
      },
      grid: {
        row: {
          colors: ['#f3f6ff', 'transparent'], // takes an array which will be repeated on columns
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
        height: 425,
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
        // y: {
        //   formatter: (val: string) => '$ ' + val + ' thousands'
        // }
      }
    };

    
  }

  // Sustainability Goal Progress : 1 API

  thresholdConfig = {
    '-100': { color: 'green' }, // Color for -100 to 0%
    '0': { color: 'yellow' }, // Color for 0 to 33%
    '33': { color: 'orange' }, // Color for 33% to 66%
    '66': { color: 'red' }, // Color for 67% to 100%
  };

  markerConfig = [
    { value: -100, color: '#555', size: 8, label: '-100', type: 'line' },
    { value: -50, color: '#555', size: 4, type: 'line' },
    { value: 0, color: '#555', size: 8, label: '0', type: 'line' },
    { value: 15, color: '#555', size: 4, type: 'line' },
    { value: 30, color: '#555', size: 8, label: '30', type: 'line' },
    { value: 40, color: '#555', size: 4, type: 'line' },
    { value: 50, color: '#555', size: 8, label: '50', type: 'line' },
    { value: 60, color: '#555', size: 4, type: 'line' },
    { value: 70, color: '#555', size: 8, label: '70', type: 'line' },
    { value: 85, color: '#555', size: 4, type: 'line' },
    { value: 100, color: '#555', size: 8, label: '100', type: 'line' },
  ];
}
