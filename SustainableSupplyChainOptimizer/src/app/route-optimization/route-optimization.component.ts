import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { RouteOptimizationService } from '../services/route-optimization.service';

@Component({
  selector: 'app-route-optimization',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './route-optimization.component.html',
  styleUrl: './route-optimization.component.scss'
})
export class RouteOptimizationComponent implements OnInit{
  routeData: any [] = [];

  constructor(private _routeOptimizationService : RouteOptimizationService) {}

  ngOnInit(): void {
    this.loadRouteData();  
  }

  loadRouteData() : any {
    this._routeOptimizationService.getRouteOptimizationProfile().subscribe(
      (response: any[]) => {
          this.routeData = response;
          console.log('this.routeData:', this.routeData);
      },
      (error) => console.error('Error fetching dashboard profiles:', error),
    );
  }
}
