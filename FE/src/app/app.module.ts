import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './component/pages/admin/add-product/add-product.component';
import { ManagerProductComponent } from './component/pages/admin/manager-product/manager-product.component';
import { UpdateProductComponent } from './component/pages/admin/update-product/update-product.component';
import { DashboardComponent } from './component/pages/admin/dashboard/dashboard.component';
import { HomepageComponent } from './component/pages/home/homepage/homepage.component';
import { AdminlayoutComponent } from './component/layout/adminlayout/adminlayout/adminlayout.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ManagerProductComponent,
    UpdateProductComponent,
    DashboardComponent,
    HomepageComponent,
    AdminlayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
