import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/component/interface/product';
import { ProductService } from 'src/app/component/service/product/product.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {
  product!: IProduct;
  productForm = this.formBuilder.group({
    name: [''],
    price: 0,
    categoryId: '',
    quantity: 0,
    description: '',
    author: '',
    publishing: '',
  });
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id');
      console.log(id);

      this.productService.getProduct(id).subscribe((product) => {
        // Sản phẩm dựa theo ID
        console.log(product);
        
        if (product) {
          // Sản phẩm dựa theo ID
          this.product = product;

          this.productForm.patchValue({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            author: product.author,
            publishing: product.publishing,
          });
        }
      });
    });
  }
}
