import { Component } from '@angular/core';
import { ProductService } from '../../../service/productservice/product.service';
import { IProduct } from '../../../types/product';
@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.css']
})
export class ManagerProductComponent {
  product!: IProduct;
  products: IProduct[] = []
  constructor(private service: ProductService) {
    this.service.getProducts().subscribe(data => {
      this.products = data
      console.log(this.products);

    })
  }
  removeProduct(id: any) {
    const product = this.products.find(item => item.id == id)
    const result = confirm(`Xóa sản phẩm ${product?.name} khống?`)
    if(result){

      this.service.deleteProduct(id).subscribe(data => {
        this.products = this.products.filter(item => item.id !== id)
      })
    }
  }
}
