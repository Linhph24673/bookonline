import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductUpdateComponent } from './component/product-update/product-update.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProductAddComponent } from './component/product-add/product-add.component';

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
