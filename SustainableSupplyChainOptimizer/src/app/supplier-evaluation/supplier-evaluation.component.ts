import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/suppiler.service';
import { SharedModule } from '../theme/shared/shared.module';

@Component({
  selector: 'app-supplier-evaluation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './supplier-evaluation.component.html',
  styleUrl: './supplier-evaluation.component.scss'
})
export class SupplierEvaluationComponent implements OnInit{
  supplierData: any[] = [];

 constructor(private _supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSupplierTableData();
  }

  loadSupplierTableData() : any {
    this._supplierService.getSupplierEvaluationProfile().subscribe(
      (response: any[]) => {
          this.supplierData = response;
          console.log('this.supplierData:', this.supplierData);
      },
      (error) => console.error('Error fetching dashboard profiles:', error),
    );
  }
}
