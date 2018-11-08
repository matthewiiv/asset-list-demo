import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { VanFormComponent } from './van-form/van-form.component';
import { CarFormComponent } from './car-form/car-form.component';
import { PrinterFormComponent } from './printer-form/printer-form.component';
import { PcFormComponent } from './pc-form/pc-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'new', component: FormComponent },
  { path: 'van', component: VanFormComponent },
  { path: 'car', component: CarFormComponent },
  { path: 'printer', component: PrinterFormComponent },
  { path: 'pc', component: PcFormComponent },
  { path: 'van/:assetId', component: VanFormComponent },
  { path: 'car/:assetId', component: CarFormComponent },
  { path: 'printer/:assetId', component: PrinterFormComponent },
  { path: 'pc/:assetId', component: PcFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
