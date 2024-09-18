// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CfAnalysisComponent } from './cf-analysis/cf-analysis.component';
import { AiRecommentationsComponent } from './ai-recommentations/ai-recommentations.component';
import { PredictiveAnalyticsComponent } from './predictive-analytics/predictive-analytics.component';
import { SupplierEvaluationComponent } from './supplier-evaluation/supplier-evaluation.component';
import { RouteOptimizationComponent } from './route-optimization/route-optimization.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: DashboardHomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'cf-analysis',
        component: CfAnalysisComponent
      },
      {
        path: 'ai-recommendations',
        component: AiRecommentationsComponent
      },
      {
        path: 'predictive-analytic',
        component: PredictiveAnalyticsComponent
      },
      {
        path: 'supplier-evaluation',
        component: SupplierEvaluationComponent
      },
      {
        path: 'route-optimization',
        component: RouteOptimizationComponent
      },
      {
        path: 'analytics',
        loadComponent: () => import('./demo/dashboard/dash-analytics.component')
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart & map/core-apex.component')
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms & tables/form-elements/form-elements.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/forms & tables/tbl-bootstrap/tbl-bootstrap.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth/signup',
        loadComponent: () => import('./demo/authentication/sign-up/sign-up.component')
      },
      {
        path: 'auth/signin',
        loadComponent: () => import('./demo/authentication/sign-in/sign-in.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
