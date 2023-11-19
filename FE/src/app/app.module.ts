import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { ClientLayoutComponent } from './component/layouts/client-layout/client-layout.component';
import { AdminLayoutComponent } from './component/layouts/admin-layout/admin-layout.component';
import { ManagerProductsComponent } from './component/pages/admin/Products/manager-products/manager-products.component';
import { AddProductComponent } from './component/pages/admin/Products/add-product/add-product.component';
import { UpdateProductComponent } from './component/pages/admin/Products/update-product/update-product.component';
import { UpdateCouponComponent } from './component/pages/admin/Coupon/update-coupon/update-coupon.component';
import { AddCouponComponent } from './component/pages/admin/Coupon/add-coupon/add-coupon.component';
import { ManangerCouponComponent } from './component/pages/admin/Coupon/mananger-coupon/mananger-coupon.component';
import { UpdateCategoryComponent } from './component/pages/admin/Category/update-category/update-category.component';
import { AddCategoryComponent } from './component/pages/admin/Category/add-category/add-category.component';
import { ManagerCategoryComponent } from './component/pages/admin/Category/manager-category/manager-category.component';
import { HomePageComponent } from './component/pages/client/home-page/home-page.component';
import { DetailProductComponent } from './component/pages/client/detail-product/detail-product.component';
import { ProductPageComponent } from './component/pages/client/product-page/product-page.component';
import { DashBoardComponent } from './component/pages/admin/dash-board/dash-board.component';
import { ProductItemComponent } from './component/pages/admin/Products/product-item/product-item.component';
import { TruncatePipe } from './component/utils/truncate.pipe';
import { SigninComponent } from './component/pages/auth/signin/signin.component';
import { SignupComponent } from './component/pages/auth/signup/signup.component';
import { CatrgoryItemComponent } from './component/pages/admin/Category/catrgory-item/catrgory-item.component';
import { AuthInterceptor } from './component/guard/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ClientLayoutComponent,
    AdminLayoutComponent,
    ManagerProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    UpdateCouponComponent,
    AddCouponComponent,
    ManangerCouponComponent,
    UpdateCategoryComponent,
    AddCategoryComponent,
    ManagerCategoryComponent,
    HomePageComponent,
    DetailProductComponent,
    ProductPageComponent,
    DashBoardComponent,
    ProductItemComponent,
    TruncatePipe,
    SigninComponent,
    SignupComponent,
    CatrgoryItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
