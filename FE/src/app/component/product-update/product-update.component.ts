import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/product';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent {
  product!: IProduct;
  productForm = this.formBuild.group({
    name: '',
    price: 0,
    author : '',
    desc: '',
    cate: 1,
    img: '',
  });

  constructor(
    private formBuild: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id).subscribe((product) => {
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          author: product.author,
          desc: product.desc,
          cate: product.cate,
          img: product.img,
        });
      });
    });
  }
  onHandleEdit() {
    const product: IProduct = {
      _id: this.product._id,
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      author: this.productForm.value.author || '',
      desc: this.productForm.value.desc || '',
      cate: this.productForm.value.cate || 1,
      img: this.productForm.value.img || '',
    };
    this.productService.updateProduct(product).subscribe((data) => {
      if(data.success) {
        return this.router.navigate(['admin/productList']);
      } else {
        const message1 = document.getElementById('message');
        if(message1 != null) {
          message1.innerText = data.message;
        }
        return false;
      }
    });
  }
}
