import { Component } from '@angular/core';
import { ProductService } from '../../../service/productservice/product.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  constructor(private fb: FormBuilder, private service: ProductService, private router: Router) { }
  myForm = this.fb.group({
    name: [''],
    price: [0]
  })
  }

