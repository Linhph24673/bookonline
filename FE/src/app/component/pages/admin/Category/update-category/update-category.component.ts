import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/component/interface/category';
import { CategoryService } from 'src/app/component/service/category/category.service';

@Component({
  selector: 'app-update-category',

  templateUrl: './update-category.component.html',

  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent {
  category!: ICategory;

  categoryForm = this.formBuilder.group({
    _id: '',

    name: [''],
  });

  constructor(
    private categoryService: CategoryService,

    private route: ActivatedRoute,

    private formBuilder: FormBuilder,

    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      console.log(id);

      this.categoryService.getOnCate(id).subscribe((data) => {
        this.category = data.datas;

        this.categoryForm.patchValue({
          name: this.category.name,
        });
      });
    });
  }

  onHandleEditCa() {
    if (this.categoryForm.valid) {
      const category: ICategory = {
        _id: this.category._id,

        name: this.categoryForm.value.name || '',
      };

      this.categoryService.updateCategory(category).subscribe(
        (data) => {
          console.log(data);

          this.router.navigate(['admin/category']);
        },
        (error) => console.log(error.message)
      );
    }
  }
}
