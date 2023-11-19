import { Component } from '@angular/core';
import { IProduct } from 'src/app/component/interface/product';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/component/service/product/product.service';
import { ICategory } from 'src/app/component/interface/category';
import { CategoryService } from 'src/app/component/service/category/category.service';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  product!: IProduct;
  category: ICategory[] = [];
  productForm = this.formBuilder.group({
    name: [''],
    price: 0,
    quantity: 0,
    description: '',
    author: '',
    publishing: '',
    images: [''],
    categoryId: '',
  });
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id);

      this.productService.getProduct(id).subscribe((data) => {
        this.product = data;
        console.log(this.product);
        this.categoryService.getAllCate().subscribe((data) => {
          this.category = data.datas;
          this.productForm.patchValue({
            name: this.product.name,
            price: this.product.price,
            description: this.product.description,
            images: this.product.images[0].url,
            categoryId: this.product.categoryId,
          });
        });
      });
    });
    console.log(this.productForm.value);
  }
  onHandleEdit() {
    if (this.productForm.valid) {
      const product: any = {
        _id: this.product._id,
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
        quantity: this.productForm.value.quantity || 0,
        description: this.productForm.value.description || '',
        publishing: this.productForm.value.publishing || '',
        author: this.productForm.value.author || '',
        images: this.productForm.value.images || '',
        categoryId: this.productForm.value.categoryId || "",
      };

      this.productService.updateProduct(product).subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['admin/products']);
        },
        (error) => console.log(error.message)
      );
    }
  }
}
