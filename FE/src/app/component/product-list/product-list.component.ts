import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: IProduct[] = []

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data
      console.log(data);

    })
  }
  removeItem(id: any){
    if (confirm("Ban co muon xoa khong")) {
      this.productService.deleteProduct(id).subscribe(()=> {
        this.products = this.products.filter(item => item._id != id)
      })
    }
   }

}
