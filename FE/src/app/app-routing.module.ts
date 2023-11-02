import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/pages/home/homepage/homepage.component';
import { AdminlayoutComponent } from './component/layout/adminlayout/adminlayout/adminlayout.component';
import { DashboardComponent } from './component/pages/admin/dashboard/dashboard.component';
import { ManagerProductComponent } from './component/pages/admin/manager-product/manager-product.component';
import { AddProductComponent } from './component/pages/admin/add-product/add-product.component';
import { UpdateProductComponent } from './component/pages/admin/update-product/update-product.component';

const routes: Routes = [
  {path: '',component:HomepageComponent},
  {path:'admin',component:AdminlayoutComponent,children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ManagerProductComponent },
      { path: 'add', component: AddProductComponent },
      { path: 'products/:id/edit', component: UpdateProductComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
