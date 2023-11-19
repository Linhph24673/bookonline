import { Component } from '@angular/core';
import { IProduct } from 'src/app/component/interface/product';
import { ProductService } from 'src/app/component/service/product/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  status:boolean = false;
  productName = '';
  products:IProduct[]=[];
  product!:IProduct;

  constructor (private productService:ProductService){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data?.docs
    })
   }
   getValue(e: any) {
    this.productName = e.target.value;
  }
}
