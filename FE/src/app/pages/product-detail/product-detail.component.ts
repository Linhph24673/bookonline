import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: IProduct;

  constructor(
    private productservice: ProductService,
    private route : ActivatedRoute
    ) {
      this.route.paramMap.subscribe((pramas) => {
        const id = pramas.get('id');
        this.productservice.getProduct(id).subscribe((data) => {
          this.product = data;
          console.log(data);
        })
      })
  }
}
