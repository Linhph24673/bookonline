import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/pages/admin/product-list/product-list.component';
import { ProductUpdateComponent } from './component/pages/admin/product-update/product-update.component';
import { HomePageComponent } from './component/pages/home/home-page/home-page.component';
import { ProductDetailComponent } from './component/pages/home/product-detail/product-detail.component';
import { SigninComponent } from './component/pages/home/signin/signin.component';
import { SignupComponent } from './component/pages/home/signup/signup.component';
import { ProductAddComponent } from './component/pages/admin/product-add/product-add.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "product/:id", component: ProductDetailComponent},
  {path: "sigin", component: SigninComponent},
  {path: 'sigup', component: SignupComponent},
  {path : "admin/productList", component : ProductListComponent},
  {path : "admin/productList/produdctEdit/:id", component : ProductUpdateComponent},
  {path : "admin/add", component : ProductAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
