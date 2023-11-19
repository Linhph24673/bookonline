import { Component } from '@angular/core';
import { ICategory } from 'src/app/component/interface/category';
import { CategoryService } from 'src/app/component/service/category/category.service';

@Component({
  selector: 'app-manager-category',
  templateUrl: './manager-category.component.html',
  styleUrls: ['./manager-category.component.css'],
})
export class ManagerCategoryComponent {
  categorys: ICategory[] = [];
  category!: ICategory;

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCate().subscribe((data) => {
      this.categorys = data.docs;
    });
  }
  removeItem(id: any) {
    const category = this.categorys.find((item) => item._id == id);
    const result = confirm(
      `Bạn có muốn xóa sản phẩm ${category?.name} không ?`
    );
    if (result) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.categorys = this.categorys.filter((item) => item._id !== id);
        },
        (error) => {
          console.log(error.message);
        }
      );
    }
  }
}
