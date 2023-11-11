import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { ProductService } from '../../../service/productservice/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  constructor(private fb: FormBuilder, private service: ProductService, private router: Router) { }
  productForm = this.fb.group({
    name: [''],
    price: [0]
  })
  AddProduct() {
    if (this.productForm.valid) {
      const product = {
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
      }
      this.service.addProduct(product).subscribe(data => {
        console.log(data);
        this.router.navigate(['admin/products'])
      })

    }

  }
}
