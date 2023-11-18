import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  constructor(private fb: FormBuilder, private ps: ProductService, private router: Router) {}
  productForm = this.fb.group({
    name: [''],
    price: [0],
    author: [''],
    desc: [''],
    img: [''],
    cate: [0],
  });
  addProduct() {
    const product: IProduct = {
      name: this.productForm.value.name || '',
      price: this.productForm.value.price || 0,
      author: this.productForm.value.author || '',
      desc: this.productForm.value.desc || '',
      img: this.productForm.value.img || '',
      cate: this.productForm.value.cate || 0,
    };
    this.ps.addProduct(product).subscribe((data) => {
      if(data.success) {
        return this.router.navigate(['/admin/productList']);
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
